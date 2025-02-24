import TermSet from '@rdfjs/term-set'
import NodeSet from './node-set.js'

/**
 * Extracts all the quads forming the structure under a blank node. Stops at
 * non-blank nodes.
 *
 * @param {import('@rdfjs/types').DatasetCore} dataset
 * @param {import('@rdfjs/types').Term} startNode
 * @param {Set<import('@rdfjs/types').Term>} visited
 * @returns {Generator<import('@rdfjs/types').Quad>}
 */
export function * extractStructure(dataset, startNode, visited = new TermSet()) {
  if (startNode.termType !== 'BlankNode' || visited.has(startNode)) {
    return
  }

  visited.add(startNode)
  for (const quad of dataset.match(startNode, null, null)) {
    yield quad
    yield * extractStructure(dataset, quad.object, visited)
  }
}

/**
 * Extracts all the quads forming the structure under a blank shape node. Stops at
 * non-blank nodes. Replaces sh:in with a comment if the list is too long.
 *
 * @param {import('./shapes-graph.js').Shape} shape
 * @param {import('@rdfjs/types').DatasetCore} dataset
 * @param {import('@rdfjs/types').Term} startNode
 * @param {Set<import('@rdfjs/types').Term>} visited
 * @return {Generator<import('@rdfjs/types').Quad>}
 */
export function * extractSourceShapeStructure(shape, dataset, startNode, visited = new TermSet()) {
  if (startNode.termType !== 'BlankNode' || visited.has(startNode)) {
    return
  }

  const { factory } = shape.context
  const { sh, rdfs } = shape.context.ns

  const inListSize = (/** @type import('@rdfjs/types').Term */ term) => {
    const inConstraint = shape.constraints.find(x => term.equals(x.paramValue))
    return inConstraint?.nodeSet.size || -1
  }

  visited.add(startNode)
  for (const quad of dataset.match(startNode, null, null)) {
    if (quad.predicate.equals(sh.in) && inListSize(quad.object) > 3) {
      const msg = `sh:in has ${inListSize(quad.object)} elements and has been removed from the report for brevity. Please refer the original shape`
      yield factory.quad(quad.subject, rdfs.comment, factory.literal(msg))
    } else {
      yield quad
      yield * extractSourceShapeStructure(shape, dataset, quad.object, visited)
    }
  }
}

/**
 * Get instances of a class.
 *
 * @param {import('clownface').GraphPointer} cls - pointer to a class
 * @param {import('./namespaces.js').Namespaces} ns
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
 * @param {import('./namespaces.js').Namespaces} ns
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
 * @param {import('./namespaces.js').Namespaces} ns
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
 * @param {import('clownface').MultiPointer} listNode - pointer to start of the list
 * @returns {import('@rdfjs/types').Term[]}
 */
export function rdfListToArray(listNode) {
  return [...listNode.list?.() || []].map(({ term }) => term)
}
