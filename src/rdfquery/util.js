const NodeSet = require('../node-set')
const { rdf, rdfs } = require('../namespaces')
const clownface = require('clownface')

class RDFQueryUtil {
  constructor ($source) {
    this.source = $source
    this.cf = clownface({ dataset: $source.dataset })
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

module.exports = RDFQueryUtil