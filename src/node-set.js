const TermSet = require('@rdfjs/term-set')

class NodeSet extends TermSet {
  addAll (nodes) {
    for (const node of nodes) {
      this.add(node)
    }
  }
}

module.exports = NodeSet
