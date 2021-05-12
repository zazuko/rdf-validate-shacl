/* eslint-env mocha */
const path = require('path')
const assert = require('assert')
const $rdf = require('rdf-ext')
const { loadDataset } = require('./utils')

const SHACLValidator = require('../index')
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
