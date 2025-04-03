/* eslint-env mocha */
import path from 'path'
import assert from 'assert'
import url from 'url'
import rdf from '@zazuko/env-node'
import SHACLValidator from '../index.js'
import { loadDataset } from './utils.js'
import sinon from 'sinon'
import { expect } from 'chai'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const rootPath = path.join(__dirname, '.')

describe('nested results', () => {
  it('provides nested validation results using `sh:detail`', async () => {
    const dataPath = path.join(rootPath, 'data/nested-shape.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes, { factory: rdf })
    const report = await validator.validate(data)

    assert.strictEqual(report.results.length, 1)
    const result = report.results[0]
    assert.strictEqual(result.message.length, 1)
    assert.strictEqual(result.message[0].value, 'Value does not have shape <http://example.org/shacl-test/NestedShape>')

    assert.strictEqual(result.detail.length, 2)
    const nestedResult0 = result.detail[0]
    assert.strictEqual(nestedResult0.path.value, 'http://example.org/shacl-test/name')
    assert.strictEqual(nestedResult0.message[0].value, 'More than 1 values')
    const nestedResult1 = result.detail[1]
    assert.strictEqual(nestedResult1.path.value, 'http://example.org/shacl-test/address')
    assert.strictEqual(nestedResult1.message[0].value, 'Less than 1 values')
  })
})

describe('recursive shapes', () => {
  it('creates a report successfully', async () => {
    const dataPath = path.join(rootPath, 'data/nested-blank-nodes.ttl')
    const graph = await loadDataset(dataPath)

    const validator = new SHACLValidator(graph, { factory: rdf })
    const report = await validator.validate(graph)

    assert.strictEqual(report.conforms, false)
  })
})

describe('owl:imports', () => {
  it('recursively loads shapes from imported graphs', async () => {
    // given
    const dataPath = path.join(rootPath, 'data/owl-imports.ttl')
    const importedPath = path.join(rootPath, 'data/owl-imported.ttl')
    const graph = await loadDataset(dataPath)
    const importGraph = sinon.stub()
      .callsFake(() => {
        return loadDataset(importedPath)
      })

    // when
    const validator = new SHACLValidator(graph, { factory: rdf, importGraph })
    await validator.validate(graph)
    await validator.validate(graph)

    // then
    expect(importGraph).to.have.callCount(3)
    expect(validator.$shapes.has(rdf.ns.rdf.type, rdf.ns.sh.NodeShape).terms).to.deep.contain.all.members([
      rdf.namedNode('http://example.org/Shape1'),
      rdf.namedNode('http://example.org/Shape2'),
    ])
  })
})
