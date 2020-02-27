
# SHACL.js

[![Build Status](https://travis-ci.org/zazuko/shacl-js.svg?branch=master)](https://travis-ci.org/zazuko/shacl-js)

## Usage

Create a new SHACL validator and load data and shapes to trigger the validation.

The validation function returns a `ValidationReport` object that can be used
to inspect conformance and results.

```javascript
const validator = new SHACLValidator()
const report = await validator.validate(dataGraph, shapesGraph)

// Check conformance. Returns `true` or `false`.
console.log(report.conforms())

for (result of report.results()) {
  // See https://www.w3.org/TR/shacl/#results-validation-result for details
  // about each method
  console.log(result.message())
  console.log(result.path())
  console.log(result.focusNode())
  console.log(result.severity())
  console.log(result.sourceConstraintComponent())
  console.log(result.sourceShape())
}
```

## Running the tests

```
$ npm test
```

## Regenerating vocabularies and libraries

The vocabularies for SHACL and DASH are located in the `vocabularies` directory. After modifying these files, they must
be transformed into library code using the `generate-vocabularies` gulp task.
The JS libraries referenced in the DASH vocabulary can be found in the `shared` directory. They can be bundled into the
library build using the `generate-libraries` gulp command. If they are not bundled, the library will try to de-reference
them using HTTP.
