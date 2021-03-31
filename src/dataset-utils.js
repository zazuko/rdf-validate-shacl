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
 * @param {Clownface} pointer
 * @param {NamedNode} $class
 */
function getInstancesOf (pointer, $class) {
  const classes = getSubClassesOf(pointer, $class)
  classes.add($class)

  return [...classes].reduce((acc, cls) => {
    const classInstances = pointer
      .node(cls)
      .in(rdf.type)
      .terms

    acc.addAll(classInstances)

    return acc
  }, new NodeSet())
}

/**
 * Get subclasses of a class.
 *
 * @param {Clownface} pointer
 * @param {NamedNode} $class
 */
function getSubClassesOf (pointer, $class) {
  const subclasses = pointer
    .node($class)
    .in(rdfs.subClassOf)
    .terms

  const transubclasses = subclasses.reduce((acc, cls) => {
    const scs = getSubClassesOf(pointer, cls)

    acc.addAll(scs)

    return acc
  }, new NodeSet())

  return new NodeSet([...subclasses, ...transubclasses])
}

/**
 * Check if a node is an instance of a class.
 *
 * @param {Clownface} pointer
 * @param {Term} $instance
 * @param {NamedNode} $class
 * @returns boolean
 */
function isInstanceOf (pointer, $instance, $class) {
  const classes = getSubClassesOf(pointer, $class)
  classes.add($class)

  const types = pointer
    .node($instance)
    .out(rdf.type)
    .terms

  return types.some((type) => classes.has(type))
}

/**
 * Extract all the terms of an RDF-list and return then as an array.
 *
 * @param {Clownface} pointer
 * @param {Term} listNode - Start of the list
 * @returns Array
 */
function rdfListToArray (pointer, listNode) {
  const iterator = pointer.node(listNode).list()
  return [...iterator].map(({ term }) => term)
}

module.exports = {
  extractStructure,
  getInstancesOf,
  getSubClassesOf,
  isInstanceOf,
  rdfListToArray
}
