const namespace = require('@rdfjs/namespace')

const sh = namespace('http://www.w3.org/ns/shacl#')
const xsd = namespace('http://www.w3.org/2001/XMLSchema#')
const rdf = namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const rdfs = namespace('http://www.w3.org/2000/01/rdf-schema#')

module.exports = { sh, xsd, rdf, rdfs }
