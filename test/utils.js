const fs = require('fs')
const ParserN3 = require('@rdfjs/parser-n3')
const $rdf = require('rdf-ext')

async function loadDataset (filePath) {
  const stream = fs.createReadStream(filePath)
  const parser = new ParserN3({ factory: $rdf })
  return $rdf.dataset().import(parser.import(stream))
}

module.exports = {
  loadDataset
}
