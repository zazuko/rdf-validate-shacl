import assert from 'assert'
import rdf from '@zazuko/env-node'
import SHACLValidator from '../index.js'

describe('literal comparisons', () => {
  const { sh, xsd } = rdf.ns
  const unknown = rdf.namedNode('http://example.org/Unknown')
  const cases = [
    ['lowercase after uppercase', rdf.literal('a'), rdf.literal('B'), 1],
    ['uppercase before lowercase', rdf.literal('B'), rdf.literal('a'), -1],
    ['equal strings', rdf.literal('abc'), rdf.literal('abc'), 0],
    ['string prefix', rdf.literal('a'), rdf.literal('ab'), -1],
    ['empty string', rdf.literal(''), rdf.literal('a'), -1],
    ['astral after BMP character', rdf.literal('😀'), rdf.literal('\ue000'), 1],
    ['BMP before astral character', rdf.literal('\ue000'), rdf.literal('😀'), -1],
    ['equal astral prefix', rdf.literal('😀a'), rdf.literal('😀B'), 1],
    ['unsupported durations', rdf.literal('PT12H', xsd.dayTimeDuration), rdf.literal('P1D', xsd.dayTimeDuration), null],
    ['equal unsupported literals', rdf.literal('a', unknown), rdf.literal('a', unknown), null],
    ['different unsupported literals', rdf.literal('a', unknown), rdf.literal('z', unknown), null],
    ['unsupported literal and string', rdf.literal('z', unknown), rdf.literal('a'), null],
    ['string and unsupported literal', rdf.literal('a'), rdf.literal('z', unknown), null],
    ['language-tagged literals', rdf.literal('a', 'en'), rdf.literal('z', 'en'), null],
    ['language-tagged literal and string', rdf.literal('a', 'en'), rdf.literal('z'), null],
    ['string and number', rdf.literal('1'), rdf.literal('2', xsd.integer), null],
    ['numeric promotion', rdf.literal('2', xsd.integer), rdf.literal('10.5', xsd.decimal), -1],
    ['equal numeric values', rdf.literal('2', xsd.int), rdf.literal('2.0', xsd.double), 0],
    ['booleans', rdf.literal('false', xsd.boolean), rdf.literal('true', xsd.boolean), -1],
    ['dateTime offsets', rdf.literal('2002-10-10T12:00:00Z', xsd.dateTime), rdf.literal('2002-10-10T12:00:00-05:00', xsd.dateTime), -1],
    ['dateTime timezone mismatch', rdf.literal('2002-10-10T12:00:00Z', xsd.dateTime), rdf.literal('2002-10-10T12:00:00', xsd.dateTime), null],
    ['different calendar datatypes', rdf.literal('2002-10-10', xsd.date), rdf.literal('2002-10-10T12:00:00', xsd.dateTime), null],
    ['invalid numeric lexical form', rdf.literal('2bad', xsd.integer), rdf.literal('3', xsd.integer), null],
    ['NaN', rdf.literal('NaN', xsd.double), rdf.literal('3', xsd.integer), null],
  ]
  const constraints = [
    ['minExclusive', 'MinExclusiveConstraintComponent', [1]],
    ['minInclusive', 'MinInclusiveConstraintComponent', [0, 1]],
    ['maxExclusive', 'MaxExclusiveConstraintComponent', [-1]],
    ['maxInclusive', 'MaxInclusiveConstraintComponent', [-1, 0]],
    ['lessThan', 'LessThanConstraintComponent', [-1]],
    ['lessThanOrEquals', 'LessThanOrEqualsConstraintComponent', [-1, 0]],
  ]

  for (const [constraint, component, allowedOrders] of constraints) {
    const pairConstraint = constraint === 'lessThan' || constraint === 'lessThanOrEquals'
    for (const propertyShape of pairConstraint ? [true] : [false, true]) {
      describe(`${constraint} on ${propertyShape ? 'property' : 'node'} shapes`, () => {
        for (const [name, value, reference, order] of cases) {
          it(name, async () => {
            const shape = rdf.blankNode()
            const focus = rdf.namedNode('http://example.org/focus')
            const path = rdf.namedNode('http://example.org/value')
            const referencePath = rdf.namedNode('http://example.org/reference')
            const shapes = rdf.dataset([
              rdf.quad(shape, sh.targetNode, propertyShape ? focus : value),
              rdf.quad(shape, sh[constraint], pairConstraint ? referencePath : reference),
            ])
            if (propertyShape) {
              shapes.add(rdf.quad(shape, sh.path, path))
            }
            const data = rdf.dataset([
              rdf.quad(focus, path, value),
              rdf.quad(focus, referencePath, reference),
            ])

            const report = await new SHACLValidator(shapes, { factory: rdf }).validate(data)

            const conforms = allowedOrders.includes(order)
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
