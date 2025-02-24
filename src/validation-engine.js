import debug from 'debug'
import { isLiteral } from 'is-graph-pointer'
import ValidationReport from './validation-report.js'
import { extractStructure, extractSourceShapeStructure } from './dataset-utils.js'

const error = debug('validation-engine::error')
const defaultMaxNodeChecks = 50

/**
 * @typedef {{
 *   path?: import('@rdfjs/types').Term,
 *   value?: import('@rdfjs/types').Term | null,
 *   message?: string
 * }} ValidationResult
 */

/**
 * @typedef {(
 *  context: import('../index.js').default,
 *  focusNode: import('@rdfjs/types').Term,
 *  valueNode: import('@rdfjs/types').Term,
 *  constraint: import('./shapes-graph.js').Constraint
 * ) => import('./validation-engine.js').ValidationResult[] | string[] | boolean | void} ValidationFunction
 */

/**
 * @typedef {{
 *   propertyPath?: import('clownface-shacl-path').ShaclPropertyPath
 *   recordErrorsLevel?: number
 *   maxErrors?: number
 *   maxNodeChecks?: number
 *   nestedResults?: Record<string, import('clownface').GraphPointer[]>
 * }} Options
 */

class ValidationEngine {
  /**
   * @param {import('../index.js').default} context
   * @param {Options} options
   */
  constructor(context, options) {
    this.context = context
    this.factory = context.factory
    this.maxErrors = options.maxErrors
    this.maxNodeChecks = options.maxNodeChecks === undefined ? defaultMaxNodeChecks : options.maxNodeChecks
    this.propertyPath = options.propertyPath
    this.initReport()
    this.recordErrorsLevel = options.recordErrorsLevel || 0
    this.violationsCount = 0
    this.validationError = null
    this.nestedResults = options.nestedResults || {}
    /**
     * @type {Record<string, number>}
     */
    this.nodeCheckCounters = {}
    this.reportPointer = this.factory.clownface().blankNode()
  }

  /**
   * @param {Options} [options]
   * @return {ValidationEngine}
   */
  clone({ propertyPath, recordErrorsLevel } = {}) {
    return new ValidationEngine(this.context, {
      maxErrors: this.maxErrors,
      maxNodeChecks: this.maxNodeChecks,
      propertyPath,
      recordErrorsLevel,
    })
  }

  initReport() {
    const { rdf, sh } = this.context.ns
    this.nodeCheckCounters = {}

    this.reportPointer = this.factory.clownface({
      term: this.factory.blankNode('report'),
    }).addOut(rdf.type, sh.ValidationReport)
  }

  /**
   * Validates the data graph against the shapes graph
   *
   * @param {import('clownface').AnyPointer} dataGraph
   */
  validateAll(dataGraph) {
    if (this.maxErrorsReached()) return true

    this.validationError = null
    try {
      this.initReport()
      let foundError = false
      const shapes = this.context.shapesGraph.shapesWithTarget
      for (const shape of shapes) {
        const focusNodes = shape.getTargetNodes(dataGraph)
        for (const focusNode of focusNodes) {
          if (this.validateNodeAgainstShape(focusNode, shape, dataGraph)) {
            foundError = true
          }
        }
      }
      return foundError
    } catch (e) {
      this.validationError = e
      return true // Really? Why do we even return a boolean here?
    }
  }

  /**
   * Returns true if any violation has been found
   *
   * @param {import('@rdfjs/types').Term} focusNode
   * @param {import('./shapes-graph.js').Shape} shape
   * @param {import('clownface').AnyPointer} dataGraph
   */
  validateNodeAgainstShape(focusNode, shape, dataGraph) {
    if (this.maxErrorsReached()) return true

    if (shape.deactivated) return false

    if (this.maxNodeChecks > 0) {
      // check how many times we have already tested this focusNode against this shape
      const id = JSON.stringify([focusNode, shape.shapeNode])
      const nodeCheckCounter = this.nodeCheckCounters[id] === undefined ? 0 : this.nodeCheckCounters[id]
      if (nodeCheckCounter > this.maxNodeChecks) {
        // max node checks reached, so bail out
        return false
      }
      // increment check counter for given focusNode/shape pair
      this.nodeCheckCounters[id] = nodeCheckCounter + 1
    }

    const valueNodes = shape.getValueNodes(focusNode, dataGraph)
    let errorFound = false
    for (const constraint of shape.constraints) {
      if (this.validateNodeAgainstConstraint(focusNode, valueNodes, constraint, dataGraph)) {
        errorFound = true
      }
    }
    return errorFound
  }

