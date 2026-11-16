import assert from 'assert'
import rdf from '@zazuko/env-node'
import SHACLValidator from '../index.js'

describe('pattern validation', () => {
  const cases = [
    ['ignores spaces with x', '^a b$', 'ab', 'x', true],
    ['ignores XML whitespace with x', '^a\t \r\nb$', 'ab', 'x', true],
    ['reports non-matches with x', '^a b$', 'ac', 'x', false],
    ['preserves spaces in character classes', '^a[ ]b$', 'a b', 'x', true],
    ['requires spaces in character classes', '^a[ ]b$', 'ab', 'x', false],
    ['preserves whitespace after an escaped closing bracket', '^a[\\] ]b$', 'a b', 'x', true],
    ['handles escaped opening brackets', '^\\[ a b \\]$', '[ab]', 'x', true],
    ['handles escaped backslashes before character classes', '^\\\\[ ]$', '\\ ', 'x', true],
    ['preserves whitespace escapes', '^a\\s b$', 'a b', 'x', true],
    ['removes whitespace before interpreting escapes', '^a\\ sb$', 'a b', 'x', true],
    ['preserves non-XML whitespace', '^a\u00a0b$', 'a\u00a0b', 'x', true],
    ['combines x with other flags', '^a . b$', 'A\nB', 'xsi', true],
    ['combines x with multiline matching', '^a b$', 'before\nab\nafter', 'xm', true],
    ['preserves spaces without x', '^a b$', 'a b', undefined, true],
    ['requires spaces without x', '^a b$', 'ab', undefined, false],
    ['matches an astral character with dot', '^.$', '😀', undefined, true],
    ['counts astral characters in quantifiers', '^.{2}$', '😀', undefined, false],
    ['matches astral characters with other flags', '^.a$', '😀A', 'i', true],
  ]

  for (const propertyShape of [false, true]) {
    describe(propertyShape ? 'property shape' : 'node shape', () => {
      for (const [name, pattern, value, flags, conforms] of cases) {
        it(name, async () => {
          const { sh } = rdf.ns
          const shape = rdf.blankNode()
          const focus = rdf.namedNode('http://example.org/focus')
          const path = rdf.namedNode('http://example.org/value')
          const literal = rdf.literal(value)
          const shapes = rdf.dataset([
            rdf.quad(shape, sh.targetNode, propertyShape ? focus : literal),
            rdf.quad(shape, sh.pattern, rdf.literal(pattern)),
          ])
          if (propertyShape) {
            shapes.add(rdf.quad(shape, sh.path, path))
          }
          if (flags !== undefined) {
            shapes.add(rdf.quad(shape, sh.flags, rdf.literal(flags)))
          }
          const data = rdf.dataset([rdf.quad(focus, path, literal)])

          const report = await new SHACLValidator(shapes, { factory: rdf }).validate(data)

          assert.strictEqual(report.conforms, conforms)
          assert.strictEqual(report.results.length, conforms ? 0 : 1)
          if (!conforms) {
            assert(report.results[0].sourceConstraintComponent.equals(sh.PatternConstraintComponent))
            assert(report.results[0].value.equals(literal))
          }
        })
      }
    })
  }
})
