/* eslint-env mocha */
const assert = require('assert')
const rdf = require('rdf-ext')
const DataSetExt = require('rdf-ext/lib/Dataset')
const clownface = require('clownface')

const { rdf: rdfNS, sh } = require('../src/namespaces')
const ValidationReport = require('../src/validation-report')

describe('ValidationReport', () => {
  it('returns a validation report', () => {
    const report = new ValidationReport([])

    assert.ok(report instanceof ValidationReport)
  })

  describe('#conforms()', () => {
    it('conforms', () => {
      const report = new ValidationReport([])

      assert.ok(report.conforms())
    })

    it('does not conform', () => {
      const results = [rdf.quad(rdf.blankNode(), rdfNS.type, sh.ValidationResult)]

      const report = new ValidationReport(results)
      assert.ok(!report.conforms())
    })
  })

  describe('#results()', () => {
    it('returns empty list', () => {
      const report = new ValidationReport([])

      assert.deepStrictEqual(report.results(), [])
    })

    it('returns reports list', () => {
      const results = [
        rdf.quad(rdf.blankNode(), rdfNS.type, sh.ValidationResult),
        rdf.quad(rdf.blankNode(), rdfNS.type, sh.ValidationResult)
      ]

      const report = new ValidationReport(results)

      assert.strictEqual(report.results().length, 2)
    })
  })

  describe('#dataset', () => {
    it('returns a dataset with a report that conforms', () => {
      const report = new ValidationReport([])

      const dataset = report.dataset

      const cf = clownface({ dataset })
      const cfReport = cf.namedNode(sh.ValidationReport).in(rdfNS.type)
      const conforms = cfReport.out(sh.conforms).values
      assert.deepStrictEqual(conforms, ['true'])
      const results = cfReport.out(sh.result).values
      assert.deepStrictEqual(results, [])
    })

    it('returns a dataset with a report that does not conform', async () => {
      const resultID1 = rdf.blankNode()
      const resultID2 = rdf.blankNode()
      const report = new ValidationReport([
        rdf.quad(resultID1, rdfNS.type, sh.ValidationResult),
        rdf.quad(resultID1, sh.resultMessage, 'Something is invalid'),
        rdf.quad(resultID2, rdfNS.type, sh.ValidationResult),
        rdf.quad(resultID2, sh.resultMessage, 'Some other thing is invalid'),
        rdf.quad(resultID1, sh.resultPath, rdf.namedNode('ex:aProperty')),
        rdf.quad(resultID2, sh.resultPath, rdf.namedNode('ex:aProperty'))
      ])

      const dataset = report.dataset

      const cf = clownface({ dataset })
      const cfReport = cf.namedNode(sh.ValidationReport).in(rdfNS.type)
      const conforms = cfReport.out(sh.conforms).values
      assert.deepStrictEqual(conforms, ['false'])
      const results = cfReport.out(sh.result).map((cfResult) => cfResult.out().values)
      assert.deepStrictEqual(results, [
        ['http://www.w3.org/ns/shacl#ValidationResult', 'Something is invalid', 'ex:aProperty'],
        ['http://www.w3.org/ns/shacl#ValidationResult', 'Some other thing is invalid', 'ex:aProperty']
      ])
    })
  })

  describe('#term', () => {
    it('returns the sh:ValidationReport term', () => {
      const report = new ValidationReport([])

      assert.strictEqual(report.term.termType, 'BlankNode')
    })
  })

  it('uses injected factory', () => {
    const report = new ValidationReport([], { factory: rdf })

    assert.ok(report.dataset instanceof DataSetExt)
  })
})
