// A simple SHACL validator in JavaScript based on SHACL-JS.

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

const RDFQuery = require('./rdfquery')
const RDFQueryUtil = require('./rdfquery/util')
const NodeSet = require('./node-set')
const ValidationFunction = require('./validation-function')
const validatorsRegistry = require('./validators-registry')
const { toRDFQueryPath } = require('./validators')
const { rdfs, sh } = require('./namespaces')

class ShapesGraph {
  constructor (context) {
    this.context = context

    // Collect all defined constraint components
    const componentNodes = new RDFQueryUtil(context.$shapes).getInstancesOf(sh.ConstraintComponent)
    this.components = [...componentNodes].map((node) => new ConstraintComponent(node, context))

    // Build map from parameters to constraint components
    this.parametersMap = {}
    for (let i = 0; i < this.components.length; i++) {
      const component = this.components[i]
      const parameters = component.getParameters()
      for (let j = 0; j < parameters.length; j++) {
        this.parametersMap[parameters[j].value] = component
      }
    }

    // Collection of shapes is populated on demand - here we remember the instances
    this.shapes = {} // Keys are the URIs/bnode ids of the shape nodes
  }

  getComponentWithParameter (parameter) {
    return this.parametersMap[parameter.value]
  }

  getShape (shapeNode) {
    let shape = this.shapes[shapeNode.value]
    if (!shape) {
      shape = new Shape(this.context, shapeNode)
      this.shapes[shapeNode.value] = shape
    }
    return shape
  }

  getShapeNodesWithConstraints () {
    if (!this.shapeNodesWithConstraints) {
      const set = new NodeSet()
      for (let i = 0; i < this.components.length; i++) {
        const params = this.components[i].requiredParameters
        for (let j = 0; j < params.length; j++) {
          const shapesWithParam = [...this.context.$shapes
            .match(null, params[j], null)]
            .map(({ subject }) => subject)
          set.addAll(shapesWithParam)
        }
      }
      this.shapeNodesWithConstraints = [...set]
    }
    return this.shapeNodesWithConstraints
  }

  getShapesWithTarget () {
    const $shapes = this.context.$shapes

    if (!this.targetShapes) {
      this.targetShapes = []
      const cs = this.getShapeNodesWithConstraints()
      for (let i = 0; i < cs.length; i++) {
        const shapeNode = cs[i]
        if (
          new RDFQueryUtil($shapes).isInstanceOf(shapeNode, rdfs.Class) ||
          $shapes.hasMatch(shapeNode, sh.targetClass, null) ||
          $shapes.hasMatch(shapeNode, sh.targetNode, null) ||
          $shapes.hasMatch(shapeNode, sh.targetSubjectsOf, null) ||
          $shapes.hasMatch(shapeNode, sh.targetObjectsOf, null) ||
          $shapes.hasMatch(shapeNode, sh.target, null)
        ) {
          this.targetShapes.push(this.getShape(shapeNode))
        }
      }
    }

    return this.targetShapes
  }
}

class Constraint {
  constructor (shape, component, paramValue, rdfShapesGraph) {
    this.shape = shape
    this.component = component
    this.paramValue = paramValue
    const parameterValues = {}
    const params = component.getParameters()
    for (let i = 0; i < params.length; i++) {
      const param = params[i]
      const value = paramValue || rdfShapesGraph.cf.node(shape.shapeNode).out(param).term
      if (value) {
        const localName = RDFQuery.getLocalName(param.value)
        parameterValues[localName] = value
      }
    }
    this.parameterValues = parameterValues
  }

  getParameterValue (paramName) {
    return this.parameterValues[paramName]
  }

  get componentMessages () {
    return this.component.getMessages(this.shape)
  }
}

