import type { AnyPointer, MultiPointer } from 'clownface'
import type { NamedNode, Term } from '@rdfjs/types'
import NodeSet from './node-set.js'
import type { Namespaces } from './namespaces.js'

// eslint-disable-next-line no-use-before-define
export type ShaclPropertyPath = Term | SequencePath | AlternativePath | InversePath | ZeroOrOnePath | ZeroOrMorePath | OneOrMorePath
type SequencePath = ShaclPropertyPath[]
type AlternativePath = { or: ShaclPropertyPath[] }
type InversePath = { inverse: ShaclPropertyPath }
type ZeroOrOnePath = { zeroOrOne: ShaclPropertyPath }
type ZeroOrMorePath = { zeroOrMore: ShaclPropertyPath }
type OneOrMorePath = { oneOrMore: ShaclPropertyPath }

/**
 * Extracts all the nodes of a property path from a graph and returns a
 * property path object.
 *
 * @param pathNode - Pointer to the start node of the path
 * @param ns - Namespaces
 * @param allowNamedNodeInList - Allow named node in lists. By default, only blank nodes are allowed
 * @return Property path object
 */
export function extractPropertyPath(pathNode: MultiPointer, ns: Namespaces, allowNamedNodeInList: boolean): ShaclPropertyPath {
  if (pathNode.term.termType === 'NamedNode' && !allowNamedNodeInList) {
    return pathNode.term
  }

  if (pathNode.term.termType === 'BlankNode' || pathNode.term.termType === 'NamedNode') {
    const first = pathNode.out(ns.rdf.first).term
    if (first) {
      const paths = [...pathNode.list()]
      return paths.map(path => extractPropertyPath(path, ns, allowNamedNodeInList))
    }

    const alternativePath = pathNode.out(ns.sh.alternativePath)
    if (alternativePath.term) {
      const paths = [...alternativePath.list()]
      return { or: paths.map(path => extractPropertyPath(path, ns, allowNamedNodeInList)) }
    }

    const zeroOrMorePath = pathNode.out(ns.sh.zeroOrMorePath)
    if (zeroOrMorePath.term) {
      return { zeroOrMore: extractPropertyPath(zeroOrMorePath, ns, allowNamedNodeInList) }
    }

    const oneOrMorePath = pathNode.out(ns.sh.oneOrMorePath)
    if (oneOrMorePath.term) {
      return { oneOrMore: extractPropertyPath(oneOrMorePath, ns, allowNamedNodeInList) }
    }

    const zeroOrOnePath = pathNode.out(ns.sh.zeroOrOnePath)
    if (zeroOrOnePath.term) {
      return { zeroOrOne: extractPropertyPath(zeroOrOnePath, ns, allowNamedNodeInList) }
    }

    const inversePath = pathNode.out(ns.sh.inversePath)
    if (inversePath.term) {
      return { inverse: extractPropertyPath(inversePath, ns, allowNamedNodeInList) }
    }

    return pathNode.term
  }
  throw new Error(`Unsupported SHACL path: ${pathNode.term.value}`)
}

/**
 * Follows a property path in a graph, starting from a given node, and returns
 * all the nodes it points to.
 *
 * @param graph
 * @param subject - Start node
 * @param path - Property path object
 * @return - Nodes that are reachable through the property path
 */
export function getPathObjects(graph: AnyPointer, subject: Term, path: ShaclPropertyPath): Term[] {
  return [...getPathObjectsSet(graph, subject, path)]
}

function getPathObjectsSet(graph: AnyPointer, subject: Term, path: ShaclPropertyPath): NodeSet {
  if ('termType' in path && path.termType === 'NamedNode') {
    return getNamedNodePathObjects(graph, subject, path)
  } else if (Array.isArray(path)) {
    return getSequencePathObjects(graph, subject, path)
  } else if ('or' in path) {
    return getOrPathObjects(graph, subject, path)
  } else if ('inverse' in path) {
    return getInversePathObjects(graph, subject, path)
  } else if ('zeroOrOne' in path) {
    return getZeroOrOnePathObjects(graph, subject, path)
  } else if ('zeroOrMore' in path) {
    return getZeroOrMorePathObjects(graph, subject, path)
  } else if ('oneOrMore' in path) {
    return getOneOrMorePathObjects(graph, subject, path)
  } else {
    throw new Error(`Unsupported path object: ${path}`)
  }
}

function getNamedNodePathObjects(graph: AnyPointer, subject: Term, path: NamedNode) {
  return new NodeSet(graph.node(subject).out(path).terms)
}

function getSequencePathObjects(graph: AnyPointer, subject: Term, path: SequencePath) {
  // TODO: This one is really unreadable
  let subjects = new NodeSet([subject])
  for (const pathItem of path) {
    subjects = new NodeSet(flatMap(subjects, subjectItem =>
      getPathObjects(graph, subjectItem, pathItem)))
  }
  return subjects
}

function getOrPathObjects(graph: AnyPointer, subject: Term, path: AlternativePath) {
  return new NodeSet(flatMap(path.or, pathItem => getPathObjects(graph, subject, pathItem)))
}

function getInversePathObjects(graph: AnyPointer, subject: Term, path: InversePath) {
  if (!('termType' in path.inverse) || path.inverse.termType !== 'NamedNode') {
    throw new Error('Unsupported: Inverse paths only work for named nodes')
  }

  return new NodeSet(graph.node(subject).in(path.inverse).terms)
}

function getZeroOrOnePathObjects(graph: AnyPointer, subject: Term, path: ZeroOrOnePath) {
  const pathObjects = getPathObjectsSet(graph, subject, path.zeroOrOne)
  pathObjects.add(subject)
  return pathObjects
}

function getZeroOrMorePathObjects(graph: AnyPointer, subject: Term, path: ZeroOrMorePath) {
  const pathObjects = walkPath(graph, subject, path.zeroOrMore)
  pathObjects.add(subject)
  return pathObjects
}

function getOneOrMorePathObjects(graph: AnyPointer, subject: Term, path: OneOrMorePath) {
  return walkPath(graph, subject, path.oneOrMore)
}

function walkPath(graph: AnyPointer, subject: Term, path: ShaclPropertyPath, visited: NodeSet = new NodeSet()) {
  visited.add(subject)

  const pathValues = getPathObjectsSet(graph, subject, path)

  const deeperValues = flatMap(pathValues, pathValue => {
    if (!visited.has(pathValue)) {
      return [...walkPath(graph, pathValue, path, visited)]
    } else {
      return []
    }
  })

  pathValues.addAll(deeperValues)
  return pathValues
}

function flatMap<T, X>(arr: Iterable<T>, func: (x: T) => X[]): X[] {
  return [...arr].reduce((acc, x) => acc.concat(func(x)), [])
}
