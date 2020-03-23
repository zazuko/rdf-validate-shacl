
const NodeSet = require('./node-set')

function getPathObjects (graph, subject, path) {
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
  return new NodeSet(graph.cf.node(subject).out(path).terms)
}

function getSequencePathObjects (graph, subject, path) {
  // TODO: This one is really unreadable
  let subjects = new NodeSet([subject])
  for (const pathItem of path) {
    subjects = new NodeSet(flatMap(subjects, subjectItem =>
      [...getPathObjects(graph, subjectItem, pathItem)]))
  }
  return subjects
}

function getOrPathObjects (graph, subject, path) {
  return new NodeSet(flatMap(path.or, pathItem => [...getPathObjects(graph, subject, pathItem)]))
}

function getInversePathObjects (graph, subject, path) {
  if (path.inverse.termType !== 'NamedNode') {
    throw new Error('Unsupported: Inverse paths only work for named nodes')
  }

  return new NodeSet(graph.cf.node(subject).in(path.inverse).terms)
}

function getZeroOrOnePathObjects (graph, subject, path) {
  const pathObjects = getPathObjects(graph, subject, path.zeroOrOne)
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

  const pathValues = getPathObjects(graph, subject, path)

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
  getPathObjects
}
