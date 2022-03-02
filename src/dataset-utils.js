const TermSet = require('@rdfjs/term-set')
const NodeSet = require('./node-set')

/**
 * Extracts all the quads forming the structure under a blank node. Stops at
 * non-blank nodes.
 *
 * @param {DatasetCore} dataset
 * @param {Term} startNode
 * @returns Array of quads
 */
function extractStructure (dataset, startNode, visited = new TermSet()) {
  if (startNode.termType !== 'BlankNode' || visited.has(startNode)) {
    return []
  }

  visited.add(startNode)
  const quads = [...dataset.match(startNode, null, null)]

  const children = quads.map((quad) => {
    return extractStructure(dataset, quad.object, visited)
  })

  return quads.concat(...children)
}

/**
 * Get instances of a class.
 *
 * @param {Clownface} cls - pointer to a class
 * @param {Object} ns - namespace
 * @returns NodeSet
 */
function getInstancesOf (cls, ns) {
  const classes = getSubClassesOf(cls, ns)
  classes.add(cls.term)

  return [...classes].reduce((acc, classTerm) => {
    const classInstances = cls
      .node(classTerm)
      .in(ns.rdf.type)
      .terms

    acc.addAll(classInstances)

    return acc
  }, new NodeSet())
}

/**
 * Get subclasses of a class.
 *
 * @param {Clownface} cls - pointer to a class
 */
function getSubClassesOf (cls, ns) {
  const subclasses = cls.in(ns.rdfs.subClassOf)

  const transubclasses = subclasses.toArray().reduce((acc, subclass) => {
    const scs = getSubClassesOf(subclass, ns)

    acc.addAll(scs)

    return acc
  }, new NodeSet())

  return new NodeSet([...subclasses.terms, ...transubclasses])
}

/**
 * Check if a node is an instance of a class.
 *
 * @param {Clownface} instance - pointer to a term
 * @param {Clownface} cls - pointer to a class
 * @param {Object} ns - namespace
 * @returns boolean
 */
function isInstanceOf (instance, cls, ns) {
  const classes = getSubClassesOf(cls, ns)
  classes.add(cls.term)

  const types = instance.out(ns.rdf.type).terms

  return types.some((type) => classes.has(type))
}

/**
 * Extract all the terms of an RDF-list and return then as an array.
 *
 * @param {Clownface} listNode - pointer to start of the list
 * @returns Array
 */
function rdfListToArray (listNode) {
  return [...listNode.list()].map(({ term }) => term)
}

module.exports = {
  extractStructure,
  getInstancesOf,
  getSubClassesOf,
  isInstanceOf,
  rdfListToArray
}
