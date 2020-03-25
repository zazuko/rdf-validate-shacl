const namespace = require('@rdfjs/namespace')

const prepareNamespaces = (factory) => {
  return {
    sh: namespace('http://www.w3.org/ns/shacl#', { factory }),
    xsd: namespace('http://www.w3.org/2001/XMLSchema#', { factory }),
    rdf: namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#', { factory }),
    rdfs: namespace('http://www.w3.org/2000/01/rdf-schema#', { factory })
  }
}

const namespaces = prepareNamespaces()

module.exports = { ...namespaces, prepareNamespaces }
