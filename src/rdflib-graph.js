const clownface = require('clownface')
const isMatch = require('@rdfjs/dataset/isMatch')
const DataFactory = require('./data-factory')
const { getPathObjects } = require('./property-path')
const NodeSet = require('./node-set')
const { rdf, rdfs } = require('./namespaces')

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

  getInstancesOf ($class) {
    const classes = this.getSubClassesOf($class)
    classes.add($class)

    return [...classes].reduce((acc, cls) => {
      const classInstances = this.cf
        .node(cls)
        .in(rdf.type)
        .terms

      acc.addAll(classInstances)

      return acc
    }, new NodeSet())
  }

  getSubClassesOf ($class) {
    const subclasses = this.cf
      .node($class)
      .in(rdfs.subClassOf)
      .terms

    return new NodeSet(subclasses)
  }

  isInstanceOf ($instance, $class) {
    const classes = this.getSubClassesOf($class)
    classes.add($class)

    const types = this.cf
      .node($instance)
      .out(rdf.type)
      .terms

    return types.some((type) => classes.has(type))
  }

  rdfListToArray ($rdfList) {
    if ($rdfList.elements) {
      return $rdfList.elements
    } else {
      const items = []
      while (!$rdfList.equals(rdf.nil)) {
        const first = this.cf.node($rdfList).out(rdf.first).term
        items.push(first)
        const rest = this.cf.node($rdfList).out(rdf.rest).term
        $rdfList = rest
      }
      return items
    }
  }
}

module.exports.RDFLibGraph = RDFLibGraph
