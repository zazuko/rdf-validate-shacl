/* eslint-env mocha */
var assert = require('assert')
var path = require('path')
var rdf = require('rdf-ext')
var rdfFS = require('rdf-utils-fs')
var SHACLValidator = require('../index')
var fs = require('fs')

var results = {
  'http://datashapes.org/sh/tests/functionregistry/jsconstraintcomponent/data#InvalidExample': {
    path: 'http://datashapes.org/sh/tests/functionregistry/jsconstraintcomponent/data#prop',
    message: 'Value has more than 3 characters'
  },
  'http://datashapes.org/sh/tests/functionregistry/jsconstraintcomponent/data#InvalidExampleShape': {
    message: 'Shape is constantly valid false',
    path: null
  }
}

describe('registerJSLibrary', () => {
  xit('registers code via file path', async () => {
    var validator = new SHACLValidator()

    var url = 'http://example.org/ns/shapesConstraints.js'
    var localFile = path.join(__dirname, '/data/functionregistry/jsconstraintcomponent/library.js')
    var dataFile = path.join(__dirname, '/data/functionregistry/jsconstraintcomponent/data.ttl')
    var data = await rdf.dataset().import(rdfFS.fromFile(dataFile))

    await validator.registerJSLibrary(url, localFile)
    const report = await validator.validate(data, data)
    assert.strictEqual(report.conforms(), false)
    assert.strictEqual(report.results().length, 2)
    report.results().forEach((result) => {
      var expected = results[result.focusNode()]
      assert.notStrictEqual(expected, null)
      assert.strictEqual(result.path(), expected.path)
      assert.strictEqual(result.message(), expected.message)
    })
  })

  xit('registers code with string', async () => {
    var validator = new SHACLValidator()

    var url = 'http://example.org/ns/shapesConstraints.js'
    var jsFile = path.join(__dirname, '/data/functionregistry/jsconstraintcomponent/library.js')
    var jsCode = fs.readFileSync(jsFile).toString()
    var dataFile = path.join(__dirname, '/data/functionregistry/jsconstraintcomponent/data.ttl')
    var data = await rdf.dataset().import(rdfFS.fromFile(dataFile))

    validator.registerJSCode(url, jsCode)
    const report = await validator.validate(data, data)
    assert.strictEqual(report.conforms(), false)
    assert.strictEqual(report.results().length, 2)
    report.results().forEach(function (result) {
      var expected = results[result.focusNode()]
      assert.notStrictEqual(expected, null)
      assert.strictEqual(result.path(), expected.path)
      assert.strictEqual(result.message(), expected.message)
    })
  })
})
