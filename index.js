import shaclVocabularyFactory from '@vocabulary/sh'
import factory from './src/defaultEnv.js'
import { prepareNamespaces } from './src/namespaces.js'
import ShapesGraph from './src/shapes-graph.js'
import ValidationEngine from './src/validation-engine.js'

/**
 * Validates RDF data based on a set of RDF shapes.
 */
class SHACLValidator {
  /**
   * @param {import('@rdfjs/types').DatasetCore} shapes - Dataset containing the SHACL shapes for validation
   * @param {object} [options] - Validator options
   * @param {import('./src/defaultEnv.js').Environment} [options.factory] - Optional RDFJS data factory
   * @param {number} [options.maxErrors] - Max number of errors before the engine stops. Defaults to finding all the errors.
   * @param {boolean} [options.allowNamedNodeInList]
   */
  constructor(shapes, options) {
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
   *
   * @param {import('@rdfjs/types').DatasetCore} dataset - Dataset containing the data to validate
   * @return {import('./src/validation-report.js').default} - Result of the validation
   */
  validate(dataset) {
    this.$data = this.factory.clownface({ dataset })
    this.validationEngine.validateAll(this.$data)
    return this.validationEngine.getReport()
  }

  /**
   * Validates the provided focus node against the provided shape
   *
   * @param {import('@rdfjs/types').DatasetCore} dataset - Dataset containing the data to validate
   * @param {import('@rdfjs/types').Term} focusNode - Node to validate
   * @param {import('@rdfjs/types').Term} shapeNode - Shape used to validate the node. It must be present in the shapes graph.
   * @returns {import('./src/validation-report.js').default} - Result of the validation
   */
  validateNode(dataset, focusNode, shapeNode) {
    this.$data = this.factory.clownface({ dataset })
    this.nodeConformsToShape(focusNode, shapeNode, this.validationEngine)
    return this.validationEngine.getReport()
  }

  /**
   * Exposed to be available from validation functions as `SHACL.nodeConformsToShape`
   * @param {import('@rdfjs/types').Term} focusNode
   * @param {import('@rdfjs/types').Term} shapeNode
   * @param {ValidationEngine|import('clownface-shacl-path').ShaclPropertyPath|null} [propertyPathOrEngine]
   * @return {boolean}
   */
  nodeConformsToShape(focusNode, shapeNode, propertyPathOrEngine) {
    let engine
    let shape = this.shapesGraph?.getShape(shapeNode)

    if (propertyPathOrEngine && 'accept' in propertyPathOrEngine) {
      engine = this.validationEngine.clone({
        recordErrorsLevel: this.validationEngine.recordErrorsLevel,
      })
      shape = shape.overridePath(propertyPathOrEngine)
    } else {
      engine = propertyPathOrEngine || this.validationEngine.clone()
    }
    try {
      this.depth++
      const foundViolations = engine.validateNodeAgainstShape(focusNode, shape, this.$data)
      return !foundViolations
    } finally {
      this.depth--
    }
  }

  /**
   * @param {import('@rdfjs/types').Term} focusNode
   * @param {import('@rdfjs/types').Term} shapeNode
   */
  validateNodeAgainstShape(focusNode, shapeNode) {
    return this.nodeConformsToShape(focusNode, shapeNode, this.validationEngine)
  }
}

export default SHACLValidator