  /**
   * @param {import('@rdfjs/types').Term} focusNode
   * @param {import('@rdfjs/types').Term[]} valueNodes
   * @param {import('./shapes-graph.js').Constraint} constraint
   * @param {import('clownface').AnyPointer} dataGraph
   */
  validateNodeAgainstConstraint(focusNode, valueNodes, constraint, dataGraph) {
    const { sh } = this.context.ns

    if (this.maxErrorsReached()) return true

    // If constraint is `sh:property`, follow `sh:property` and validate each value against the property shape
    if (sh.PropertyConstraintComponent.equals(constraint.component.node)) {
      let errorFound = false
      for (const valueNode of valueNodes) {
        if (this.validateNodeAgainstShape(valueNode, this.context.shapesGraph.getShape(constraint.paramValue), dataGraph)) {
          errorFound = true
        }
      }
      return errorFound
    }

    if (!constraint.validationFunction) {
      throw new Error('Cannot find validator for constraint component ' + constraint.component.node.value)
    }

    if (constraint.isValidationFunctionGeneric) {
      // Generic sh:validator is called for each value node separately
      let errorFound = false
      for (const valueNode of valueNodes) {
        if (this.maxErrorsReached()) {
          break
        }

        const valueNodeError = this.validateValueNodeAgainstConstraint(focusNode, valueNode, constraint)

        if (valueNodeError) {
          this.violationsCount++
        }

        errorFound = errorFound || valueNodeError
      }

      return errorFound
    } else {
      return this.validateValueNodeAgainstConstraint(focusNode, null, constraint)
    }
  }

  /**
   *
   * @param {import('@rdfjs/types').Term} focusNode
   * @param {import('@rdfjs/types').Term | null} valueNode
   * @param {import('./shapes-graph.js').Constraint} constraint
   */
  validateValueNodeAgainstConstraint(focusNode, valueNode, constraint) {
    const { sh } = this.context.ns

    this.recordErrorsLevel++
    const validationOutput = constraint.validationFunction?.execute(focusNode, valueNode, constraint)

    const validationResults = Array.isArray(validationOutput) ? validationOutput : [validationOutput]
    /**
     * @type {import('clownface').GraphPointer[]}
     */
    // @ts-ignore
    const results = validationResults
      .map(validationResult => this.createResultFromObject(validationResult, constraint, focusNode, valueNode))
      .filter(Boolean)

    if (this.recordErrorsLevel === 1) {
      for (const result of results) {
        copyResult(result, this.reportPointer, sh.result)
      }
    } else {
      // Gather nested results. They will be linked later when their parent result is created.
      this.nestedResults[this.recordErrorsLevel] = (this.nestedResults[this.recordErrorsLevel] || []).concat(results)
    }

    this.recordErrorsLevel--

    return results.length > 0
  }

  maxErrorsReached() {
    if (this.maxErrors) {
      return this.violationsCount >= this.maxErrors
    } else {
      return false
    }
  }

  getReport() {
    if (this.validationError) {
      error('Validation Failure: ' + this.validationError)
      throw (this.validationError)
    } else {
      return new ValidationReport(this.reportPointer, { factory: this.factory, ns: this.context.ns })
    }
  }

