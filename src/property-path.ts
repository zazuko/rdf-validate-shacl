import type { ShaclPropertyPath } from 'clownface-shacl-path'
import { findNodes } from 'clownface-shacl-path'
import type { AnyPointer } from 'clownface'
import type { Term } from '@rdfjs/types'

/**
 * Follows a property path in a graph, starting from a given node, and returns
 * all the nodes it points to.
 */
export function getPathObjects(graph: AnyPointer, subject: Term, path: ShaclPropertyPath | null): Term[] {
  if (!path) {
    throw new Error('Property Path cannot be null')
  }

  return findNodes(graph.node(subject), path).terms
}
