
function serializerTerm (term) {
  if (term.termType === 'BlankNode') {
    return `blankNodes['${term.value}']`
  }

  if (term.termType === 'DefaultGraph') {
    return `factory.defaultGraph()`
  }

  if (term.termType === 'Literal') {
    if (term.language) {
      return `factory.literal(\`${term.value}\`, '${term.language}')`
    }

    return `factory.literal(\`${term.value}\`, factory.namedNode('${term.datatype.value}'))`
  }

  if (term.termType === 'NamedNode') {
    return `factory.namedNode('${term.value}')`
  }

  throw new Error(`unknown term type: ${term.termType}`)
}

function serializeQuad (quad) {
  return [
    '    factory.quad(',
    `      ${serializerTerm(quad.subject)},`,
    `      ${serializerTerm(quad.predicate)},`,
    `      ${serializerTerm(quad.object)},`,
    `      ${serializerTerm(quad.graph)}`,
    '    )'
  ].join('\n')
}

function serializeQuads (quads) {
  const blankNodes = new Set()
  for (quad of quads) {
    if (quad.subject.termType === 'BlankNode') blankNodes.add(quad.subject)
    if (quad.predicate.termType === 'BlankNode') blankNodes.add(quad.predicate)
    if (quad.object.termType === 'BlankNode') blankNodes.add(quad.object)
  }

  return [
    '/* This file was automatically generated. Do not edit by hand. */',
    '',
    'module.exports = (factory) => {',
    '  const blankNodes = {',
    [...blankNodes].map(term => `    '${term.value}': factory.blankNode()`).join(',\n'),
    '  };',
    '',
    '  return [',
    [...quads].map(quad => serializeQuad(quad)).join(',\n'),
    '  ]',
    '}',
    ''
  ].join('\n')
}

module.exports = { serializeQuads }
