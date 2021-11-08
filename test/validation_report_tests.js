/* eslint-env mocha */
const assert = require('assert')
const RDF = require('rdf-ext')
const clownface = require('clownface')

const { rdf, sh } = require('../src/namespaces')
const ValidationReport = require('../src/validation-report')

describe('ValidationReport', () => {
  it('returns a validation report', () => {
    const pointer = clownface({ dataset: RDF.dataset() }).blankNode()
    const report = new ValidationReport(pointer)

    assert.ok(report instanceof ValidationReport)
  })

  describe('#conforms', () => {
    it('conforms', () => {
      const pointer = clownface({ dataset: RDF.dataset() }).blankNode()
      const report = new ValidationReport(pointer)

      assert.strictEqual(report.conforms, true)
    })

    it('does not conform', () => {
      const pointer = clownface({ dataset: RDF.dataset() }).blankNode()
        .addOut(sh.result, result => { result.addOut(rdf.type, sh.ValidationResult) })
      const report = new ValidationReport(pointer)

      assert.strictEqual(report.conforms, false)
    })
  })

  describe('#results', () => {
    it('returns empty list', () => {
      const pointer = clownface({ dataset: RDF.dataset() }).blankNode()
      const report = new ValidationReport(pointer)

      assert.deepStrictEqual(report.results, [])
    })

    it('returns reports list', () => {
      const pointer = clownface({ dataset: RDF.dataset() }).blankNode()
        .addOut(sh.result, result => { result.addOut(rdf.type, sh.ValidationResult) })
        .addOut(sh.result, result => { result.addOut(rdf.type, sh.ValidationResult) })
      const report = new ValidationReport(pointer)

      assert.strictEqual(report.results.length, 2)
    })
  })

  describe('#term', () => {
    it('returns the sh:ValidationReport term', () => {
      const pointer = clownface({ dataset: RDF.dataset() }).blankNode()
      const report = new ValidationReport(pointer)

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
    const pointer = clownface({ dataset: RDF.dataset(), factory }).blankNode()
    const report = new ValidationReport(pointer, { factory })

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
    const pointer = clownface({ dataset: RDF.dataset() }).blankNode()
      .addOut(sh.result, result => { result.addOut(rdf.type, sh.ValidationResult) })
    const report = new ValidationReport(pointer)

    const result = report.results[0]

    assert.deepStrictEqual(result.message, [])
    assert.deepStrictEqual(result.path, null)
    assert.deepStrictEqual(result.focusNode, null)
    assert.deepStrictEqual(result.severity, null)
    assert.deepStrictEqual(result.sourceShape, null)
    assert.deepStrictEqual(result.sourceConstraintComponent, null)
  })

  describe('shorthand properties', () => {
    const pointer = clownface({ dataset: RDF.dataset() }).blankNode()
      .addOut(sh.result, result => {
        result
          .addOut(rdf.type, sh.ValidationResult)
          .addOut(sh.resultMessage, RDF.literal('result message'))
          .addOut(sh.resultPath, RDF.namedNode('result path'))
          .addOut(sh.focusNode, RDF.namedNode('focus node'))
          .addOut(sh.resultSeverity, sh.Warning)
          .addOut(sh.sourceShape, RDF.namedNode('source shape'))
          .addOut(sh.sourceConstraintComponent, RDF.namedNode('source constraint component'))
      })
    const report = new ValidationReport(pointer)

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
      assert.deepStrictEqual(result.severity, sh.Warning)
    })

    it('returns sourceShape term', () => {
      assert.deepStrictEqual(result.sourceShape, RDF.namedNode('source shape'))
    })

    it('returns sourceConstraintComponent term', () => {
      assert.deepStrictEqual(result.sourceConstraintComponent, RDF.namedNode('source constraint component'))
    })
  })
})
