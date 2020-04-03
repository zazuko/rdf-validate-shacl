/* eslint-env mocha */
const assert = require('assert')
const path = require('path')
const SHACLValidator = require('../index')
const fs = require('fs')
const clownface = require('clownface')
const { sh, rdf: rdfNS } = require('../src/namespaces')
const { loadDataset } = require('./utils')

class ExpectedValidationReport {
  constructor (dataset) {
    this.cf = clownface({ dataset })
    this.reportNode = this.cf.namedNode(sh.ValidationReport).in(rdfNS.type)
  }

  get conforms () {
    return this.reportNode.out(sh.conforms).value === 'true'
  }

  get results () {
    return this.reportNode.out(sh.result).map((node) => new ExpectedValidationResult({
      focusNode: node.out(sh.focusNode).term,
      severity: node.out(sh.resultSeverity).term,
      constraint: node.out(sh.sourceConstraintComponent).term,
      shape: node.out(sh.sourceShape).term
    }))
  }
}

class ExpectedValidationResult {
  constructor ({ severity, focusNode, constraint, shape }) {
    this.focusNode = focusNode.termType === 'BlankNode' ? `_:${focusNode.value}` : focusNode.value
    this.severity = severity ? severity.value.split('#')[1] : null
    this.sourceConstraintComponent = constraint.value
    this.sourceShape = shape.termType === 'BlankNode' ? '_:' + shape.value : shape.value
  }
}

const isBlank = function (s) {
  return s != null && (s.indexOf('_:') === 0 || s.indexOf('_g_') > -1)
}

const validateReports = async function (input) {
  const data = await loadDataset(input)
  const shapes = data

  const expectedReport = new ExpectedValidationReport(data)
  const report = new SHACLValidator(shapes).validate(data)
  assert.strictEqual(report.conforms, expectedReport.conforms)
  assert.strictEqual(report.results.length, expectedReport.results.length)

  for (const result of report.results) {
    let found = false
    for (const expectedResult of expectedReport.results) {
      if (
        result.focusNode === expectedResult.focusNode &&
        result.severity === expectedResult.severity &&
        (
          (isBlank(result.sourceShape) && isBlank(expectedResult.sourceShape)) ||
          result.sourceShape === expectedResult.sourceShape
        ) &&
        result.sourceConstraintComponent === expectedResult.sourceConstraintComponent
      ) {
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
