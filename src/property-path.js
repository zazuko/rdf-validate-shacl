import NodeSet from './node-set.js'

/**
 * @typedef {{ zeroOrMore: Path }} ZeroOrMorePath
 * @typedef {{ zeroOrOne: Path }} ZeroOrOnePath
 * @typedef {{ oneOrMore: Path }} OneOrMorePath
 * @typedef {{ or: Path[] }} AlternativePath
 * @typedef {Path[]} SequencePath
 * @typedef {{ inverse: Path }} InversePath
 * @typedef {import('@rdfjs/types').Term} PropertyPath
 * @typedef {PropertyPath | SequencePath | AlternativePath | ZeroOrMorePath | OneOrMorePath | ZeroOrOnePath | InversePath} Path
 */

/**
 * Extracts all the nodes of a property path from a graph and returns a
 * property path object.
 *
 * @param {import('clownface').MultiPointer} pathNode - Pointer to the start node of the path
 * @param {object} ns - Namespaces
 * @param {boolean} allowNamedNodeInList - Allow named node in lists. By default, only blank nodes are allowed
 * @return {Path}
 */
export function extractPropertyPath(pathNode, ns, allowNamedNodeInList) {
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
 * @param {import('clownface').AnyPointer} graph
 * @param {import('@rdfjs/types').Term} subject - Start node
 * @param {Path} path - Property path object
 * @return {import('@rdfjs/types').Term[]} - Nodes that are reachable through the property path
 */
export function getPathObjects(graph, subject, path) {
  return [...getPathObjectsSet(graph, subject, path)]
}

/**
 * @param {import('clownface').AnyPointer} graph
 * @param {import('@rdfjs/types').Term} subject
 * @param {Path} path
 * @return {NodeSet}
 */
function getPathObjectsSet(graph, subject, path) {
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

/**
 * @param {import('clownface').AnyPointer} graph
 * @param {import('@rdfjs/types').Term} subject
 * @param {import('@rdfjs/types').Term} path
 * @return {NodeSet}
 */
function getNamedNodePathObjects(graph, subject, path) {
  return new NodeSet(graph.node(subject).out(path).terms)
}

/**
 * @param {import('clownface').AnyPointer} graph
 * @param {import('@rdfjs/types').Term} subject
 * @param {Path[]} path
 * @return {NodeSet}
 */
function getSequencePathObjects(graph, subject, path) {
  // TODO: This one is really unreadable
  let subjects = new NodeSet([subject])
  for (const pathItem of path) {
    subjects = new NodeSet(flatMap(subjects, subjectItem =>
      getPathObjects(graph, subjectItem, pathItem)))
  }
  return subjects
}

/**
 * @param {import('clownface').AnyPointer} graph
 * @param {import('@rdfjs/types').Term} subject
 * @param {AlternativePath} path
 * @return {NodeSet}
 */
function getOrPathObjects(graph, subject, path) {
  return new NodeSet(flatMap(path.or, pathItem => getPathObjects(graph, subject, pathItem)))
}

/**
 * @param {import('clownface').AnyPointer} graph
 * @param {import('@rdfjs/types').Term} subject
 * @param {InversePath} path
 * @return {NodeSet}
 */
function getInversePathObjects(graph, subject, path) {
  if (!('termType' in path.inverse) || path.inverse.termType !== 'NamedNode') {
    throw new Error('Unsupported: Inverse paths only work for named nodes')
  }

  return new NodeSet(graph.node(subject).in(path.inverse).terms)
}

/**
 * @param {import('clownface').AnyPointer} graph
 * @param {import('@rdfjs/types').Term} subject
 * @param {ZeroOrOnePath} path
 * @return {NodeSet}
 */
function getZeroOrOnePathObjects(graph, subject, path) {
  const pathObjects = getPathObjectsSet(graph, subject, path.zeroOrOne)
  pathObjects.add(subject)
  return pathObjects
}

/**
 * @param {import('clownface').AnyPointer} graph
 * @param {import('@rdfjs/types').Term} subject
 * @param {ZeroOrMorePath} path
 * @return {NodeSet}
 */
function getZeroOrMorePathObjects(graph, subject, path) {
  const pathObjects = walkPath(graph, subject, path.zeroOrMore)
  pathObjects.add(subject)
  return pathObjects
}

/**
 * @param {import('clownface').AnyPointer} graph
 * @param {import('@rdfjs/types').Term} subject
 * @param {OneOrMorePath} path
 * @return {NodeSet}
 */
function getOneOrMorePathObjects(graph, subject, path) {
  return walkPath(graph, subject, path.oneOrMore)
}

/**
 * @param {import('clownface').AnyPointer} graph
 * @param {import('@rdfjs/types').Term} subject
 * @param {Path} path
 * @param {NodeSet} [visited]
 */
function walkPath(graph, subject, path, visited) {
  visited = visited || new NodeSet()

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

/**
 * @template T, R
 * @param {Iterable<T>} arr
 * @param {(item: T) => R} [func]
 * @return {R[]}
 */
function flatMap(arr, func) {
  return [...arr].reduce((acc, x) => acc.concat(func(x)), [])
}
