const ValidationReport = require('./validation-report')
const { extractStructure } = require('./dataset-utils')
const error = require('debug')('validation-enging::error')

class ValidationEngine {
  constructor (context, options) {
    this.context = context
    this.factory = context.factory
    this.maxErrors = options.maxErrors
    this.results = []
    this.recordErrorsLevel = 0
    this.violationsCount = 0
    this.validationError = null
  }

  addResultProperty (result, predicate, object) {
    this.results.push(this.factory.quad(result, predicate, object))
  }

  /**
   * Creates a new BlankNode holding the SHACL validation result, adding the default
   * properties for the constraint, focused node and value node
   */
  createResult (constraint, focusNode, valueNode) {
    const { rdf, sh } = this.context.ns
    const result = this.factory.blankNode()
    const severity = constraint.shape.severity
    const sourceConstraintComponent = constraint.component.node
    const sourceShape = constraint.shape.shapeNode
    this.addResultProperty(result, rdf.type, sh.ValidationResult)
    this.addResultProperty(result, sh.resultSeverity, severity)
    this.addResultProperty(result, sh.sourceConstraintComponent, sourceConstraintComponent)
    this.addResultPropertyDeep(result, sh.sourceShape, sourceShape)
    this.addResultPropertyDeep(result, sh.focusNode, focusNode)
    if (valueNode) {
      this.addResultPropertyDeep(result, sh.value, valueNode)
    }
    return result
  }

  addResultPropertyDeep (result, predicate, node) {
    this.addResultProperty(result, predicate, node)

    const structureQuads = extractStructure(this.context.$shapes.dataset, node)
    for (const quad of structureQuads) {
      this.results.push(quad)
    }
  }

  /**
   * Creates all the validation result nodes and messages for the result of applying the validation logic
   * of a constraints against a node.
   * Result passed as the first argument can be false, a resultMessage or a validation result object.
   * If none of these values is passed no error result or error message will be created.
   */
  createResultFromObject (obj, constraint, focusNode, valueNode) {
    const { sh, xsd } = this.context.ns

    if (obj === false) {
      if (this.recordErrorsLevel > 0) {
        return true
      }

      const result = this.createResult(constraint, focusNode, valueNode)
      if (constraint.shape.isPropertyShape()) {
        this.addResultPropertyDeep(result, sh.resultPath, constraint.shape.path, true)
      }
      this.createResultMessages(result, constraint)
      return true
    } else if (typeof obj === 'string') {
      if (this.recordErrorsLevel > 0) {
        return true
      }
      const result = this.createResult(constraint, focusNode, valueNode)
      if (constraint.shape.isPropertyShape()) {
        this.addResultPropertyDeep(result, sh.resultPath, constraint.shape.path, true)
      }
      this.addResultProperty(result, sh.resultMessage, this.factory.literal(obj, xsd.string))
      this.createResultMessages(result, constraint)
      return true
    } else if (typeof obj === 'object') {
      if (this.recordErrorsLevel > 0) {
        return true
      }
      const result = this.createResult(constraint, focusNode)
      if (obj.path) {
        this.addResultPropertyDeep(result, sh.resultPath, obj.path, true)
      } else if (constraint.shape.isPropertyShape()) {
        this.addResultPropertyDeep(result, sh.resultPath, constraint.shape.path, true)
      }
      if (obj.value) {
        this.addResultPropertyDeep(result, sh.value, obj.value)
      } else if (valueNode) {
        this.addResultPropertyDeep(result, sh.value, valueNode)
      }
      if (obj.message) {
        this.addResultProperty(result, sh.resultMessage, this.factory.literal(obj.message, xsd.string))
      } else {
        this.createResultMessages(result, constraint)
      }
      return true
    }
    return false
  }

  /**
   * Creates a result message from the result and the message pattern in the constraint
   */
  createResultMessages (result, constraint) {
    const { $shapes, ns } = this.context
    const { sh } = ns

    // 1. Try to get message from the shape itself
    let messages = $shapes
      .node(constraint.shape.shapeNode)
      .out(sh.message)
      .terms

    // 2. Try to get message from the constraint component validator
    if (messages.length === 0) {
      messages = constraint.componentMessages.map((m) => this.factory.literal(m))
    }

    // 3. Try to get message from the constraint component node
    if (messages.length === 0) {
      messages = $shapes
        .node(constraint.component.node)
        .out(sh.message)
        .terms
    }

    for (const message of messages) {
      const str = this.withSubstitutions(message, constraint)
      this.addResultProperty(result, sh.resultMessage, str)
    }
  }

