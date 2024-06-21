import TermSet from '@rdfjs/term-set'
import NodeSet from './node-set.js'

/**
 * Extracts all the quads forming the structure under a blank node. Stops at
 * non-blank nodes.
 *
 * @param {DatasetCore} dataset
 * @param {Term} startNode
 * @yields {Quad}
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
 * @param {Shape} shape
 * @param {DatasetCore} dataset
 * @param {Term} startNode
 * @yields {Quad}
 */
export function * extractSourceShapeStructure(shape, dataset, startNode, visited = new TermSet()) {
  if (startNode.termType !== 'BlankNode' || visited.has(startNode)) {
    return
  }

  const { factory } = shape.context
  const { sh, rdfs } = shape.context.ns

  const inListSize = term => {
    const inConstraint = shape.constraints.find(x => x.paramValue.equals(term))
    return inConstraint?.validationFunction.func.nodeSet.size
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
 * @param {Clownface} cls - pointer to a class
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
 * @param {Clownface} cls - pointer to a class
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
 * @param {Clownface} instance - pointer to a term
 * @param {Clownface} cls - pointer to a class
 * @param {Object} ns - namespace
 * @returns boolean
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
 * @param {Clownface} listNode - pointer to start of the list
 * @returns Array
 */
export function rdfListToArray(listNode) {
  return [...listNode.list()].map(({ term }) => term)
}
