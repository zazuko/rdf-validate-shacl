// Design:
//
// First, derive a ShapesGraph object from the definitions in $shapes.
// This manages a map of parameters to ConstraintComponents.
// Each ConstraintComponent manages its list of parameters and a link to the validators.
//
// The ShapesGraph also manages a list of Shapes, each which has a list of Constraints.
// A Constraint is a specific combination of parameters for a constraint component,
// and has functions to access the target nodes.
//
// Each ShapesGraph can be reused between validation calls, and thus often only needs
// to be created once per application.
//
// The validation process is started by creating a ValidationEngine that relies on
// a given ShapesGraph and operates on the current $data().
// It basically walks through all Shapes that have target nodes and runs the validators
// for each Constraint of the shape, producing results along the way.

import NodeSet from './node-set.js'
import ValidationFunction from './validation-function.js'
import validatorsRegistry from './validators-registry.js'
import { extractPropertyPath, getPathObjects } from './property-path.js'
import { getInstancesOf, isInstanceOf } from './dataset-utils.js'

class ShapesGraph {
  constructor(context) {
    this.context = context

    // Collect all defined constraint components
    const { sh } = context.ns
    const componentNodes = getInstancesOf(context.$shapes.node(sh.ConstraintComponent), context.ns)
    this._components = [...componentNodes].map((node) => new ConstraintComponent(node, context))

    // Build map from parameters to constraint components
    this._parametersMap = new Map()
    for (const component of this._components) {
      for (const parameter of component.parameters) {
        this._parametersMap.set(parameter.value, component)
      }
    }

    // Cache of shapes populated on demand
    this._shapes = new Map()
  }

  getComponentWithParameter(parameter) {
    return this._parametersMap.get(parameter.value)
  }

  getShape(shapeNode) {
    if (!this._shapes.has(shapeNode.value)) {
      const shape = new Shape(this.context, shapeNode)
      this._shapes.set(shapeNode.value, shape)
    }

    return this._shapes.get(shapeNode.value)
  }

  get shapeNodesWithConstraints() {
    if (!this._shapeNodesWithConstraints) {
      const set = new NodeSet()
      for (const component of this._components) {
        const params = component.requiredParameters
        for (const param of params) {
          const shapesWithParam = [...this.context.$shapes.dataset
            .match(null, param, null)]
            .map(({ subject }) => subject)
          set.addAll(shapesWithParam)
        }
      }
      this._shapeNodesWithConstraints = [...set]
    }

    return this._shapeNodesWithConstraints
  }

  get shapesWithTarget() {
    const { $shapes, ns } = this.context
    const { rdfs, sh } = ns

    if (!this._shapesWithTarget) {
      this._shapesWithTarget = this.shapeNodesWithConstraints
        .filter((shapeNode) => (
          isInstanceOf($shapes.node(shapeNode), $shapes.node(rdfs.Class), ns) ||
          $shapes.node(shapeNode).out([
            sh.targetClass,
            sh.targetNode,
            sh.targetSubjectsOf,
            sh.targetObjectsOf,
            sh.target,
          ]).terms.length > 0
        ))
        .map((shapeNode) => this.getShape(shapeNode))
    }

    return this._shapesWithTarget
  }
}

class Constraint {
  constructor(shape, component, paramValue, shapesGraph) {
    this.shape = shape
    this.component = component
    this.paramValue = paramValue
    this.shapeNodePointer = shapesGraph.node(shape.shapeNode)
  }

  getParameterValue(param) {
    return this.paramValue || this.shapeNodePointer.out(param).term
  }

  get validationFunction() {
    return this.shape.isPropertyShape
      ? this.component.propertyValidationFunction
      : this.component.nodeValidationFunction
  }

  get isValidationFunctionGeneric() {
    return this.shape.isPropertyShape
      ? this.component.propertyValidationFunctionGeneric
      : this.component.nodeValidationFunctionGeneric
  }

  get componentMessages() {
    return this.component.getMessages(this.shape)
  }
}

class ConstraintComponent {
  constructor(node, context) {
    const { $shapes, factory, ns } = context
    const { sh, xsd } = ns

    this.context = context
    this.node = node
    this.nodePointer = $shapes.node(node)

    this.parameters = []
    this.parameterNodes = []
    this.requiredParameters = []
    this.optionals = {}
    const trueTerm = factory.literal('true', xsd.boolean)
    this.nodePointer
      .out(sh.parameter)
      .forEach(parameterCf => {
        const parameter = parameterCf.term

        parameterCf.out(sh.path).forEach(({ term: path }) => {
          this.parameters.push(path)
          this.parameterNodes.push(parameter)
          if ($shapes.dataset.match(parameter, sh.optional, trueTerm).size > 0) {
            this.optionals[path.value] = true
          } else {
            this.requiredParameters.push(path)
          }
        })
      })

    this.nodeValidationFunction = this.findValidationFunction(sh.nodeValidator)
    if (!this.nodeValidationFunction) {
      this.nodeValidationFunction = this.findValidationFunction(sh.validator)
      this.nodeValidationFunctionGeneric = true
    }
    this.propertyValidationFunction = this.findValidationFunction(sh.propertyValidator)
    if (!this.propertyValidationFunction) {
      this.propertyValidationFunction = this.findValidationFunction(sh.validator)
      this.propertyValidationFunctionGeneric = true
    }
  }

