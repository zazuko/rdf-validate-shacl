import type { ShaclPropertyPath } from 'clownface-shacl-path'
import { findNodes } from 'clownface-shacl-path'
import type { AnyPointer } from 'clownface'
import type { Term } from '@rdfjs/types'

/**
 * Follows a property path in a graph, starting from a given node, and returns
 * all the nodes it points to.
 */
export function getPathObjects(graph: AnyPointer, subject: Term, path: Term | ShaclPropertyPath | null): Term[] {
  if (!path) {
    throw new Error('Property Path cannot be null')
  }
  if ('termType' in path && path.termType !== 'NamedNode') {
    throw new Error('Property Path must be a NamedNode or instance of ShaclPropertyPath')
  }

  return findNodes(graph.node(subject), path).terms
}
