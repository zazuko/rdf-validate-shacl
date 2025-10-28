/* eslint-env mocha */
import assert from 'assert'
import path from 'path'
import url from 'url'
import { loadDataset } from 'rdf-validate-shacl-test-harness'
import SHACLValidator from '../index.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

describe('configuration', () => {
  it('stops after `maxErrors` is reached', async () => {
    const dataFile = path.join(__dirname, '/data/data-shapes/core/property/class-001.ttl')
    const data = await loadDataset(dataFile)
    const shapes = data

    const validator1 = new SHACLValidator(shapes)
    const report1 = await validator1.validate(data)
    assert.strictEqual(report1.conforms, false)
    assert.strictEqual(report1.results.length, 2)

    const validator2 = new SHACLValidator(shapes, { maxErrors: 1 })
    const report2 = await validator2.validate(data)
    assert.strictEqual(report2.conforms, false)
    assert.strictEqual(report2.results.length, 1)
  })

  it('allows named nodes in list paths', async () => {
    const dataFile = path.join(__dirname, '/data/namedNodeInPaths.ttl')
    const data = await loadDataset(dataFile)
    const shapes = data

    const validator1 = new SHACLValidator(shapes, { allowNamedNodeInList: true })
    const report1 = await validator1.validate(data)
    assert.strictEqual(report1.conforms, true)

    const validator2 = new SHACLValidator(shapes, { allowNamedNodeInList: false })
    const report2 = await validator2.validate(data)
    assert.strictEqual(report2.conforms, false)

    const validator3 = new SHACLValidator(shapes)
    const report3 = await validator3.validate(data)
    assert.strictEqual(report3.conforms, false)
  })
})
