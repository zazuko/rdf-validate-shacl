import shaclVocabularyFactory from '@vocabulary/sh'
import type { DatasetCore, Term } from '@rdfjs/types'
import type { AnyPointer } from 'clownface'
import type { Environment } from './src/defaultEnv.js'
import factory from './src/defaultEnv.js'
import type { Namespaces } from './src/namespaces.js'
import { prepareNamespaces } from './src/namespaces.js'
import ShapesGraph from './src/shapes-graph.js'
import ValidationEngine from './src/validation-engine.js'
import type { ShaclPropertyPath } from './src/property-path.js'

interface Options {
  factory?: Environment
  /**
   * Max number of errors before the engine stops. Defaults to finding all the errors.
   */
  maxErrors?: number
  allowNamedNodeInList?: boolean
}

/**
 * Validates RDF data based on a set of RDF shapes.
 */
class SHACLValidator {
  declare factory: Environment
  declare ns: Namespaces
  declare allowNamedNodeInList: boolean
  declare $shapes: AnyPointer
  declare $data: AnyPointer
  declare shapesGraph: ShapesGraph
  declare validationEngine: ValidationEngine
  declare depth: number

  /**
   * @param shapes - Dataset containing the SHACL shapes for validation
   * @param {object} [options] - Validator options
   */
  constructor(shapes: DatasetCore, options: Options) {
    options = options || {}

    this.factory = options.factory || factory
    this.ns = prepareNamespaces(this.factory)
    this.allowNamedNodeInList = options.allowNamedNodeInList === undefined ? false : options.allowNamedNodeInList
    const shaclQuads = shaclVocabularyFactory({ factory: this.factory })
    const dataset = this.factory.dataset(shaclQuads.concat([...(shapes)]))
    this.$shapes = this.factory.clownface({ dataset })
    this.$data = this.factory.clownface()
    this.shapesGraph = new ShapesGraph(this)
    this.validationEngine = new ValidationEngine(this, options)

    this.depth = 0
  }

  /**
   * Validates the provided data graph against the provided shapes graph
   */
  validate(dataset: DatasetCore) {
    this.$data = this.factory.clownface({ dataset })
    this.validationEngine.validateAll(this.$data)
    return this.validationEngine.getReport()
  }

  /**
   * Validates the provided focus node against the provided shape
   */
  validateNode(dataset: DatasetCore, focusNode: Term, shapeNode: Term) {
    this.$data = this.factory.clownface({ dataset })
    this.nodeConformsToShape(focusNode, shapeNode, this.validationEngine)
    return this.validationEngine.getReport()
  }

  /**
   * Exposed to be available from validation functions as `SHACL.nodeConformsToShape`
   */
  nodeConformsToShape(focusNode: Term, shapeNode: Term, propertyPathOrEngine?: ValidationEngine | ShaclPropertyPath | null) {
    let engine: ValidationEngine
    let shape = this.shapesGraph?.getShape(shapeNode)

    if (propertyPathOrEngine && 'termType' in propertyPathOrEngine) {
      engine = this.validationEngine.clone({
        recordErrorsLevel: this.validationEngine.recordErrorsLevel,
      })
      shape = shape.overridePath(propertyPathOrEngine)
    } else if (propertyPathOrEngine && 'clone' in propertyPathOrEngine) {
      engine = propertyPathOrEngine
    } else {
      engine = this.validationEngine.clone()
    }
    try {
      this.depth++
      const foundViolations = engine.validateNodeAgainstShape(focusNode, shape, this.$data)
      return !foundViolations
    } finally {
      this.depth--
    }
  }

  validateNodeAgainstShape(focusNode: Term, shapeNode: Term) {
    return this.nodeConformsToShape(focusNode, shapeNode, this.validationEngine)
  }
}

export default SHACLValidator
