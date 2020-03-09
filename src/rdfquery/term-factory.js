
const REGEX_URI = /^([a-z][a-z0-9+.-]*):(?:\/\/((?:(?=((?:[a-z0-9-._~!$&'()*+,;=:]|%[0-9A-F]{2})*))(\3)@)?(?=(\[[0-9A-F:.]{2,}\]|(?:[a-z0-9-._~!$&'()*+,;=]|%[0-9A-F]{2})*))\5(?::(?=(\d*))\6)?)(\/(?=((?:[a-z0-9-._~!$&'()*+,;=:@/]|%[0-9A-F]{2})*))\8)?|(\/?(?!\/)(?=((?:[a-z0-9-._~!$&'()*+,;=:@/]|%[0-9A-F]{2})*))\10)?)(?:\?(?=((?:[a-z0-9-._~!$&'()*+,;=:@/?]|%[0-9A-F]{2})*))\11)?(?:#(?=((?:[a-z0-9-._~!$&'()*+,;=:@/?]|%[0-9A-F]{2})*))\12)?$/i

class TermFactory {
  constructor (impl) {
    this.impl = impl || require('@rdfjs/dataset')

    this.namespaces = {
      dc: 'http://purl.org/dc/elements/1.1/',
      dcterms: 'http://purl.org/dc/terms/',
      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
      schema: 'http://schema.org/',
      sh: 'http://www.w3.org/ns/shacl#',
      skos: 'http://www.w3.org/2004/02/skos/core#',
      owl: 'http://www.w3.org/2002/07/owl#',
      xsd: 'http://www.w3.org/2001/XMLSchema#'
    }
  }

  /**
   * Produces an RDF* term from a TTL string representation.
   * Also uses the registered prefixes.
   * @param str  a string, e.g. "owl:Thing" or "true" or '"Hello"@en'.
   * @return an RDF term
   */
  term (str) {
    // TODO: this implementation currently only supports booleans and qnames
    if (str === 'true' || str === 'false') {
      return this.literal(str, (this.term('xsd:boolean')))
    }

    if (str.match(/^\d+$/)) {
      return this.literal(str, (this.term('xsd:integer')))
    }

    if (str.match(/^\d+\.\d+$/)) {
      return this.literal(str, (this.term('xsd:float')))
    }

    const col = str.indexOf(':')
    if (col > 0) {
      const ns = this.namespaces[str.substring(0, col)]
      if (ns != null) {
        return this.namedNode(ns + str.substring(col + 1))
      } else {
        if (str.match(REGEX_URI)) {
          return this.namedNode(str)
        }
      }
    }
    return this.literal(str)
  }

  /**
   * Produces a new blank node.
   * @param id  an optional ID for the node
   */
  blankNode (id) {
    return this.impl.blankNode(id)
  }

  /**
   * Produces a new literal.  For example .literal("42", T("xsd:integer")).
   * @param lex  the lexical form, e.g. "42"
   * @param langOrDatatype  either a language string or a URI node with the datatype
   */
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

module.exports = TermFactory
