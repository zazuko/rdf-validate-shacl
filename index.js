/**
 * Created by antoniogarrote on 08/05/2017.
 */

var debug = require('debug')('index')
var util = require('util')

var RDFQuery = require('./src/rdfquery')
var ShapesGraph = require('./src/shapes-graph')
var ValidationEngine = require('./src/validation-engine')
var rdflibgraph = require('./src/rdflib-graph')
var RDFLibGraph = rdflibgraph.RDFLibGraph
var fs = require('fs')
var ValidationEngineConfiguration = require('./src/validation-engine-configuration')

/********************************/
/* Vocabularies                 */
/********************************/
var shapesGraphURI = 'urn:x-shacl:shapesGraph'
var dataGraphURI = 'urn:x-shacl:dataGraph'
/********************************/
/********************************/

var rdf = require('rdf-ext')

const readFile = util.promisify(fs.readFile)

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
    this.functionsRegistry = require('./src/libraries')
  }

  /**
  * Validates the provided data graph against the provided shapes graph
  */
  async validate (dataGraph, shapesGraph) {
    await this.updateDataGraph(dataGraph)
    return this.updateShapesGraph(shapesGraph)
  }

  /**
   * Saves a cached version of a remote JS file used during validation
   *
   * @param url URL of the library to cache
   * @param localFile path to a local version of the file identified by url
   */
  async registerJSLibrary (url, localFile) {
    const buffer = await readFile(localFile)
    this.functionsRegistry[url] = buffer.toString()
  }

  /**
   * Saves a some JS library code using the provided URL that can be used during validation
   *
   * @param url URL of the library to register
   * @param libraryCode JS code for the library being registered
    */
  registerJSCode (url, jsCode) {
    this.functionsRegistry[url] = jsCode
  }

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
    var shape = this.shapesGraph.getShape(shapeNode)
    try {
      this.depth++
      var foundViolations = this.validationEngine.validateNodeAgainstShape(focusNode, shape, this.$data)
      return !foundViolations
    } finally {
      this.depth--
    }
  }

  /**
   * Reloads the shapes graph.
   * It will load SHACL and DASH shapes constraints.
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
   */
  async showValidationResults () {
    return this.validationEngine.getReport()
  }

  get validationError () {
    return this.validationEngine.validationError
  }

  /**
   * Reloads the shapes graph.
   * It will load SHACL and DASH shapes constraints.
   */
  async loadShapesGraph (graph) {
    this.$shapes.clear()

    this.$shapes.loadGraph(shapesGraphURI, graph)

    this.$shapes.loadGraph('http://shacl.org', loadVocabulary('shacl'))
    this.$shapes.loadGraph('http://datashapes.org/dash', loadVocabulary('dash'))
  }

  /**
   * Updates the data graph and validate it against the current data shapes
   */
  async updateDataGraph (graph) {
    var startTime = new Date().getTime()
    await this.loadDataGraph(graph)

    var midTime = new Date().getTime()
    this.updateValidationEngine()

    var endTime = new Date().getTime()
    debug('Parsing took ' + (midTime - startTime) + ' ms. Validating the data took ' + (endTime - midTime) + ' ms.')

    return this.showValidationResults()
  }

  /**
   *  Updates the shapes graph from a memory model, and validates it against the current data graph
   */
  async updateShapesGraph (graph) {
    var startTime = new Date().getTime()
    await this.loadShapesGraph(graph)

    var midTime = new Date().getTime()
    this.shapesGraph = new ShapesGraph(this)
    var midTime2 = new Date().getTime()

    await this.shapesGraph.loadJSLibraries()
    this.updateValidationEngine()

    var endTime = new Date().getTime()
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
