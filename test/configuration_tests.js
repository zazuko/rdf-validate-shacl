/* eslint-env mocha */
var assert = require('assert')
var path = require('path')
var rdf = require('rdf-ext')
var rdfFS = require('rdf-utils-fs')
var SHACLValidator = require('../index')

describe('configuration', () => {
  it('sets validationErrorBatch', async () => {
    var validator = new SHACLValidator()

    var dataFile = path.join(__dirname, '/data/core/property/class-001.test.ttl')
    var data = await rdf.dataset().import(rdfFS.fromFile(dataFile))

    const report1 = await validator.validate(data, data)
    assert.strictEqual(report1.conforms(), false)
    assert.strictEqual(report1.results().length, 2)

    validator.getConfiguration().setValidationErrorBatch(1)
    const report2 = await validator.validate(data, data)
    assert.strictEqual(report2.conforms(), false)
    assert.strictEqual(report2.results().length, 1)
  })
})