  /**
   * Creates all the validation result nodes and messages for the result of applying the validation logic
   * of a constraints against a node.
   * Result passed as the first argument can be false, a resultMessage or a validation result object.
   * If none of these values is passed no error result or error message will be created.
   *
   * @param {void|undefined|boolean|string|ValidationResult} validationResult
   * @param {import('./shapes-graph.js').Constraint} constraint
   * @param {import('@rdfjs/types').Term} focusNode
   * @param {import('@rdfjs/types').Term | null} valueNode
   */
  createResultFromObject(validationResult, constraint, focusNode, valueNode) {
    const { sh } = this.context.ns

    const validationResultObj = this.normalizeValidationResult(validationResult, valueNode)

    // Validation was successful. No result.
    if (!validationResultObj) {
      return null
    }

    const result = this.createResult(constraint, focusNode)

    if (validationResultObj.path) {
      result.addOut(sh.resultPath, validationResultObj.path)
      this.copyNestedStructure(validationResultObj.path, result)
    } else if (constraint.shape.isPropertyShape && constraint.shape.path) {
      result.addOut(sh.resultPath, constraint.shape.path)
      this.copyNestedStructure(constraint.shape.path, result)
    }

    if (validationResultObj.value) {
      result.addOut(sh.value, validationResultObj.value)
      this.copyNestedStructure(validationResultObj.value, result)
    } else if (valueNode) {
      result.addOut(sh.value, valueNode)
      this.copyNestedStructure(valueNode, result)
    }

    const messages = this.createResultMessages(validationResultObj, constraint)
    for (const message of messages) {
      result.addOut(sh.resultMessage, message)
    }

    return result
  }

  /**
   * Validators can return a boolean, a string (message) or a validation result object.
   * This function normalizes all of them as a validation result object.
   *
   * @param {void|undefined|boolean|string|ValidationResult} validationResult
   * @param {import('@rdfjs/types').Term | null} valueNode
   * @return {null|ValidationResult} null if validation was successful.
   */
  normalizeValidationResult(validationResult, valueNode) {
    if (validationResult === false) {
      return { value: valueNode }
    } else if (typeof validationResult === 'string') {
      return { message: validationResult, value: valueNode }
    } else if (typeof validationResult === 'object') {
      return validationResult
    } else {
      return null
    }
  }

  /**
   * Creates a new BlankNode holding the SHACL validation result, adding the default
   * properties for the constraint, focused node and value node
   *
   * @param {import('./shapes-graph.js').Constraint} constraint
   * @param {import('@rdfjs/types').Term} focusNode
   * @returns {import('clownface').GraphPointer}
   */
  createResult(constraint, focusNode) {
    const { rdf, sh } = this.context.ns
    const severity = constraint.shape.severity
    const sourceConstraintComponent = constraint.component.node
    const sourceShape = constraint.shape.shapeNode
    const result = this.factory.clownface().blankNode()

    result
      .addOut(rdf.type, sh.ValidationResult)
      .addOut(sh.resultSeverity, severity)
      .addOut(sh.sourceConstraintComponent, sourceConstraintComponent)
      .addOut(sh.sourceShape, sourceShape)
      .addOut(sh.focusNode, focusNode)

    this.copySourceShapeStructure(constraint.shape, result)
    this.copyNestedStructure(focusNode, result)

    const children = this.nestedResults[this.recordErrorsLevel + 1]
    if (children) {
      if (sourceConstraintComponent.equals(sh.NodeConstraintComponent)) {
        for (const child of children) {
          copyResult(child, result, sh.detail)
        }
      } else {
        // Any nested result from non-sh:node shapes are currently droped
      }
      this.nestedResults[this.recordErrorsLevel + 1] = []
    }

    return result
  }

  /**
   * @param {import('@rdfjs/types').Term} subject
   * @param {import('clownface').GraphPointer} result
   */
  copyNestedStructure(subject, result) {
    const structureQuads = extractStructure(this.context.$shapes.dataset, subject)
    for (const quad of structureQuads) {
      result.dataset.add(quad)
    }
  }

  /**
   * @param {import('./shapes-graph.js').Shape} shape
   * @param {import('clownface').GraphPointer} result
   */
  copySourceShapeStructure(shape, result) {
    const structureQuads = extractSourceShapeStructure(shape, this.context.$shapes.dataset, shape.shapeNode)
    for (const quad of structureQuads) {
      result.dataset.add(quad)
    }
  }

