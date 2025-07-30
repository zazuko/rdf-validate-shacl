import type { NamespaceBuilder } from '@rdfjs/namespace'
import namespace from '@rdfjs/namespace'
import type { DataFactory } from '@rdfjs/types'

export type Namespaces = {
  sh: NamespaceBuilder
  xsd: NamespaceBuilder
  rdf: NamespaceBuilder
  rdfs: NamespaceBuilder
  owl: NamespaceBuilder
}

export function prepareNamespaces(factory?: DataFactory): Namespaces {
  return {
    sh: namespace('http://www.w3.org/ns/shacl#', { factory }),
    xsd: namespace('http://www.w3.org/2001/XMLSchema#', { factory }),
    rdf: namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#', { factory }),
    rdfs: namespace('http://www.w3.org/2000/01/rdf-schema#', { factory }),
    owl: namespace('http://www.w3.org/2002/07/owl#', { factory }),
  }
}

export default prepareNamespaces()
