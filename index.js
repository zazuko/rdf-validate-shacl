/**
 * Created by antoniogarrote on 08/05/2017.
 */

const debug = require('debug')('index')

const RDFQuery = require('./src/rdfquery')
const ShapesGraph = require('./src/shapes-graph')
const ValidationEngine = require('./src/validation-engine')
const rdflibgraph = require('./src/rdflib-graph')
const RDFLibGraph = rdflibgraph.RDFLibGraph
const ValidationEngineConfiguration = require('./src/validation-engine-configuration')

/********************************/
/* Vocabularies                 */
/********************************/
const shapesGraphURI = 'urn:x-shacl:shapesGraph'
const dataGraphURI = 'urn:x-shacl:dataGraph'
/********************************/
/********************************/

const rdf = require('rdf-ext')

/**
 * Validates RDF data based on a set of RDF shapes.
 */
class SHACLValidator {
  constructor () {
    this.$data = new RDFLibGraph()
    this.$shapes = new RDFLibGraph()
    this.depth = 0
    this.results = null
    this.validationEngine = null
    this.sequence = null
    this.shapesGraph = new ShapesGraph(this)
    this.configuration = new ValidationEngineConfiguration()
  }

  /**
   * Validates the provided data graph against the provided shapes graph
   *
   * @param {DatasetCore} dataGraph - Dataset containing the data to validate
   * @param {DatasetCore} shapesGraph - Dataset containing the SHACL shapes for validation
   * @return {ValidationReport} - Result of the validation
   */
  async validate (dataDataset, shapesDataset) {
    await this.updateDataGraph(dataDataset)
    return this.updateShapesGraph(shapesDataset)
  }

  /**
   * Retrieve validator configuration
   */
  getConfiguration () {
    return this.configuration
  }

  // Exposed to be available from validation functions as `SHACL.compareNodes`
  compareNodes (node1, node2) {
    // TODO: Does not handle the case where nodes cannot be compared
    if (node1 && node1.termType === 'Literal' && node2 && node2.termType === 'Literal') {
      if ((node1.datatype != null) !== (node2.datatype != null)) {
        return null
      } else if (node1.datatype && node2.datatype && node1.datatype.value !== node2.datatype.value) {
        return null
      }
    }
    return RDFQuery.compareTerms(node1, node2)
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

  /**
   * Reloads the shapes graph.
   * It will load SHACL shapes constraints.
   */
  loadDataGraph (graph) {
    this.$data.clear()
    this.$data.loadGraph(dataGraphURI, graph)
  }

  /**
   * Validates the data graph against the shapes graph using the validation engine
   */
  updateValidationEngine () {
    this.validationEngine = new ValidationEngine(this)
    this.validationEngine.setConfiguration(this.configuration)
    this.validationEngine.validateAll(this.$data)
  }

  /**
   * Checks for a validation error or results in the validation
   * engine to build the RDF graph with the validation report.
   * It returns a ValidationReport object wrapping the RDF graph
   *
   * @return {ValidationReport} - Result of the validation
   */
  async showValidationResults () {
    return this.validationEngine.getReport()
  }

  /**
   * Exception that occurred during the validation process, if any. `null` otherwise.
   */
  get validationError () {
    return this.validationEngine.validationError
  }

  /**
   * Reloads the shapes graph.
   * It will load SHACL shapes constraints.
   *
   * @param {DatasetCore} dataset - Dataset containing the shapes for validation
   */
  async loadShapesGraph (dataset) {
    this.$shapes.clear()

    this.$shapes.loadGraph(shapesGraphURI, dataset)

    this.$shapes.loadGraph('http://shacl.org', loadVocabulary('shacl'))
  }

  /**
   * Updates the data graph and validate it against the current data shapes
   *
   * @param {DatasetCore} dataset - Dataset containing the data to validate
   */
  async updateDataGraph (dataset) {
    const startTime = new Date().getTime()
    await this.loadDataGraph(dataset)

    const midTime = new Date().getTime()
    this.updateValidationEngine()

    const endTime = new Date().getTime()
    debug('Parsing took ' + (midTime - startTime) + ' ms. Validating the data took ' + (endTime - midTime) + ' ms.')

    return this.showValidationResults()
  }

  /**
   *  Updates the shapes graph from a memory model, and validates it against the current data graph
   *
   * @param {DatasetCore} dataset - Dataset containing the shapes for validation
   */
  async updateShapesGraph (dataset) {
    const startTime = new Date().getTime()
    await this.loadShapesGraph(dataset)

    const midTime = new Date().getTime()
    this.shapesGraph = new ShapesGraph(this)
    const midTime2 = new Date().getTime()

    this.updateValidationEngine()

    const endTime = new Date().getTime()
    debug('Parsing took ' + (midTime - startTime) + ' ms. Preparing the shapes took ' + (midTime2 - midTime) +
          ' ms. Validation the data took ' + (endTime - midTime2) + ' ms.')

    return this.showValidationResults()
  }
}

// Expose the RDF interface
// TODO: Check $rdf was exposed on the validator. Do we need that?
// SHACLValidator.$rdf = $rdf;

function loadVocabulary (vocab) {
  const vocabFactory = require(`./src/vocabularies/${vocab}`)
  const quads = vocabFactory(rdf)
  return rdf.dataset(quads)
}

module.exports = SHACLValidator
