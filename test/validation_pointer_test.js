/* eslint-env mocha */
import path from 'path'
import assert from 'assert'
import url from 'url'
import rdf from '@zazuko/env-node'
import SHACLValidator from '../index.js'
import { loadDataset } from './utils.js'
import $rdf from '@zazuko/env-node'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const rootPath = path.join(__dirname, '/data')

describe('using graph pointer', () => {
  it('.validate', async () => {
    const dataPath = path.join(rootPath, 'validate-node.ttl')
    const dataset = await loadDataset(dataPath)
    const data = rdf.clownface({ dataset })

    const validator = new SHACLValidator(dataset, { factory: rdf })
    const report = validator.validate(data)

    assert.equal(report.conforms, false)
  })

  it('.validateNode', async () => {
    const dataPath = path.join(rootPath, 'validate-node.ttl')
    const dataset = await loadDataset(dataPath)
    const data = rdf.clownface({ dataset })
    const node = $rdf.namedNode('Node2')
    const shape = $rdf.namedNode('Shape1')

    const validator = new SHACLValidator(dataset, { factory: rdf })
    const report = validator.validateNode(data, node, shape)

    assert.equal(report.conforms, false)
  })
})
