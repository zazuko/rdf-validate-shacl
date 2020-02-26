
const fs = require('fs')
const getStream = require('get-stream')
const N3Parser = require('@rdfjs/parser-n3')
const { serializeQuads } = require('./dataset-serializer')

const vocabularies = [
  ['./vocabularies/dash.ttl', 'src/vocabularies/dash.js'],
  ['./node_modules/@zazuko/rdf-vocabularies/ontologies/sh.nq', 'src/vocabularies/shacl.js']
]

async function main () {
  for (const [inPath, outPath] of vocabularies) {
    const parser = new N3Parser()
    const input = fs.createReadStream(inPath)
    const quads = await getStream.array(parser.import(input))

    fs.writeFileSync(outPath, serializeQuads(quads))
  }
}

main()
