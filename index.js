import clownface from 'clownface'
import shaclVocabularyFactory from '@vocabulary/sh'
import factory from './src/defaultEnv.js'
import { prepareNamespaces } from './src/namespaces.js'
import ShapesGraph from './src/shapes-graph.js'
import ValidationEngine from './src/validation-engine.js'

/**
 * Validates RDF data based on a set of RDF shapes.
 *
 * @param {import('@rdfjs/types').DatasetCore} shapes - Dataset containing the SHACL shapes for validation
 * @param {object} options - Validator options
 * @param {import('./src/defaultEnv.js').Environment} options.factory - Optional RDFJS data factory
 * @param {number} options.maxErrors - Max number of errors before the engine
 *   stops. Defaults to finding all the errors.
 */
class SHACLValidator {
  constructor(shapes, options) {
    options = options || {}

    this.factory = options.factory || factory
    this.ns = prepareNamespaces(this.factory)
    this.allowNamedNodeInList = options.allowNamedNodeInList === undefined ? false : options.allowNamedNodeInList
    this.loadShapes(shapes)
    this.validationEngine = new ValidationEngine(this, options)

    this.depth = 0
  }

  /**
   * Validates the provided data graph against the provided shapes graph
   *
   * @param {import('@rdfjs/types').DatasetCore} data - Dataset containing the data to validate
   * @return {import('./src/validation-report.js').default} - Result of the validation
   */
  validate(data) {
    this.$data = clownface({ dataset: data, factory: this.factory })
    this.validationEngine.validateAll(this.$data)
    return this.validationEngine.getReport()
  }

  /**
   * Validates the provided focus node against the provided shape
   *
   * @param {import('@rdfjs/types').DatasetCore} data - Dataset containing the data to validate
   * @param {import('@rdfjs/types').Term} focusNode - Node to validate
   * @param {import('@rdfjs/types').Term} shapeNode - Shape used to validate the node. It must be present in the shapes graph.
   * @returns {import('./src/validation-report.js').default} - Result of the validation
   */
  validateNode(data, focusNode, shapeNode) {
    this.$data = clownface({ dataset: data, factory: this.factory })
    this.nodeConformsToShape(focusNode, shapeNode)
    return this.validationEngine.getReport()
  }

  /**
   * Load SHACL shapes constraints from dataset.
   *
   * @param {import('@rdfjs/types').DatasetCore} shapes - Dataset containing the shapes for validation
   */
  loadShapes(shapes) {
    const shaclQuads = shaclVocabularyFactory({ factory: this.factory })
    const dataset = this.factory.dataset(shaclQuads.concat([...shapes]))
    this.$shapes = clownface({ dataset, factory: this.factory })

    this.shapesGraph = new ShapesGraph(this)
  }

  // Exposed to be available from validation functions as `SHACL.nodeConformsToShape`
  nodeConformsToShape(focusNode, shapeNode) {
    const shape = this.shapesGraph.getShape(shapeNode)
    try {
      this.depth++
      const foundViolations = this.validationEngine.validateNodeAgainstShape(focusNode, shape, this.$data)
      return !foundViolations
    } finally {
      this.depth--
    }
  }
}

export default SHACLValidator