  /**
   * Validates the data graph against the shapes graph
   *
   * @param {Clownface} dataGraph
   */
  validateAll (dataGraph) {
    if (this.maxErrorsReached()) {
      return true
    }

    this.validationError = null
    try {
      this.results = []
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
    if (this.maxErrorsReached()) {
      return true
    }

    if (shape.deactivated) {
      return false
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

  validateNodeAgainstConstraint (focusNode, valueNodes, constraint, dataGraph) {
    const { sh } = this.context.ns

    if (this.maxErrorsReached()) {
      return true
    }

    if (sh.PropertyConstraintComponent.equals(constraint.component.node)) {
      let errorFound = false
      for (const valueNode of valueNodes) {
        if (this.validateNodeAgainstShape(valueNode, this.context.shapesGraph.getShape(constraint.paramValue), dataGraph)) {
          errorFound = true
        }
      }
      return errorFound
    }

    const validationFunction = constraint.shape.isPropertyShape()
      ? constraint.component.propertyValidationFunction
      : constraint.component.nodeValidationFunction
    if (validationFunction) {
      const generic = constraint.shape.isPropertyShape()
        ? constraint.component.propertyValidationFunctionGeneric
        : constraint.component.nodeValidationFunctionGeneric
      if (generic) {
        // Generic sh:validator is called for each value node separately
        let errorFound = false
        for (const valueNode of valueNodes) {
          if (this.maxErrorsReached()) {
            break
          }
          let iterationError = false
          // if (validationFunction.funcName === "validateAnd" || validationFunction.funcName === "validateOr" || validationFunction.funcName === "validateNot") {
          this.recordErrorsLevel++
          // }
          const obj = validationFunction.execute(focusNode, valueNode, constraint)
          // if (validationFunction.funcName === "validateAnd" || validationFunction.funcName === "validateOr" || validationFunction.funcName === "validateNot") {
          this.recordErrorsLevel--
          // }
          if (Array.isArray(obj)) {
            for (const item of obj) {
              if (this.createResultFromObject(item, constraint, focusNode, valueNode)) {
                iterationError = true
              }
            }
          } else {
            if (this.createResultFromObject(obj, constraint, focusNode, valueNode)) {
              iterationError = true
            }
          }
          if (iterationError) {
            this.violationsCount++
          }
          errorFound = errorFound || iterationError
        }
        return errorFound
      } else {
        // if (validationFunction.funcName === "validateAnd" || validationFunction.funcName === "validateOr" || validationFunction.funcName === "validateNot") {
        this.recordErrorsLevel++
        // }
        const obj = validationFunction.execute(focusNode, null, constraint)
        // if (validationFunction.funcName === "validateAnd" || validationFunction.funcName === "validateOr" || validationFunction.funcName === "validateNot") {
        this.recordErrorsLevel--
        // }
        if (Array.isArray(obj)) {
          let errorFound = false
          for (const item of obj) {
            if (this.createResultFromObject(item, constraint, focusNode)) {
              errorFound = true
            }
          }
          return errorFound
        } else {
          if (this.createResultFromObject(obj, constraint, focusNode)) {
            return true
          }
        }
      }
    } else {
      throw new Error('Cannot find validator for constraint component ' + constraint.component.node.value)
    }
  }

  maxErrorsReached () {
    if (this.maxErrors) {
      return this.violationsCount >= this.maxErrors
    } else {
      return false
    }
  }

  withSubstitutions (messageNode, constraint) {
    const message = constraint.component.parameters.reduce((message, param) => {
      const paramName = localName(param.value)
      const paramValue = nodeLabel(constraint.getParameterValue(param))
      return message
        .replace(`{$${paramName}}`, paramValue)
        .replace(`{?${paramName}}`, paramValue)
    }, messageNode.value)

    return this.factory.literal(message, messageNode.language || messageNode.datatype)
  }

  getReport () {
    if (this.validationError) {
      error('Validation Failure: ' + this.validationError)
      throw (this.validationError)
    } else {
      return new ValidationReport(this.results, { factory: this.factory, ns: this.context.ns })
    }
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

module.exports = ValidationEngine
