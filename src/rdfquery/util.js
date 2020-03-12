const RDFQuery = require('../rdfquery')
const NodeSet = require('../node-set')
const { rdf, rdfs } = require('../namespaces')

class RDFQueryUtil {
  constructor ($source) {
    this.source = $source
  }

  getInstancesOf ($class) {
    const set = new NodeSet()
    const classes = this.getSubClassesOf($class)
    classes.add($class)
    const car = classes.toArray()
    for (let i = 0; i < car.length; i++) {
      set.addAll(RDFQuery(this.source).match('?instance', 'rdf:type', car[i]).getNodeArray('?instance'))
    }
    return set
  }

  getObject ($subject, $predicate) {
    if (!$subject) {
      throw new Error('Missing subject')
    }
    if (!$predicate) {
      throw new Error('Missing predicate')
    }
    return RDFQuery(this.source).match($subject, $predicate, '?object').getNode('?object')
  }

  getSubClassesOf ($class) {
    const set = new NodeSet()
    this.walkSubjects(set, $class, rdfs.subClassOf)
    return set
  }

  isInstanceOf ($instance, $class) {
    const classes = this.getSubClassesOf($class)
    const types = this.source.query().match($instance, 'rdf:type', '?type')
    for (let n = types.nextSolution(); n; n = types.nextSolution()) {
      if (n.type.equals($class) || classes.has(n.type)) {
        types.close()
        return true
      }
    }
    return false
  }

  rdfListToArray ($rdfList) {
    if ($rdfList.elements) {
      return $rdfList.elements
    } else {
      const array = []
      while (!rdf.nil.equals($rdfList)) {
        array.push(this.getObject($rdfList, rdf.first))
        $rdfList = this.getObject($rdfList, rdf.rest)
      }
      return array
    }
  }

  walkObjects ($results, $subject, $predicate) {
    const it = this.source.find($subject, $predicate, null)
    for (let n = it.next(); n; n = it.next()) {
      if (!$results.has(n.object)) {
        $results.add(n.object)
        this.walkObjects($results, n.object, $predicate)
      }
    }
  }

  walkSubjects ($results, $object, $predicate) {
    const it = this.source.find(null, $predicate, $object)
    for (let n = it.next(); n; n = it.next()) {
      if (!$results.has(n.subject)) {
        $results.add(n.subject)
        this.walkSubjects($results, n.subject, $predicate)
      }
    }
  }
}

module.exports = RDFQueryUtil
