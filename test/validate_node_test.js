/* eslint-env mocha */
import path from 'path'
import assert from 'assert'
import url from 'url'
import $rdf from '@zazuko/env-node'
import SHACLValidator from '../index.js'
import { loadDataset } from './utils.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const rootPath = path.join(__dirname, '/data')

describe('validate specific node with specific shape', () => {
  it('conforms', async () => {
    const dataPath = path.join(rootPath, 'validate-node.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data
    const node = $rdf.namedNode('Node1')
    const shape = $rdf.namedNode('Shape1')

    const validator = new SHACLValidator(shapes)
    const report = validator.validateNode(data, node, shape)

    assert.strictEqual(report.conforms, true)
  })

  it('does not conform', async () => {
    const dataPath = path.join(rootPath, 'validate-node.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data
    const node = $rdf.namedNode('Node2')
    const shape = $rdf.namedNode('Shape1')

    const validator = new SHACLValidator(shapes)
    const report = validator.validateNode(data, node, shape)

    assert.strictEqual(report.conforms, false)
    assert.strictEqual(report.results.length, 1)
    assert.strictEqual(report.results[0].focusNode, node)
  })
})
