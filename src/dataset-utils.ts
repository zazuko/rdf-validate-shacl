import TermSet from '@rdfjs/term-set'
import type { DatasetCore, Quad, Term } from '@rdfjs/types'
import type { GraphPointer, MultiPointer } from 'clownface'
import NodeSet from './node-set.js'
import type { Shape } from './shapes-graph.js'
import type { Namespaces } from './namespaces.js'

/**
 * Extracts all the quads forming the structure under a blank node. Stops at
 * non-blank nodes.
 */
export function * extractStructure(dataset: DatasetCore, startNode: Term, visited = new TermSet()): Generator<Quad> {
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
 */
export function * extractSourceShapeStructure(shape: Shape, dataset: DatasetCore, startNode: Term, visited = new TermSet()): Generator<Quad> {
  if (startNode.termType !== 'BlankNode' || visited.has(startNode)) {
    return
  }

  const { factory } = shape.context
  const { sh, rdfs } = shape.context.ns

  const inListSize = (term: Term) => {
    const inConstraint = shape.constraints.find(x => term.equals(x.getParameterValue(sh.in)))
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
 */
export function getInstancesOf(cls: GraphPointer, ns: Namespaces) {
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
 */
export function getSubClassesOf(cls: GraphPointer, ns: Namespaces) {
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
 */
export function isInstanceOf(instance: GraphPointer, cls: GraphPointer, ns: Namespaces) {
  const classes = getSubClassesOf(cls, ns)
  classes.add(cls.term)

  const types = instance.out(ns.rdf.type).terms

  return types.some((type) => classes.has(type))
}

/**
 * Extract all the terms of an RDF-list and return then as an array.
 */
export function rdfListToArray(listNode: MultiPointer) {
  return [...listNode.list?.() || []].map(({ term }) => term)
}
