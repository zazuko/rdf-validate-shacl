import fs from 'fs'
import { StreamParser } from 'n3'
import $rdf from '@zazuko/env-node'

export async function loadDataset(filePath: string) {
  const stream = fs.createReadStream(filePath)
  const parser = new StreamParser({ blankNodePrefix: 'd' })
  return $rdf.dataset().import(parser.import(stream))
}
