/* eslint-disable no-use-before-define, camelcase */
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

import type { NamedNode, Term } from '@rdfjs/types'
import type { AnyPointer, GraphPointer } from 'clownface'
import type SHACLValidator from '../index.js'
import NodeSet from './node-set.js'
import type { ShaclPropertyPath } from './property-path.js'
import { extractPropertyPath, getPathObjects } from './property-path.js'
import { getInstancesOf, isInstanceOf, rdfListToArray } from './dataset-utils.js'
import type { ValidationFunction, Validator } from './validation-engine.js'

class ShapesGraph {
  declare context: SHACLValidator
  private readonly _components: ConstraintComponent[]
  private readonly _parametersMap: Map<string, ConstraintComponent>
  private readonly _shapes: Map<string, Shape>
  private _shapeNodesWithConstraints: Term[] | undefined
  private _shapesWithTarget: Shape[] | undefined

  constructor(context: SHACLValidator) {
    this.context = context

    // Collect all defined constraint components
    const { sh } = context.ns
    const componentNodes = getInstancesOf(context.$shapes.node(sh.ConstraintComponent), context.ns)
    this._components = [...componentNodes].map((node: NamedNode) => new ConstraintComponent(node, context))

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

  getComponentWithParameter(parameter: Term): ConstraintComponent | undefined {
    return this._parametersMap.get(parameter.value)
  }

  getShape(shapeNode: Term) {
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

export class Constraint {
  declare shapeNodePointer: AnyPointer
  readonly paramValue: Term
  private _parameterValues: Map<NamedNode, Term>
  private inNodeSet: NodeSet | undefined

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(public readonly shape: Shape, public readonly component: ConstraintComponent, shapesGraph: AnyPointer, _parameterValuesOrSingleParam: Term | Map<NamedNode, Term>) {
    this.shapeNodePointer = shapesGraph.node(shape.shapeNode)
    if ('termType' in _parameterValuesOrSingleParam) {
      this.paramValue = _parameterValuesOrSingleParam
    } else {
      this._parameterValues = _parameterValuesOrSingleParam
    }
  }

  get validate() {
    if (this.component.validator && this.validationFunction) {
      return (focusNode: Term, valueNode: Term) => {
        return this.validationFunction(focusNode, valueNode, this)
      }
    }
  }

  static * fromShape(shape: Shape, component: ConstraintComponent, shapesGraph: AnyPointer) {
    const allParams: [NamedNode, Term[]][] = component.parameters.map((param) => {
      return [param, shape.shapeNodePointer.out(param).terms]
    })

    // create a cartesian product of all parameter values
    const combinations: [NamedNode, Term][][] = allParams.reduce((acc, [param, values]) => {
      if (values.length === 0) {
        return acc
      }

      if (acc.length === 0) {
        return values.map((value) => [[param, value]])
      }

      return acc.flatMap((comb) => values.map((value) => comb.concat([[param, value]])))
    }, [])

    for (const combination of combinations) {
      if (component.parameters.length === 1) {
        yield new Constraint(shape, component, shapesGraph, combination[0][1])
        continue
      }
      const params = shape.context.factory.termMap(combination)
      if (component.isComplete(params)) {
        yield new Constraint(shape, component, shapesGraph, params)
      }
    }
  }

  getParameterValue(param: NamedNode) {
    return this.paramValue || this._parameterValues.get(param)
  }

  get pathObject() {
    return this.shape.pathObject
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

  get nodeSet() {
    const { sh } = this.shape.context.ns
    if (!this.inNodeSet) {
      this.inNodeSet = new NodeSet(rdfListToArray(this.shapeNodePointer.out(sh.in)))
    }
    return this.inNodeSet
  }
}

class ConstraintComponent {
  declare nodePointer: GraphPointer
  declare parameters: Term[]
  declare parameterNodes: unknown[]
  declare requiredParameters: Term[]
  declare optionals: Record<string, unknown>
  declare validator: Validator | undefined
  declare nodeValidationFunction: (focusNode: Term, valueNode: Term, constraint: Constraint) => ReturnType<ValidationFunction>
  declare nodeValidationFunctionGeneric: boolean
  declare nodeValidationMessage: string | undefined
  declare propertyValidationFunction: (focusNode: Term, valueNode: Term, constraint: Constraint) => ReturnType<ValidationFunction>
  declare propertyValidationFunctionGeneric: boolean
  declare propertyValidationMessage: string | undefined

  constructor(readonly node: NamedNode, readonly context: SHACLValidator) {
    const { $shapes, factory, ns } = context
    const { sh, xsd } = ns

    this.nodePointer = $shapes.node(node)

    this.parameters = []
    this.parameterNodes = []
    this.requiredParameters = []
    this.optionals = {}
    const trueTerm = factory.literal('true', xsd.boolean)
    this.nodePointer
      .out(sh.parameter)
      .forEach((parameterCf) => {
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

    this.validator = context.validators.get(node)
    if (!this.validator) {
      return
    }

    if ('nodeValidate' in this.validator) {
      this.nodeValidationFunction = this.validator.nodeValidate.bind(undefined, this.context)
      this.nodeValidationMessage = this.validator.nodeValidationMessage
    } else if ('validate' in this.validator) {
      this.nodeValidationFunction = this.validator.validate.bind(undefined, this.context)
      this.nodeValidationMessage = this.validator.validationMessage
      this.nodeValidationFunctionGeneric = true
    }
    if ('propertyValidate' in this.validator) {
      this.propertyValidationFunction = this.validator.propertyValidate.bind(undefined, this.context)
      this.propertyValidationMessage = this.validator.propertyValidationMessage
    } else if ('validate' in this.validator) {
      this.propertyValidationFunction = this.validator.validate.bind(undefined, this.context)
      this.propertyValidationMessage = this.validator.validationMessage
      this.propertyValidationFunctionGeneric = true
    }
  }

  getMessages(shape: Shape): [string] | [] {
    const message = shape.isPropertyShape ? this.propertyValidationMessage : this.nodeValidationMessage
    return message ? [message] : []
  }

  isComplete(parameterValues: Map<Term, unknown>) {
    return this.requiredParameters.every((param) => parameterValues.has(param))
  }
}

export class Shape {
  declare context: SHACLValidator
  declare shapeNode: Term
  declare shapeNodePointer: GraphPointer
  declare severity: Term
  declare deactivated: boolean
  declare path: GraphPointer | undefined
  declare pathObject: ShaclPropertyPath | null
  declare constraints: Constraint[]

  constructor(context: SHACLValidator, shapeNode: Term) {
    const { $shapes, ns, shapesGraph, allowNamedNodeInList: allowNamedNodeSequencePaths } = context
    const { sh } = ns

    this.context = context
    this.shapeNode = shapeNode
    this.shapeNodePointer = $shapes.node(shapeNode)

    this.severity = this.shapeNodePointer.out(sh.severity).term || sh.Violation
    this.deactivated = this.shapeNodePointer.out(sh.deactivated).value === 'true'
    this.pathObject = null
    const path = this.shapeNodePointer.out(sh.path)
    if (path.term) {
      this.path = path as GraphPointer
      this.pathObject = extractPropertyPath(this.path, ns, allowNamedNodeSequencePaths)
    }

    this.constraints = []
    const handled = new NodeSet()
    const shapeProperties = [...$shapes.dataset.match(shapeNode, null, null)]
    shapeProperties.forEach((sol) => {
      const component = shapesGraph.getComponentWithParameter(sol.predicate)
      if (component && !handled.has(component.node)) {
        this.constraints.push(...Constraint.fromShape(this, component, $shapes))
        handled.add(component.node)
      }
    })
  }

  get isPropertyShape() {
    return this.pathObject != null
  }

  overridePath(path: ShaclPropertyPath) {
    const shape = new Shape(this.context, this.shapeNode)
    shape.pathObject = path
    return shape
  }

  getTargetNodes(dataGraph: AnyPointer) {
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
      .filter((targetNode) => (
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

  getValueNodes(focusNode: Term, dataGraph: AnyPointer) {
    if (this.pathObject) {
      return getPathObjects(dataGraph, focusNode, this.pathObject)
    } else {
      return [focusNode]
    }
  }
}

export default ShapesGraph