class ConstraintComponent {
  constructor (node, context) {
    this.context = context
    this.node = node

    this.parameters = []
    this.parameterNodes = []
    this.requiredParameters = []
    this.optionals = {}
    const trueTerm = this.context.factory.term('true')
    this.context.$shapes.cf
      .node(node)
      .out(sh.parameter)
      .forEach(parameterCf => {
        const parameter = parameterCf.term

        parameterCf.out(sh.path).forEach(({ term: path }) => {
          this.parameters.push(path)
          this.parameterNodes.push(parameter)
          if (this.context.$shapes.hasMatch(parameter, sh.optional, trueTerm)) {
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

  findValidationFunction (predicate) {
    const validatorType = predicate.value.split('#').slice(-1)[0]
    const validator = this.findValidator(validatorType)

    if (!validator) return null

    return new ValidationFunction(this.context, validator.func.name, this.parameters, validator.func)
  }

  getMessages (shape) {
    const generic = shape.isPropertyShape() ? this.propertyValidationFunctionGeneric : this.nodeValidationFunctionGeneric
    const validatorType = generic ? 'validator' : (shape.isPropertyShape() ? 'propertyValidator' : 'nodeValidator')
    const validator = this.findValidator(validatorType)

    if (!validator) return []

    const message = validator.message

    return message ? [message] : []
  }

  findValidator (validatorType) {
    const constraintValidators = validatorsRegistry[this.node.value]

    if (!constraintValidators) return null

    const validator = constraintValidators[validatorType]

    return validator || null
  }

  getParameters () {
    return this.parameters
  }

  isComplete (shapeNode) {
    for (let i = 0; i < this.parameters.length; i++) {
      const parameter = this.parameters[i]
      if (!this.isOptional(parameter.value)) {
        if (!this.context.$shapes.hasMatch(shapeNode, parameter, null)) {
          return false
        }
      }
    }
    return true
  }

  isOptional (parameterURI) {
    return this.optionals[parameterURI]
  }
}

class Shape {
  constructor (context, shapeNode) {
    this.context = context
    this.severity = context.$shapes.cf.node(shapeNode).out(sh.severity).term
    if (!this.severity) {
      this.severity = context.factory.term('sh:Violation')
    }

    this.deactivated = context.$shapes.cf.node(shapeNode).out(sh.deactivated).value === 'true'
    this.path = context.$shapes.cf.node(shapeNode).out(sh.path).term
    this.shapeNode = shapeNode
    this.constraints = []

    const handled = new NodeSet()
    const shapeProperties = [...context.$shapes.match(shapeNode, null, null)]
    shapeProperties.forEach((sol) => {
      const component = this.context.shapesGraph.getComponentWithParameter(sol.predicate)
      if (component && !handled.has(component.node)) {
        const params = component.getParameters()
        if (params.length === 1) {
          this.constraints.push(new Constraint(this, component, sol.object, context.$shapes))
        } else if (component.isComplete(shapeNode)) {
          this.constraints.push(new Constraint(this, component, undefined, context.$shapes))
          handled.add(component.node)
        }
      }
    })
  }

  getConstraints () {
    return this.constraints
  }

  getTargetNodes (rdfDataGraph) {
    const results = new NodeSet()

    if (new RDFQueryUtil(this.context.$shapes).isInstanceOf(this.shapeNode, rdfs.Class)) {
      results.addAll(new RDFQueryUtil(rdfDataGraph).getInstancesOf(this.shapeNode))
    }

    const targetClasses = [...this.context.$shapes.match(this.shapeNode, sh.targetClass, null)]
    targetClasses.forEach(({ object: targetClass }) => {
      results.addAll(new RDFQueryUtil(rdfDataGraph).getInstancesOf(targetClass))
    })

    results.addAll(this.context.$shapes.cf.node(this.shapeNode).out(sh.targetNode).terms)

    this.context.$shapes.cf
      .node(this.shapeNode)
      .out(sh.targetSubjectsOf)
      .terms
      .forEach((predicate) => {
        const subjects = [...rdfDataGraph.match(null, predicate, null)].map(({ subject }) => subject)
        results.addAll(subjects)
      })

    this.context.$shapes.cf
      .node(this.shapeNode)
      .out(sh.targetObjectsOf)
      .terms
      .forEach((predicate) => {
        const objects = [...rdfDataGraph.match(null, predicate, null)].map(({ object }) => object)
        results.addAll(objects)
      })

    return [...results]
  }

  getValueNodes (focusNode, rdfDataGraph) {
    if (this.path) {
      return rdfDataGraph.query().path(focusNode, toRDFQueryPath(this.context.$shapes, this.path), '?object').getNodeArray('?object')
    } else {
      return [focusNode]
    }
  }

  isPropertyShape () {
    return this.path != null
  }
}

module.exports = ShapesGraph
