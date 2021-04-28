const NodeSet = require('./node-set')
const { rdf, rdfs } = require('./namespaces')

/**
 * Extracts all the quads forming the structure under a blank node. Stops at
 * non-blank nodes.
 *
 * @param {DatasetCore} dataset
 * @param {Term} startNode
 */
function extractStructure (dataset, startNode) {
  if (startNode.termType !== 'BlankNode') {
    return []
  }

  const quads = [...dataset.match(startNode, null, null)]

  const children = quads.map((quad) => {
    return extractStructure(dataset, quad.object)
  })

  return quads.concat(...children)
}

/**
 * Get instances of a class.
 *
 * @param {Clownface} cls - pointer to a class
 */
function getInstancesOf (cls) {
  const classes = getSubClassesOf(cls)
  classes.add(cls.term)

  return [...classes].reduce((acc, classTerm) => {
    const classInstances = cls
      .node(classTerm)
      .in(rdf.type)
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
function getSubClassesOf (cls) {
  const subclasses = cls.in(rdfs.subClassOf)

  const transubclasses = subclasses.toArray().reduce((acc, subclass) => {
    const scs = getSubClassesOf(subclass)

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
 * @returns boolean
 */
function isInstanceOf (instance, cls) {
  const classes = getSubClassesOf(cls)
  classes.add(cls.term)

  const types = instance.out(rdf.type).terms

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
