/* eslint-env mocha */
const assert = require('assert')
const path = require('path')
const SHACLValidator = require('../index')
const fs = require('fs')
const rdf = require('rdf-ext')
const rdfFS = require('rdf-utils-fs')
const clownface = require('clownface')
const { sh, rdf: rdfNS } = require('../src/namespaces')

class ExpectedValidationReport {
  constructor (dataset) {
    this.cf = clownface({ dataset })
    this.reportNode = this.cf.namedNode(sh.ValidationReport).in(rdfNS.type)
  }

  conforms () {
    const conforms = this.reportNode.out(sh.conforms).value
    return conforms === 'true'
  }

  results () {
    return this.reportNode.out(sh.result).map((node) => new ExpectedValidationResult({
      report: this.reportNode.term,
      focusNode: node.out(sh.focusNode).term,
      severity: node.out(sh.resultSeverity).term,
      constraint: node.out(sh.sourceConstraintComponent).term,
      shape: node.out(sh.sourceShape).term
    }))
  }
}

class ExpectedValidationResult {
  constructor ({ report, severity, focusNode, constraint, shape }) {
    this._id = report.value

    this._focusNode = focusNode.termType === 'BlankNode' ? `_:${focusNode.value}` : focusNode.value
    this._severity = severity.value
    this._constraint = constraint.value
    this._shape = shape.termType === 'BlankNode' ? '_:' + shape.value : shape.value
  }

  id () {
    return this._id
  }

  focusNode () {
    return this._focusNode
  }

  severity () {
    if (this._severity != null) {
      return this._severity.split('#')[1]
    }
  }

  sourceConstraintComponent () {
    return this._constraint
  }

  sourceShape () {
    return this._shape
  }
}

const isBlank = function (s) {
  return s != null && (s.indexOf('_:') === 0 || s.indexOf('_g_') > -1)
}

const validateReports = async function (input) {
  const data = await rdf.dataset().import(rdfFS.fromFile(input))

  const expectedReport = new ExpectedValidationReport(data)
  const report = await new SHACLValidator().validate(data, data)
  assert.strictEqual(report.conforms(), expectedReport.conforms())
  assert.strictEqual(report.results().length, expectedReport.results().length)
  const results = report.results() || []
  const expectedResults = expectedReport.results()
  for (let i = 0; i < results.length; i++) {
    let found = false
    for (let j = 0; j < expectedResults.length; j++) {
      const result = results[i]
      const expectedResult = expectedResults[j]
      if (
        result.focusNode() === expectedResult.focusNode() &&
        result.severity() === expectedResult.severity() &&
        (
          (isBlank(result.sourceShape()) && isBlank(expectedResult.sourceShape())) ||
          result.sourceShape() === expectedResult.sourceShape()
        ) &&
        result.sourceConstraintComponent() === expectedResult.sourceConstraintComponent()
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
