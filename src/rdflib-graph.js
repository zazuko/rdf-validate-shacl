const clownface = require('clownface')
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

  get cf () {
    return clownface({ dataset: this.dataset, factory: this.factory })
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

  rdfListToArray (listNode) {
    const iterator = this.cf.node(listNode).list()
    return [...iterator].map(({ term }) => term)
  }
}

module.exports = RDFLibGraph
