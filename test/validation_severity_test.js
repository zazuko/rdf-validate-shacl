/* eslint-env mocha */
import path from 'path'
import assert from 'assert'
import url from 'url'
import ns from '../src/namespaces.js'
import SHACLValidator from '../index.js'
import { loadDataset } from './utils.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const rootPath = path.join(__dirname, '/data/validation-severity')

describe('validation severity', () => {
  it('Returns sh:Violation as default severity if not specified', async () => {
    const dataPath = path.join(rootPath, 'severity-default.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = validator.validate(data)

    assert.ok(report.results[0].severity.equals(ns.sh.Violation))
  })

  it('Returns shape severity when specified', async () => {
    const dataPath = path.join(rootPath, 'severity-from-shape-property.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = validator.validate(data)

    assert.ok(report.results[0].severity.equals(ns.sh.Warning))
  })
})
