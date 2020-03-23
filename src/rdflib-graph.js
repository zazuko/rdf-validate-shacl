const clownface = require('clownface')
const isMatch = require('@rdfjs/dataset/isMatch')
const DataFactory = require('./data-factory')
const { getPathObjects } = require('./property-path')

/**
 * Creates a new RDFLibGraph wrapping a provided `DatasetCore` or creating
 * a new one if no dataset is provided
 *
 * @param {Object} options
 * @param {DataSetCore} options.dataset - Initial dataset
 * @param {Object} options.factory - RDFJS data factory
 * @constructor
 */
class RDFLibGraph {
  constructor (options) {
    options = options || {}
    this.factory = new DataFactory(options.factory || require('@rdfjs/dataset'))
    this.dataset = options.dataset || this.factory.dataset()
  }

  match (s, p, o) {
    return this.dataset.match(s, p, o)
  }

  hasMatch (s, p, o) {
    for (const quad of this.dataset) {
      if (isMatch(quad, s, p, o)) {
        return true
      }
    }

    return false
  }

  getPathObjects (subject, path) {
    return [...getPathObjects(this, subject, path)]
  }

  get cf () {
    return clownface({ dataset: this.dataset })
  }

  loadGraph (graphURI, dataset) {
    const graph = this.factory.namedNode(graphURI)

    for (const quad of dataset) {
      const quadWithGraph = this.factory.quad(quad.subject, quad.predicate, quad.object, graph)
      this.dataset.add(quadWithGraph)
    }
  }

  clear () {
    this.dataset = this.factory.dataset()
  }
}

module.exports.RDFLibGraph = RDFLibGraph
