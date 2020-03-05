/* eslint-env mocha */
const assert = require('assert')
const path = require('path')
const rdf = require('rdf-ext')
const rdfFS = require('rdf-utils-fs')
const SHACLValidator = require('../index')

describe('configuration', () => {
  it('sets validationErrorBatch', async () => {
    const validator = new SHACLValidator()

    const dataFile = path.join(__dirname, '/data/core/property/class-001.test.ttl')
    const data = await rdf.dataset().import(rdfFS.fromFile(dataFile))

    const report1 = await validator.validate(data, data)
    assert.strictEqual(report1.conforms(), false)
    assert.strictEqual(report1.results().length, 2)

    validator.getConfiguration().setValidationErrorBatch(1)
    const report2 = await validator.validate(data, data)
    assert.strictEqual(report2.conforms(), false)
    assert.strictEqual(report2.results().length, 1)
  })
})
