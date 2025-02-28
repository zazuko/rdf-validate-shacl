import TermSet from '@rdfjs/term-set'
import type { Term } from '@rdfjs/types'

class NodeSet extends TermSet {
  addAll(nodes: Iterable<Term>) {
    for (const node of nodes) {
      this.add(node)
    }
  }
}

export default NodeSet
