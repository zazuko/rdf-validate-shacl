import { findNodes } from 'clownface-shacl-path'

/**
 * Follows a property path in a graph, starting from a given node, and returns
 * all the nodes it points to.
 *
 * @param {import('clownface').AnyPointer} graph
 * @param {import('@rdfjs/types').Term} subject - Start node
 * @param {import('clownface-shacl-path').ShaclPropertyPath} path - Property path object
 * @return {import('@rdfjs/types').Term[]} - Nodes that are reachable through the property path
 */
export function getPathObjects(graph, subject, path) {
  return findNodes(graph.node(subject), path).terms
}
