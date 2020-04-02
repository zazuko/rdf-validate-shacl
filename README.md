
# rdf-validate-shacl

RDF/JS SHACL validator

[![Build Status](https://travis-ci.org/zazuko/rdf-validate-shacl.svg?branch=master)](https://travis-ci.org/zazuko/rdf-validate-shacl)
[![npm version](https://badge.fury.io/js/rdf-validate-shacl.svg)](https://badge.fury.io/js/rdf-validate-shacl)

## Usage

Create a new SHACL validator and load data and shapes to trigger the validation.

The validation function returns a `ValidationReport` object that can be used
to inspect conformance and results.

```javascript
const validator = new SHACLValidator(shapesDataset)
const report = await validator.validate(dataDataset)

// Check conformance: `true` or `false`
console.log(report.conforms)

for (const result of report.results) {
  // See https://www.w3.org/TR/shacl/#results-validation-result for details
  // about each method
  console.log(result.message)
  console.log(result.path)
  console.log(result.focusNode)
  console.log(result.severity)
  console.log(result.sourceConstraintComponent)
  console.log(result.sourceShape)
}
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

*rdf-validate-shacl* does not support [SPARQL-SPARQL constraints](https://www.w3.org/TR/shacl/#sparql-constraints)


## About

*rdf-validate-shacl* was originally a fork of
[shacl-js](https://github.com/TopQuadrant/shacl-js) meant to make it compatible
with [RDF/JS](https://rdf.js.org/) libraries.
Since then, we dropped support for the SHACL-JS extension and adapted the API
to suit our needs.
