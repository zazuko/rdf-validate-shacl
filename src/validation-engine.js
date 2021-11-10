const clownface = require('clownface')
const ValidationReport = require('./validation-report')
const { extractStructure } = require('./dataset-utils')
const error = require('debug')('validation-enging::error')

class ValidationEngine {
  constructor (context, options) {
    this.context = context
    this.factory = context.factory
    this.maxErrors = options.maxErrors
    this.initReport()
    this.recordErrorsLevel = 0
    this.violationsCount = 0
    this.validationError = null
  }

  initReport () {
    const { rdf, sh } = this.context.ns

    this.reportPointer = clownface({
      dataset: this.factory.dataset(),
      factory: this.factory,
      term: this.factory.blankNode('report'),
    }).addOut(rdf.type, sh.ValidationReport)
  }

  /**
   * Validates the data graph against the shapes graph
   *
   * @param {Clownface} dataGraph
   */
  validateAll (dataGraph) {
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
   */
  validateNodeAgainstShape (focusNode, shape, dataGraph) {
    if (this.maxErrorsReached()) return true

    if (shape.deactivated) return false

    const valueNodes = shape.getValueNodes(focusNode, dataGraph)
    let errorFound = false
    for (const constraint of shape.constraints) {
      if (this.validateNodeAgainstConstraint(focusNode, valueNodes, constraint, dataGraph)) {
        errorFound = true
      }
    }
    return errorFound
  }

  validateNodeAgainstConstraint (focusNode, valueNodes, constraint, dataGraph) {
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

  validateValueNodeAgainstConstraint(focusNode, valueNode, constraint) {
    this.recordErrorsLevel++
    const obj = constraint.validationFunction.execute(focusNode, valueNode, constraint)
    this.recordErrorsLevel--

    let errorFound = false
    const objs = Array.isArray(obj) ? obj : [obj]
    for (const item of objs) {
      const objError = this.createResultFromObject(item, constraint, focusNode, valueNode)
      errorFound = errorFound || objError
    }
    return errorFound
  }

  maxErrorsReached () {
    if (this.maxErrors) {
      return this.violationsCount >= this.maxErrors
    } else {
      return false
    }
  }

  getReport () {
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
   */
  createResultFromObject (validationResult, constraint, focusNode, valueNode) {
    const { sh } = this.context.ns

    const validationResultObj = this.normalizeValidationResult(validationResult, valueNode)

    // Validation was successful. No result.
    if (!validationResultObj) {
      return false
    }

    // Nested validation results are currently discarded.
    if (this.recordErrorsLevel > 0) {
      return true
    }

    const result = this.createResult(constraint, focusNode)

    if (validationResultObj.path) {
      result.addOut(sh.resultPath, validationResultObj.path)
      this.copyNestedStructure(validationResultObj.path)
    } else if (constraint.shape.isPropertyShape) {
      result.addOut(sh.resultPath, constraint.shape.path)
      this.copyNestedStructure(constraint.shape.path)
    }

    if (validationResultObj.value) {
      result.addOut(sh.value, validationResultObj.value)
      this.copyNestedStructure(validationResultObj.value)
    } else if (valueNode) {
      result.addOut(sh.value, valueNode)
      this.copyNestedStructure(valueNode)
    }

    const messages = this.createResultMessages(validationResultObj, constraint)
    for (const message of messages) {
      result.addOut(sh.resultMessage, message)
    }

    return true
  }

  /**
   * Validators can return a boolean, a string (message) or a validation result object.
   * This function normalizes all of them as a validation result object.
   *
   * Returns null if validation was successful.
   */
  normalizeValidationResult (validationResult, valueNode) {
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
   */
  createResult (constraint, focusNode) {
    const { rdf, sh } = this.context.ns
    const severity = constraint.shape.severity
    const sourceConstraintComponent = constraint.component.node
    const sourceShape = constraint.shape.shapeNode
    const resultId = this.reportPointer.blankNode()
    this.reportPointer.addOut(sh.result, resultId)
    const result = this.reportPointer.node(resultId)

    result
      .addOut(rdf.type, sh.ValidationResult)
      .addOut(sh.resultSeverity, severity)
      .addOut(sh.sourceConstraintComponent, sourceConstraintComponent)
      .addOut(sh.sourceShape, sourceShape)
      .addOut(sh.focusNode, focusNode)

    this.copyNestedStructure(sourceShape)
    this.copyNestedStructure(focusNode)

    return result
  }

  copyNestedStructure (subject) {
    const structureQuads = extractStructure(this.context.$shapes.dataset, subject)
    for (const quad of structureQuads) {
      this.reportPointer.dataset.add(quad)
    }
  }

  /**
   * Creates a result message from the validation result and the message pattern in the constraint
   */
  createResultMessages (validationResult, constraint) {
    const { $shapes, ns } = this.context
    const { sh } = ns

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
        .terms
    }

    // 3. Try to get message from the constraint component validator
    if (messages.length === 0) {
      messages = constraint.componentMessages.map((m) => this.factory.literal(m))
    }

    // 4. Try to get message from the constraint component node
    if (messages.length === 0) {
      messages = $shapes
        .node(constraint.component.node)
        .out(sh.message)
        .terms
    }

    return messages.map(message => withSubstitutions(message, constraint, this.factory))
  }
}

// TODO: This is not the 100% correct local name algorithm
function localName (uri) {
  let index = uri.lastIndexOf('#')

  if (index < 0) {
    index = uri.lastIndexOf('/')
  }

  if (index < 0) {
    throw new Error(`Cannot get local name of ${uri}`)
  }

  return uri.substring(index + 1)
}

function nodeLabel (node) {
  if (!node) {
    return 'NULL'
  }

  if (node.termType === 'NamedNode') {
    // TODO: shrink URI if possible
    return '<' + node.value + '>'
  }

  if (node.termType === 'BlankNode') {
    return 'Blank node ' + node.value
  }

  return node.value
}

function withSubstitutions (messageTerm, constraint, factory) {
  const message = constraint.component.parameters.reduce((message, param) => {
    const paramName = localName(param.value)
    const paramValue = nodeLabel(constraint.getParameterValue(param))
    return message
      .replace(`{$${paramName}}`, paramValue)
      .replace(`{?${paramName}}`, paramValue)
  }, messageTerm.value)

  return factory.literal(message, messageTerm.language || messageTerm.datatype)
}

module.exports = ValidationEngine