  findValidationFunction(predicate) {
    const validatorType = predicate.value.split('#').slice(-1)[0]
    const validator = this.findValidator(validatorType)

    if (!validator) return null

    return new ValidationFunction(this.context, validator.func.name, validator.func)
  }

  getMessages(shape) {
    const generic = shape.isPropertyShape ? this.propertyValidationFunctionGeneric : this.nodeValidationFunctionGeneric
    const validatorType = generic ? 'validator' : (shape.isPropertyShape ? 'propertyValidator' : 'nodeValidator')
    const validator = this.findValidator(validatorType)

    if (!validator) return []

    const message = validator.message

    return message ? [message] : []
  }

  findValidator(validatorType) {
    const constraintValidators = validatorsRegistry[this.node.value]

    if (!constraintValidators) return null

    const validator = constraintValidators[validatorType]

    return validator || null
  }

  isComplete(shapeNode) {
    return !this.parameters.some((parameter) => (
      this.isRequired(parameter.value) &&
      this.context.$shapes.dataset.match(shapeNode, parameter, null).size === 0
    ))
  }

  isRequired(parameterURI) {
    return !this.optionals[parameterURI]
  }
}

class Shape {
  constructor(context, shapeNode) {
    const { $shapes, ns, shapesGraph } = context
    const { sh } = ns

    this.context = context
    this.shapeNode = shapeNode
    this.shapeNodePointer = $shapes.node(shapeNode)

    this.severity = this.shapeNodePointer.out(sh.severity).term || sh.Violation
    this.deactivated = this.shapeNodePointer.out(sh.deactivated).value === 'true'
    this.path = this.shapeNodePointer.out(sh.path).term
    this.isPropertyShape = this.path != null
    this._pathObject = undefined

    this.constraints = []
    const handled = new NodeSet()
    const shapeProperties = [...$shapes.dataset.match(shapeNode, null, null)]
    shapeProperties.forEach((sol) => {
      const component = shapesGraph.getComponentWithParameter(sol.predicate)
      if (component && !handled.has(component.node)) {
        const params = component.parameters
        if (params.length === 1) {
          this.constraints.push(new Constraint(this, component, sol.object, $shapes))
        } else if (component.isComplete(shapeNode)) {
          this.constraints.push(new Constraint(this, component, undefined, $shapes))
          handled.add(component.node)
        }
      }
    })
  }

  /**
   * Property path object
   * @returns {import('./property-path.js').Path}
   */
  get pathObject() {
    const { $shapes, ns, allowNamedNodeInList } = this.context

    if (this._pathObject === undefined) {
      this._pathObject = this.path ? extractPropertyPath($shapes.node(this.path), ns, allowNamedNodeInList) : null
    }

    return this._pathObject
  }

  /**
   * @param {import('clownface').AnyPointer} dataGraph
   */
  getTargetNodes(dataGraph) {
    const { $shapes, ns } = this.context
    const { rdfs, sh } = ns
    const results = new NodeSet()

    if (isInstanceOf($shapes.node(this.shapeNode), $shapes.node(rdfs.Class), ns)) {
      results.addAll(getInstancesOf(dataGraph.node(this.shapeNode), ns))
    }

    const targetClasses = [...$shapes.dataset.match(this.shapeNode, sh.targetClass, null)]
    targetClasses.forEach(({ object: targetClass }) => {
      results.addAll(getInstancesOf(dataGraph.node(targetClass), ns))
    })

    const targetNodes = this.shapeNodePointer.out(sh.targetNode).terms
      // Ensure the node exists in data graph before considering it as a validatable target node
      .filter(targetNode => (
        dataGraph.dataset.match(targetNode).size > 0 ||
        dataGraph.dataset.match(null, targetNode).size > 0 ||
        dataGraph.dataset.match(null, null, targetNode).size > 0
      ))
    results.addAll(targetNodes)

    this.shapeNodePointer
      .out(sh.targetSubjectsOf)
      .terms
      .forEach((predicate) => {
        const subjects = [...dataGraph.dataset.match(null, predicate, null)].map(({ subject }) => subject)
        results.addAll(subjects)
      })

    this.shapeNodePointer
      .out(sh.targetObjectsOf)
      .terms
      .forEach((predicate) => {
        const objects = [...dataGraph.dataset.match(null, predicate, null)].map(({ object }) => object)
        results.addAll(objects)
      })

    return [...results]
  }

  getValueNodes(focusNode, dataGraph) {
    if (this.path) {
      return getPathObjects(dataGraph, focusNode, this.pathObject)
    } else {
      return [focusNode]
    }
  }
}

export default ShapesGraph