  /**
   * Creates a result message from the validation result and the message pattern in the constraint
   *
   * @param {ValidationResult} validationResult
   * @param {import('./shapes-graph.js').Constraint} constraint
   */
  createResultMessages(validationResult, constraint) {
    const { $shapes, ns } = this.context
    const { sh } = ns

    /**
     * @type {import('@rdfjs/types').Literal[]}
     */
    let messages = []

    // 1. Try to get message from the validation result
    if (validationResult.message) {
      messages = [this.factory.literal(validationResult.message)]
    }

    // 2. Try to get message from the shape itself
    if (messages.length === 0) {
      messages = $shapes
        .node(constraint.shape.shapeNode)
        .out(sh.message)
        .filter(isLiteral)
        .terms
    }

    // 3. Try to get message from the constraint component validator
    if (messages.length === 0) {
      messages = constraint.componentMessages.map((/** @type string */ m) => this.factory.literal(m))
    }

    // 4. Try to get message from the constraint component node
    if (messages.length === 0) {
      messages = $shapes
        .node(constraint.component.node)
        .out(sh.message)
        .filter(isLiteral)
        .terms
    }

    return messages.map(message => withSubstitutions(message, constraint, this.factory))
  }
}

// TODO: This is not the 100% correct local name algorithm
/**
 * @param {string} uri
 * @return {string}
 */
function localName(uri) {
  let index = uri.lastIndexOf('#')

  if (index < 0) {
    index = uri.lastIndexOf('/')
  }

  if (index < 0) {
    throw new Error(`Cannot get local name of ${uri}`)
  }

  return uri.substring(index + 1)
}

/**
 * @template T
 * @param {number} n
 * @param {Iterable<T>} iterable
 * @return {Generator<T>}
 */
function * take(n, iterable) {
  let i = 0
  for (const item of iterable) {
    if (i++ === n) break
    yield item
  }
}

/**
 * @param {import('./shapes-graph.js').Constraint} constraint
 * @param {import('@rdfjs/types').Term} param
 */
function nodeLabel(constraint, param) {
  const node = constraint.getParameterValue(param)
  if (!node) {
    return 'NULL'
  }

  if (node.termType === 'NamedNode') {
    // TODO: shrink URI if possible
    return '<' + node.value + '>'
  }

  if (node.termType === 'BlankNode') {
    if (constraint.nodeSet) {
      const limit = 3
      if (constraint.nodeSet.size > limit) {
        const prefix = Array.from(take(limit, constraint.nodeSet)).map(x => x.value)
        return prefix.join(', ') + ` ... (and ${constraint.nodeSet.size - limit} more)`
      } else {
        return Array.from(constraint.nodeSet).map(x => x.value).join(', ')
      }
    }

    return 'Blank node ' + node.value
  }

  return node.value
}

/**
 *
 * @param {import('@rdfjs/types').Literal} messageTerm
 * @param {import('./shapes-graph.js').Constraint} constraint
 * @param {import('./defaultEnv.js').Environment} factory
 * @return {import('@rdfjs/types').Literal}
 */
function withSubstitutions(messageTerm, constraint, factory) {
  const message = constraint.component.parameters.reduce((message, param) => {
    const paramName = localName(param.value)
    const paramValue = nodeLabel(constraint, param)
    return message
      .replace(`{$${paramName}}`, paramValue)
      .replace(`{?${paramName}}`, paramValue)
  }, messageTerm.value)

  return factory.literal(message, messageTerm.language || messageTerm.datatype)
}

/**
 * Copy a standalone result pointer/dataset into another pointer/dataset
 * and link it with the given predicate
 *
 * @param {import('clownface').GraphPointer} resultPointer
 * @param {import('clownface').GraphPointer} targetPointer
 * @param {import('@rdfjs/types').Quad_Predicate} predicate
 */
function copyResult(resultPointer, targetPointer, predicate) {
  for (const quad of resultPointer.dataset) {
    targetPointer.dataset.add(quad)
  }

  targetPointer.addOut(predicate, resultPointer)
}

export default ValidationEngine
