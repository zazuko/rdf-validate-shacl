import namespace from '@rdfjs/namespace'

/**
 * @typedef {{
 *   sh: import('@rdfjs/namespace').NamespaceBuilder,
 *   xsd: import('@rdfjs/namespace').NamespaceBuilder,
 *   rdf: import('@rdfjs/namespace').NamespaceBuilder,
 *   rdfs: import('@rdfjs/namespace').NamespaceBuilder
 * }} Namespaces
 */

/**
 * @param {import('@rdfjs/types').DataFactory} [factory]
 * @return {Namespaces}
 */
export function prepareNamespaces(factory) {
  return {
    sh: namespace('http://www.w3.org/ns/shacl#', { factory }),
    xsd: namespace('http://www.w3.org/2001/XMLSchema#', { factory }),
    rdf: namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#', { factory }),
    rdfs: namespace('http://www.w3.org/2000/01/rdf-schema#', { factory }),
  }
}

export default prepareNamespaces()
