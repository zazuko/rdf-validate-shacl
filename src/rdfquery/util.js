const RDFQuery = require('../rdfquery')
const NodeSet = RDFQuery.NodeSet
const T = RDFQuery.T

class RDFQueryUtil {
  constructor ($source) {
    this.source = $source
  }

  getInstancesOf ($class) {
    var set = new NodeSet()
    var classes = this.getSubClassesOf($class)
    classes.add($class)
    var car = classes.toArray()
    for (var i = 0; i < car.length; i++) {
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
    var set = new NodeSet()
    this.walkSubjects(set, $class, T('rdfs:subClassOf'))
    return set
  }

  isInstanceOf ($instance, $class) {
    var classes = this.getSubClassesOf($class)
    var types = this.source.query().match($instance, 'rdf:type', '?type')
    for (var n = types.nextSolution(); n; n = types.nextSolution()) {
      if (n.type.equals($class) || classes.contains(n.type)) {
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
      var array = []
      while (!T('rdf:nil').equals($rdfList)) {
        array.push(this.getObject($rdfList, T('rdf:first')))
        $rdfList = this.getObject($rdfList, T('rdf:rest'))
      }
      return array
    }
  }

  walkObjects ($results, $subject, $predicate) {
    var it = this.source.find($subject, $predicate, null)
    for (var n = it.next(); n; n = it.next()) {
      if (!$results.contains(n.object)) {
        $results.add(n.object)
        this.walkObjects($results, n.object, $predicate)
      }
    }
  }

  walkSubjects ($results, $object, $predicate) {
    var it = this.source.find(null, $predicate, $object)
    for (var n = it.next(); n; n = it.next()) {
      if (!$results.contains(n.subject)) {
        $results.add(n.subject)
        this.walkSubjects($results, n.subject, $predicate)
      }
    }
  }
}

module.exports = RDFQueryUtil
