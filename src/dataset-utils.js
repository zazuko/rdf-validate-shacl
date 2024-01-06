import TermSet from '@rdfjs/term-set'
import NodeSet from './node-set.js'

/**
 * Extracts all the quads forming the structure under a blank node. Stops at
 * non-blank nodes.
 *
 * @param {import('@rdfjs/types').DatasetCore} dataset
 * @param {import('@rdfjs/types').Term} startNode
 * @returns {import('@rdfjs/types').Quad[]}
 */
export function extractStructure(dataset, startNode, visited = new TermSet()) {
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
 * @param {import('clownface').GraphPointer} cls - pointer to a class
 * @param {Object} ns - namespace
 * @returns NodeSet
 */
export function getInstancesOf(cls, ns) {
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
 * @param {import('clownface').GraphPointer} cls - pointer to a class
 */
export function getSubClassesOf(cls, ns) {
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
 * @param {import('clownface').GraphPointer} instance - pointer to a term
 * @param {import('clownface').GraphPointer} cls - pointer to a class
 * @param {Object} ns - namespace
 * @returns {boolean}
 */
export function isInstanceOf(instance, cls, ns) {
  const classes = getSubClassesOf(cls, ns)
  classes.add(cls.term)

  const types = instance.out(ns.rdf.type).terms

  return types.some((type) => classes.has(type))
}

/**
 * Extract all the terms of an RDF-list and return then as an array.
 *
 * @param {import('clownface').GraphPointer} listNode - pointer to start of the list
 * @returns {import('@rdfjs/types').Term[]}
 */
export function rdfListToArray(listNode) {
  return [...listNode.list()].map(({ term }) => term)
}
