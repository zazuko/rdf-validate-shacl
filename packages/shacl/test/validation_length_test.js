import assert from 'assert'
import rdf from '@zazuko/env-node'
import SHACLValidator from '../index.js'

describe('string length validation', () => {
  const cases = [
    ['one astral character', rdf.literal('😀'), 1, true, true],
    ['astral character below minimum', rdf.literal('😀'), 2, false, true],
    ['astral character above maximum', rdf.literal('😀'), 0, true, false],
    ['mixed BMP and astral characters', rdf.literal('a😀b'), 3, true, true],
    ['mixed characters below minimum', rdf.literal('a😀b'), 4, false, true],
    ['mixed characters above maximum', rdf.literal('a😀b'), 2, true, false],
    ['BMP characters', rdf.literal('é漢'), 2, true, true],
    ['combining marks count separately', rdf.literal('e\u0301'), 2, true, true],
    ['joined emoji count as multiple code points', rdf.literal('👩\u200d💻'), 3, true, true],
    ['ASCII characters', rdf.literal('abc'), 3, true, true],
    ['empty string', rdf.literal(''), 0, true, true],
    ['language-tagged literal', rdf.literal('😀', 'en'), 1, true, true],
    ['typed literal', rdf.literal('😀', rdf.namedNode('http://example.org/Custom')), 1, true, true],
    ['IRI containing an astral character', rdf.namedNode('http://example.org/😀'), 20, true, true],
    ['IRI below minimum', rdf.namedNode('http://example.org/😀'), 21, false, true],
    ['blank node', rdf.blankNode(), 0, false, false],
  ]

  for (const [constraint, component] of [
    ['minLength', 'MinLengthConstraintComponent'],
    ['maxLength', 'MaxLengthConstraintComponent'],
  ]) {
    for (const propertyShape of [false, true]) {
      describe(`${constraint} on ${propertyShape ? 'property' : 'node'} shapes`, () => {
        for (const [name, value, limit, minConforms, maxConforms] of cases) {
          const conforms = constraint === 'minLength' ? minConforms : maxConforms
          it(name, async () => {
            const { sh, xsd } = rdf.ns
            const shape = rdf.blankNode()
            const focus = rdf.namedNode('http://example.org/focus')
            const path = rdf.namedNode('http://example.org/value')
            const shapes = rdf.dataset([
              rdf.quad(shape, sh.targetNode, propertyShape ? focus : value),
              rdf.quad(shape, sh[constraint], rdf.literal(String(limit), xsd.integer)),
            ])
            if (propertyShape) {
              shapes.add(rdf.quad(shape, sh.path, path))
            }
            const data = rdf.dataset([rdf.quad(focus, path, value)])

            const report = await new SHACLValidator(shapes, { factory: rdf }).validate(data)

            assert.strictEqual(report.conforms, conforms)
            assert.strictEqual(report.results.length, conforms ? 0 : 1)
            if (!conforms) {
              assert(report.results[0].sourceConstraintComponent.equals(sh[component]))
              assert(report.results[0].value.equals(value))
            }
          })
        }
      })
    }
  }
})
