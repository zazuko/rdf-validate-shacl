const clownface = require('clownface')
const dataset = require('@rdfjs/dataset')
const { prepareNamespaces } = require('./src/namespaces')
const ShapesGraph = require('./src/shapes-graph')
const ValidationEngine = require('./src/validation-engine')
const shaclVocabularyFactory = require('./src/vocabularies/shacl')
const rdf = require('rdf-ext')

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

    this.factory = options.factory || require('@rdfjs/dataset')
    this.ns = prepareNamespaces(this.factory)
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
    this.$data = clownface({ dataset: data, factory: this.factory })
    this.validationEngine.validateAll(this.$data)
    return this.validationEngine.getReport()
  }

  /**
   * Validates the provided focus node against the provided shape
   *
   * @param {DatasetCore} data - Dataset containing the data to validate
   * @param {Term} focusNode - Node to validate
   * @param {Term} shapeNode - Shape used to validate the node. It must be present in the shapes graph.
   * @returns {ValidationReport} - Result of the validation
   */
  validateNode (data, focusNode, shapeNode) {
    this.$data = clownface({ dataset: data, factory: this.factory })
    this.nodeConformsToShape(focusNode, shapeNode)
    return this.validationEngine.getReport()
  }

  /**
   * Load SHACL shapes constraints from dataset.
   *
   * @param {DatasetCore} shapes - Dataset containing the shapes for validation
   */
  loadShapes (shapes) {
    const shaclQuads = shaclVocabularyFactory(this.factory)
    const dataset = this.factory.dataset(shaclQuads.concat([...shapes]))
    this.$shapes = clownface({ dataset, factory: this.factory })

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

 /**
* This exports 2 functions:
*  - propertyPaths.extractPropertyPath
*  - propertyPaths.getPathObjects
*/
SHACLValidator.propertyPaths = require('./src/property-path');

/**
* Public convenience function to take an array of triples instead of a Clownface interface 
* 
* Use as follows:
*    validator.getPathObjectsFromQuads (quads, subject, validator.propertyPaths.extractPropertyPath)
* 
* @param {Quad[]} graph
* @param {Term} subject - Start node
* @param {object} path - Property path object
* @return {Term[]} - Nodes that are reachable through the property path
*/
SHACLValidator.getPathObjectsFromQuads = function (quads, subject, path) {
 const graph = clownface({ dataset: rdf.dataset(quads) })
 return SHACLValidator.propertyPaths.getPathObjects(graph, subject, path)
}

module.exports = SHACLValidator
