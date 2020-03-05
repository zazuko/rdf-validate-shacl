/* eslint-env mocha */
const assert = require('assert')
const path = require('path')
const SHACLValidator = require('../index')
const fs = require('fs')
const rdf = require('rdf-ext')
const rdfFS = require('rdf-utils-fs')
// expected result
const rdflibgraph = require('../src/rdflib-graph')
const RDFLibGraph = rdflibgraph.RDFLibGraph

const ExpectedValidationResult = function (solution) {
  this._id = solution.report.value

  this._focusNode = solution.focusNode.termType === 'BlankNode' ? '_:' + solution.focusNode.id : solution.focusNode.value
  this._severity = solution.severity.value
  this._constraint = solution.constraint.value
  this._shape = solution.shape.termType === 'BlankNode' ? '_:' + solution.shape.id : solution.shape.value
}

ExpectedValidationResult.prototype.id = function () {
  return this._id
}

ExpectedValidationResult.prototype.focusNode = function () {
  return this._focusNode
}

ExpectedValidationResult.prototype.severity = function () {
  if (this._severity != null) {
    return this._severity.split('#')[1]
  }
}

ExpectedValidationResult.prototype.sourceConstraintComponent = function () {
  return this._constraint
}

ExpectedValidationResult.prototype.sourceShape = function () {
  return this._shape
}

const ExpectedValidationReport = function (graph) {
  this.graph = graph
}

ExpectedValidationReport.prototype.conforms = function () {
  const conforms = this.graph.query()
    .match('?report', 'rdf:type', 'sh:ValidationReport')
    .match('?report', 'sh:conforms', '?conforms')
    .getNode('?conforms')
  return conforms != null && conforms.value === 'true'
}

ExpectedValidationReport.prototype.results = function () {
  const acc = []
  const query = this.graph.query()
    .match('?report', 'sh:result', '?result')
    .match('?result', 'sh:focusNode', '?focusNode')
    .match('?result', 'sh:resultSeverity', '?severity')
    .match('?result', 'sh:sourceConstraintComponent', '?constraint')
    .match('?result', 'sh:sourceShape', '?shape')
  let solution = query.nextSolution()
  while (solution != null) {
    acc.push(new ExpectedValidationResult(solution))
    solution = query.nextSolution()
  }
  return acc
}

const expectedResult = async function (data, mediaType) {
  const graph = new RDFLibGraph()
  graph.loadGraph('http://test.com/example', data)
  const expectedValidationReport = new ExpectedValidationReport(graph)
  expectedValidationReport.results()
  return expectedValidationReport
}

const isBlank = function (s) {
  return s != null && (s.indexOf('_:') === 0 || s.indexOf('_g_') > -1)
}

const validateReports = async function (input) {
  const data = await rdf.dataset().import(rdfFS.fromFile(input))

  const expectedReport = await expectedResult(data)
  const report = await new SHACLValidator().validate(data, data)
  assert.strictEqual(report.conforms(), expectedReport.conforms())
  assert.strictEqual(report.results().length, expectedReport.results().length)
  const results = report.results() || []
  const expectedResults = expectedReport.results()
  for (let i = 0; i < results.length; i++) {
    let found = false
    for (let j = 0; j < expectedResults.length; j++) {
      if (// (results[i].focusNode() ===  expectedResults[j].focusNode() ) &&
        results[i].severity() === expectedResults[j].severity() &&
                ((isBlank(results[i].sourceShape()) && isBlank(expectedResults[j].sourceShape())) ||
                    results[i].sourceShape() === expectedResults[j].sourceShape()) &&
                results[i].sourceConstraintComponent() === expectedResults[j].sourceConstraintComponent()) {
        found = true
      }
    }
    assert.strictEqual(found, true)
  }
}

describe('integration tests', () => {
  const rootPath = path.join(__dirname, '/data/core')
  fs.readdirSync(rootPath).forEach(function (dir) {
    const dirPath = path.join(rootPath, dir)
    fs.readdirSync(dirPath).forEach(function (file) {
      it(dir + '-test-' + file, async () => validateReports(path.join(dirPath, file)))
    })
  })
})
