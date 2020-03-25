const { prepareNamespaces } = require('./namespaces')

class DataFactory {
  constructor (impl) {
    this.impl = impl || require('@rdfjs/dataset')
    this.ns = prepareNamespaces(this)
  }

  get true () {
    return this.literal('true', this.ns.xsd.boolean)
  }

  blankNode (id) {
    return this.impl.blankNode(id)
  }

  literal (lex, langOrDatatype) {
    return this.impl.literal(lex, langOrDatatype)
  }

  namedNode (uri) {
    return this.impl.namedNode(uri)
  }

  quad (s, p, o, g) {
    return this.impl.quad(s, p, o, g)
  }

  dataset (quads) {
    return this.impl.dataset(quads)
  }
}

module.exports = DataFactory
