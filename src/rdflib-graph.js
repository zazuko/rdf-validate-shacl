const DataFactory = require('./data-factory')
const RDFQuery = require('./rdfquery')
const { xsd } = require('./namespaces')

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

  find (s, p, o) {
    return new RDFLibGraphIterator(this.dataset, s, p, o)
  }

  query () {
    return RDFQuery(this)
  }

  loadGraph (graphURI, dataset) {
    this._postProcessGraph(graphURI, dataset)
  }

  clear () {
    this.dataset = this.factory.dataset()
  }

  _postProcessGraph (graphURI, newDataset) {
    const ss = newDataset.match(undefined, undefined, undefined)
    for (const quad of ss) {
      const object = quad.object
      ensureBlankId(quad.subject)
      ensureBlankId(quad.predicate)
      ensureBlankId(quad.object)
      if (xsd.boolean.equals(object.datatype)) {
        if (object.value === '0' || object.value === 'false') {
          this.dataset.add(this.factory.quad(quad.subject, quad.predicate, this.factory.term('false'), graphURI))
        } else if (object.value === '1' || object.value === 'true') {
          this.dataset.add(this.factory.quad(quad.subject, quad.predicate, this.factory.term('true'), graphURI))
        } else {
          this.dataset.add(this.factory.quad(quad.subject, quad.predicate, object, graphURI))
        }
      } else if (object.termType === 'collection') {
        const items = object.elements
        this.dataset.add(this.factory.quad(quad.subject, quad.predicate, this._createRDFListNode(items, 0)))
      } else {
        this.dataset.add(this.factory.quad(quad.subject, quad.predicate, quad.object, graphURI))
      }
    }
  }

  _createRDFListNode (items, index) {
    if (index >= items.length) {
      return this.factory.term('rdf:nil')
    } else {
      const bnode = this.factory.blankNode()
      this.dataset.add(this.factory.quad(bnode, this.factory.term('rdf:first'), items[index]))
      this.dataset.add(this.factory.quad(bnode, this.factory.term('rdf:rest'), this._createRDFListNode(items, index + 1)))
      return bnode
    }
  }
}

class RDFLibGraphIterator {
  constructor (dataset, s, p, o) {
    this.index = 0
    // TODO: Could probably make a lazy iterator since Dataset is already an iterator
    this.ss = [...dataset.match(s, p, o)]
  }

  close () {
    // Do nothing
  }

  next () {
    if (this.index >= this.ss.length) {
      return null
    } else {
      return this.ss[this.index++]
    }
  }
}

function ensureBlankId (component) {
  if (component.termType === 'BlankNode') {
    if (typeof (component.value) !== 'string') {
      component.value = '_:' + component.id
    }
    return component
  }

  return component
}

module.exports.RDFLibGraph = RDFLibGraph
module.exports.RDFLibGraphIterator = RDFLibGraphIterator
