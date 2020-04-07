const clownface = require('clownface')
const isMatch = require('@rdfjs/dataset/isMatch')
const NodeSet = require('./node-set')
const { rdf, rdfs } = require('./namespaces')

class RDFLibGraph {
  constructor (dataset, factory) {
    this.dataset = dataset
    this.factory = factory
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

  get cf () {
    return clownface({ dataset: this.dataset })
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

module.exports = RDFLibGraph
