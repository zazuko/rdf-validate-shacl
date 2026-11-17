import assert from 'assert'
import rdf from '@zazuko/env-node'
import SHACLValidator from '../index.js'

describe('languageIn validation', () => {
  const cases = [
    ['matches an exact language', ['en'], rdf.literal('text', 'en'), true],
    ['matches a language subtag', ['en'], rdf.literal('text', 'en-US'), true],
    ['matches several language subtags', ['zh'], rdf.literal('text', 'zh-Hant-TW'), true],
    ['matches ranges case-insensitively', ['en-US'], rdf.literal('text', 'en-us'), true],
    ['matches uppercase ranges', ['EN'], rdf.literal('text', 'en'), true],
    ['matches a subtag after a mixed-case range', ['ZH-hAnT'], rdf.literal('text', 'zh-Hant-TW'), true],
    ['rejects a partial primary subtag', ['en'], rdf.literal('text', 'eng'), false],
    ['rejects a partial subsequent subtag', ['en-U'], rdf.literal('text', 'en-US'), false],
    ['rejects a less specific language', ['en-US'], rdf.literal('text', 'en'), false],
    ['rejects a different language', ['en'], rdf.literal('text', 'de'), false],
    ['matches any non-empty language with wildcard', ['*'], rdf.literal('text', 'de'), true],
    ['matches subtags with wildcard', ['*'], rdf.literal('text', 'zh-Hant-TW'), true],
    ['matches any allowed range', ['fr', 'EN-us'], rdf.literal('text', 'en-US'), true],
    ['matches wildcard among other ranges', ['fr', '*'], rdf.literal('text', 'de'), true],
    ['rejects an empty range', [''], rdf.literal('text', 'en'), false],
    ['rejects an empty list', [], rdf.literal('text', 'en'), false],
    ['rejects an untagged string', ['*'], rdf.literal('text'), false],
    ['rejects a typed literal without a language', ['*'], rdf.literal('1', rdf.ns.xsd.integer), false],
    ['rejects an IRI', ['*'], rdf.namedNode('http://example.org/value'), false],
    ['rejects a blank node', ['*'], rdf.blankNode(), false],
  ]

  for (const propertyShape of [false, true]) {
    describe(propertyShape ? 'property shape' : 'node shape', () => {
      for (const [name, languages, value, conforms] of cases) {
        it(name, async () => {
          const { sh } = rdf.ns
          const shape = rdf.blankNode()
          const focus = rdf.namedNode('http://example.org/focus')
          const path = rdf.namedNode('http://example.org/value')
          const shapes = rdf.dataset([
            rdf.quad(shape, sh.targetNode, propertyShape ? focus : value),
          ])
          rdf.clownface({ dataset: shapes }).node(shape)
            .addList(sh.languageIn, languages.map(language => rdf.literal(language)))
          if (propertyShape) {
            shapes.add(rdf.quad(shape, sh.path, path))
          }
          const data = rdf.dataset([rdf.quad(focus, path, value)])

          const report = await new SHACLValidator(shapes, { factory: rdf }).validate(data)

          assert.strictEqual(report.conforms, conforms)
          assert.strictEqual(report.results.length, conforms ? 0 : 1)
          if (!conforms) {
            assert(report.results[0].sourceConstraintComponent.equals(sh.LanguageInConstraintComponent))
            assert(report.results[0].value.equals(value))
          }
        })
      }
    })
  }
})
