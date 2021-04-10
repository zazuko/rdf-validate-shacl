
# rdf-validate-shacl

JavaScript SHACL validation ([RDF/JS](https://rdf.js.org/) compatible)

[![npm version](https://badge.fury.io/js/rdf-validate-shacl.svg)](https://badge.fury.io/js/rdf-validate-shacl)

## Usage

The library only handles SHACL validation and not data loading/parsing.
The following example uses [rdf-utils-fs](https://github.com/rdf-ext/rdf-utils-fs)
for this purpose. For more information about handling RDF data in JavaScript,
check out [Get started with RDF in JavaScript](https://zazuko.com/get-started/developers/).

The validation function returns a `ValidationReport` object that can be used
to inspect conformance and results. The `ValidationReport` also has a
`.dataset` property, which provides the report as RDF data.

```javascript
const fs = require('fs')
const factory = require('rdf-ext')
const ParserN3 = require('@rdfjs/parser-n3')
const SHACLValidator = require('rdf-validate-shacl')

async function loadDataset (filePath) {
  const stream = fs.createReadStream(filePath)
  const parser = new ParserN3({ factory })
  return factory.dataset().import(parser.import(stream))
}

const shapes = await loadDataset('my-shapes.ttl')
const data = await loadDataset('my-data.ttl')

const validator = new SHACLValidator(shapes, { factory })
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
console.log(report.dataset)
```

### Validator options

The `SHACLValidator` constructor accepts an optional options object as second
parameter. The available options are:
- `factory`: RDF/JS data factory (must have a `.dataset()` method)
- `maxErrors`: max number of errors after which the validation process should
  stop. By default, it only stops after all the errors are found.

## Running the tests

```
$ npm test
```

## Regenerating vocabularies

The SHACL vocabulary is imported from `@zazuko/rdf-vocabularies` and
pre-parsed in `src/vocabularies/shacl.js`.

After updating the `@zazuko/rdf-vocabularies` dependency, run
`npm run generate-vocabularies` to regenerate the pre-parsed vocabulary.


## Limitations

*rdf-validate-shacl* does not support [SHACL-SPARQL constraints](https://www.w3.org/TR/shacl/#sparql-constraints)


## About

*rdf-validate-shacl* was originally a fork of
[shacl-js](https://github.com/TopQuadrant/shacl-js) meant to make it compatible
with [RDF/JS](https://rdf.js.org/) libraries.
Since then, we dropped support for the SHACL-JS extension and adapted the API
to suit our needs.
