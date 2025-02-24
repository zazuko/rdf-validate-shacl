import TermSet from '@rdfjs/term-set'

class NodeSet extends TermSet {
  /**
   * @param {Iterable<import('@rdfjs/types').Term>} nodes
   */
  addAll(nodes) {
    for (const node of nodes) {
      this.add(node)
    }
  }
}

export default NodeSet
