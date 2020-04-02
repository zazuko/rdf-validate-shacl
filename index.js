const DataFactory = require('./src/data-factory')
const ShapesGraph = require('./src/shapes-graph')
const ValidationEngine = require('./src/validation-engine')
const RDFLibGraph = require('./src/rdflib-graph')
const shaclVocabularyFactory = require('./src/vocabularies/shacl')

/**
 * Validates RDF data based on a set of RDF shapes.
 *
 * @param {DatasetCore} shapes - Dataset containing the SHACL shapes for validation
 * @param {object} options - Validator options
 * @param {DataFactory} options.factory - Optional RDFJS data factory
 * @param {Number} options.maxErrors - Max number of errors before the engine
 *   stops. Defaults to finding all the errors.
 */
class SHACLValidator {
  constructor (shapes, options) {
    options = options || {}

    this.factory = new DataFactory(options.factory || require('@rdfjs/dataset'))
    this.loadShapes(shapes)
    this.validationEngine = new ValidationEngine(this, options)

    this.depth = 0
  }

  /**
   * Validates the provided data graph against the provided shapes graph
   *
   * @param {DatasetCore} data - Dataset containing the data to validate
   * @return {ValidationReport} - Result of the validation
   */
  validate (data) {
    this.$data = new RDFLibGraph(data, this.factory)
    this.validationEngine.validateAll(this.$data)
    return this.validationEngine.getReport()
  }

  /**
   * Load SHACL shapes constraints from dataset.
   *
   * @param {DatasetCore} shapes - Dataset containing the shapes for validation
   */
  loadShapes (shapes) {
    const shaclQuads = shaclVocabularyFactory(this.factory)
    const dataset = this.factory.dataset(shaclQuads)
    for (const quad of shapes) {
      dataset.add(quad)
    }

    this.$shapes = new RDFLibGraph(dataset, this.factory)

    this.shapesGraph = new ShapesGraph(this)
  }

  // Exposed to be available from validation functions as `SHACL.nodeConformsToShape`
  nodeConformsToShape (focusNode, shapeNode) {
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

module.exports = SHACLValidator
