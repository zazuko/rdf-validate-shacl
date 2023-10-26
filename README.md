
# rdf-validate-shacl

Validate RDF data purely in JavaScript. An implementation of the [W3C SHACL](https://www.w3.org/TR/shacl/)
specification on top of the [RDFJS](https://rdf.js.org/) stack.

[![npm version](https://badge.fury.io/js/rdf-validate-shacl.svg)](https://badge.fury.io/js/rdf-validate-shacl)

We provide a [SHACL playground](https://zazuko.github.io/shacl-playground/) based on this library.

## Usage

The library only handles SHACL validation and not data loading/parsing.
The following example uses [rdf-utils-fs](https://github.com/rdf-ext/rdf-utils-fs)
for this purpose. For more information about handling RDF data in JavaScript,
check out [Get started with RDF in JavaScript](https://zazuko.com/get-started/developers/).

The validation function returns a `ValidationReport` object that can be used
to inspect conformance and results. The `ValidationReport` also has a
`.dataset` property, which provides the report as RDF data.

```javascript
import rdf from '@zazuko/env-node'
import SHACLValidator from 'rdf-validate-shacl'

async function main() {
  const shapes = await rdf.dataset().import(rdf.fromFile('my-shapes.ttl'))
  const data = await rdf.dataset().import(rdf.fromFile('my-data.ttl'))

  const validator = new SHACLValidator(shapes, { factory: rdf })
  const report = await validator.validate(data)

  // Check conformance: `true` or `false`
  console.log(report.conforms)

  for (const result of report.results) {
    // See https://www.w3.org/TR/shacl/#results-validation-result for details
    // about each property
    console.log(result.message)
    console.log(result.path)
    console.log(result.focusNode)
    console.log(result.severity)
    console.log(result.sourceConstraintComponent)
    console.log(result.sourceShape)
  }

  // Validation report as RDF dataset
  console.log(await report.dataset.serialize({ format: 'text/n3' }))
}

main();
```

### Validator options

The `SHACLValidator` constructor accepts an optional options object as second
parameter. The available options are:
- `factory`: RDF/JS data factory (must have a `.dataset()` method)
- `maxErrors`: max number of errors after which the validation process should
  stop. By default, it only stops after all the errors are found.
- `allowNamedNodeInList`: SHACL only allows blank nodes in property lists. To
  allow named nodes to occur in property lists, set this value to `true`.

## Running the tests

```
$ npm test
```

## Limitations

*rdf-validate-shacl* does not support [SHACL-SPARQL constraints](https://www.w3.org/TR/shacl/#sparql-constraints)


## About

*rdf-validate-shacl* was originally a fork of
[shacl-js](https://github.com/TopQuadrant/shacl-js) meant to make it compatible
with [RDF/JS](https://rdf.js.org/) libraries.
Since then, we dropped support for the SHACL-JS extension and adapted the API
to suit our needs.
