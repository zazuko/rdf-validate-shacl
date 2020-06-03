/* eslint-env mocha */
const assert = require('assert')
const RDF = require('rdf-ext')
const clownface = require('clownface')

const { rdf, sh } = require('../src/namespaces')
const ValidationReport = require('../src/validation-report')

describe('ValidationReport', () => {
  it('returns a validation report', () => {
    const report = new ValidationReport([])

    assert.ok(report instanceof ValidationReport)
  })

  describe('#conforms', () => {
    it('conforms', () => {
      const report = new ValidationReport([])

      assert.strictEqual(report.conforms, true)
    })

    it('does not conform', () => {
      const results = [RDF.quad(RDF.blankNode(), rdf.type, sh.ValidationResult)]

      const report = new ValidationReport(results)
      assert.strictEqual(report.conforms, false)
    })
  })

  describe('#results', () => {
    it('returns empty list', () => {
      const report = new ValidationReport([])

      assert.deepStrictEqual(report.results, [])
    })

    it('returns reports list', () => {
      const results = [
        RDF.quad(RDF.blankNode(), rdf.type, sh.ValidationResult),
        RDF.quad(RDF.blankNode(), rdf.type, sh.ValidationResult)
      ]

      const report = new ValidationReport(results)

      assert.strictEqual(report.results.length, 2)
    })
  })

  describe('#dataset', () => {
    it('returns a dataset with a report that conforms', () => {
      const report = new ValidationReport([])

      const dataset = report.dataset

      const cf = clownface({ dataset })
      const cfReport = cf.namedNode(sh.ValidationReport).in(rdf.type)
      const conforms = cfReport.out(sh.conforms).values
      assert.deepStrictEqual(conforms, ['true'])
      const results = cfReport.out(sh.result).values
      assert.deepStrictEqual(results, [])
    })

    it('returns a dataset with a report that does not conform', () => {
      const resultID1 = RDF.blankNode()
      const resultID2 = RDF.blankNode()
      const report = new ValidationReport([
        RDF.quad(resultID1, rdf.type, sh.ValidationResult),
        RDF.quad(resultID1, sh.resultMessage, 'Something is invalid'),
        RDF.quad(resultID2, rdf.type, sh.ValidationResult),
        RDF.quad(resultID2, sh.resultMessage, 'Some other thing is invalid'),
        RDF.quad(resultID1, sh.resultPath, RDF.namedNode('ex:aProperty')),
        RDF.quad(resultID2, sh.resultPath, RDF.namedNode('ex:aProperty'))
      ])

      const dataset = report.dataset

      const cf = clownface({ dataset })
      const cfReport = cf.namedNode(sh.ValidationReport).in(rdf.type)
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
    const wrap = (f) => {
      return (...args) => {
        const original = RDF[f](...args)
        original._test = 'test'
        return original
      }
    }
    const factory = {
      dataset: wrap('dataset'),
      quad: wrap('quad'),
      blankNode: wrap('blankNode'),
      namedNode: wrap('namedNode'),
      literal: wrap('literal')
    }
    const report = new ValidationReport([], { factory })

    assert.ok(report.dataset._test === 'test')
    report.dataset.forEach((quad) => {
      assert.ok(quad._test === 'test')
      assert.ok(quad.subject._test === 'test')
      assert.ok(quad.predicate._test === 'test')
      assert.ok(quad.object._test === 'test')
    })
  })
})

describe('ValidationResult', () => {
  it('returns empty values', () => {
    const results = [RDF.quad(RDF.blankNode(), rdf.type, sh.ValidationResult)]

    const report = new ValidationReport(results)
    const result = report.results[0]

    assert.deepStrictEqual(result.message, [])
    assert.deepStrictEqual(result.path, null)
    assert.deepStrictEqual(result.focusNode, null)
    assert.deepStrictEqual(result.severity, null)
    assert.deepStrictEqual(result.sourceShape, null)
    assert.deepStrictEqual(result.sourceConstraintComponent, null)
  })

  describe('shorthand properties', () => {
    const resultNode = RDF.blankNode()
    const results = [
      RDF.quad(resultNode, rdf.type, sh.ValidationResult),
      RDF.quad(resultNode, sh.resultMessage, RDF.literal('result message')),
      RDF.quad(resultNode, sh.resultPath, RDF.namedNode('result path')),
      RDF.quad(resultNode, sh.focusNode, RDF.namedNode('focus node')),
      RDF.quad(resultNode, sh.resultSeverity, sh.Violation),
      RDF.quad(resultNode, sh.sourceShape, RDF.namedNode('source shape')),
      RDF.quad(resultNode, sh.sourceConstraintComponent, RDF.namedNode('source constraint component'))
    ]

    const report = new ValidationReport(results)
    const result = report.results[0]

    it('returns a message list', () => {
      assert.deepStrictEqual(result.message, [RDF.literal('result message')])
    })

    it('returns path term', () => {
      assert.deepStrictEqual(result.path, RDF.namedNode('result path'))
    })

    it('returns focusNode term', () => {
      assert.deepStrictEqual(result.focusNode, RDF.namedNode('focus node'))
    })

    it('returns severity term', () => {
      assert.deepStrictEqual(result.severity, sh.Violation)
    })

    it('returns sourceShape term', () => {
      assert.deepStrictEqual(result.sourceShape, RDF.namedNode('source shape'))
    })

    it('returns sourceConstraintComponent term', () => {
      assert.deepStrictEqual(result.sourceConstraintComponent, RDF.namedNode('source constraint component'))
    })
  })
})
