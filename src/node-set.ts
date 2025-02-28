import TermSet from '@rdfjs/term-set'
import type { Term } from '@rdfjs/types'

class NodeSet<T extends Term = Term> extends TermSet<T> {
  addAll(nodes: Iterable<T>) {
    for (const node of nodes) {
      this.add(node)
    }
  }
}

export default NodeSet
