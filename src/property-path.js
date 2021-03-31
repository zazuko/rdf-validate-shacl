const NodeSet = require('./node-set')
const { rdf, sh } = require('./namespaces')
const { rdfListToArray } = require('./dataset-utils')

/**
 * Extracts all the nodes of a property path from a graph and returns a
 * property path object.
 *
 * @param {Clownface} graph
 * @param {Term} pathNode - Start node of the path
 * @return Property path object
 */
function extractPropertyPath (graph, pathNode) {
  if (pathNode.termType === 'NamedNode') {
    return pathNode
  }

  if (pathNode.termType === 'BlankNode') {
    const pathCf = graph.node(pathNode)

    const first = pathCf.out(rdf.first).term
    if (first) {
      const paths = rdfListToArray(graph, pathNode)
      return paths.map(path => extractPropertyPath(graph, path))
    }

    const alternativePath = pathCf.out(sh.alternativePath).term
    if (alternativePath) {
      const paths = rdfListToArray(graph, alternativePath)
      return { or: paths.map(path => extractPropertyPath(graph, path)) }
    }

    const zeroOrMorePath = pathCf.out(sh.zeroOrMorePath).term
    if (zeroOrMorePath) {
      return { zeroOrMore: extractPropertyPath(graph, zeroOrMorePath) }
    }

    const oneOrMorePath = pathCf.out(sh.oneOrMorePath).term
    if (oneOrMorePath) {
      return { oneOrMore: extractPropertyPath(graph, oneOrMorePath) }
    }

    const zeroOrOnePath = pathCf.out(sh.zeroOrOnePath).term
    if (zeroOrOnePath) {
      return { zeroOrOne: extractPropertyPath(graph, zeroOrOnePath) }
    }

    const inversePath = pathCf.out(sh.inversePath).term
    if (inversePath) {
      return { inverse: extractPropertyPath(graph, inversePath) }
    }
  }

  throw new Error(`Unsupported SHACL path: ${pathNode.value}`)
}

/**
 * Follows a property path in a graph, starting from a given node, and returns
 * all the nodes it points to.
 *
 * @param {Clownface} graph
 * @param {Term} subject - Start node
 * @param {object} path - Property path object
 * @return {Term[]} - Nodes that are reachable through the property path
 */
function getPathObjects (graph, subject, path) {
  return [...getPathObjectsSet(graph, subject, path)]
}

function getPathObjectsSet (graph, subject, path) {
  if (path.termType === 'NamedNode') {
    return getNamedNodePathObjects(graph, subject, path)
  } else if (Array.isArray(path)) {
    return getSequencePathObjects(graph, subject, path)
  } else if (path.or) {
    return getOrPathObjects(graph, subject, path)
  } else if (path.inverse) {
    return getInversePathObjects(graph, subject, path)
  } else if (path.zeroOrOne) {
    return getZeroOrOnePathObjects(graph, subject, path)
  } else if (path.zeroOrMore) {
    return getZeroOrMorePathObjects(graph, subject, path)
  } else if (path.oneOrMore) {
    return getOneOrMorePathObjects(graph, subject, path)
  } else {
    throw new Error(`Unsupported path object: ${path}`)
  }
}

function getNamedNodePathObjects (graph, subject, path) {
  return new NodeSet(graph.node(subject).out(path).terms)
}

function getSequencePathObjects (graph, subject, path) {
  // TODO: This one is really unreadable
  let subjects = new NodeSet([subject])
  for (const pathItem of path) {
    subjects = new NodeSet(flatMap(subjects, subjectItem =>
      getPathObjects(graph, subjectItem, pathItem)))
  }
  return subjects
}

function getOrPathObjects (graph, subject, path) {
  return new NodeSet(flatMap(path.or, pathItem => getPathObjects(graph, subject, pathItem)))
}

function getInversePathObjects (graph, subject, path) {
  if (path.inverse.termType !== 'NamedNode') {
    throw new Error('Unsupported: Inverse paths only work for named nodes')
  }

  return new NodeSet(graph.node(subject).in(path.inverse).terms)
}

function getZeroOrOnePathObjects (graph, subject, path) {
  const pathObjects = getPathObjectsSet(graph, subject, path.zeroOrOne)
  pathObjects.add(subject)
  return pathObjects
}

function getZeroOrMorePathObjects (graph, subject, path) {
  const pathObjects = walkPath(graph, subject, path.zeroOrMore)
  pathObjects.add(subject)
  return pathObjects
}

function getOneOrMorePathObjects (graph, subject, path) {
  return walkPath(graph, subject, path.oneOrMore)
}

function walkPath (graph, subject, path, visited) {
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

function flatMap (arr, func) {
  return [...arr].reduce((acc, x) => acc.concat(func(x)), [])
}

module.exports = {
  extractPropertyPath,
  getPathObjects
}
