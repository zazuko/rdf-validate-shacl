import fs from 'fs'
import ParserN3 from '@rdfjs/parser-n3'
import $rdf from 'rdf-ext'

export async function loadDataset(filePath) {
  const stream = fs.createReadStream(filePath)
  const parser = new ParserN3({ factory: $rdf })
  return $rdf.dataset().import(parser.import(stream))
}
