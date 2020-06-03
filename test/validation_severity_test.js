/* eslint-env mocha */
const path = require('path')
const assert = require('assert')
const { loadDataset } = require('./utils')
const { sh } = require('../src/namespaces')

const SHACLValidator = require('../index')
const rootPath = path.join(__dirname, '/data/validation-severity')

describe('validation severity', () => {
  it('Returns sh:Violation as default severity if not specified', async () => {
    const dataPath = path.join(rootPath, 'severity-default.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = validator.validate(data)

    assert.ok(report.results[0].severity.equals(sh.Violation))
  })

  it('Returns shape severity when specified', async () => {
    const dataPath = path.join(rootPath, 'severity-from-shape-property.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = validator.validate(data)

    assert.ok(report.results[0].severity.equals(sh.Warning))
  })
})
