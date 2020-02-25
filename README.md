# SHACL.js [![Build Status](https://travis-ci.org/TopQuadrant/shacl-js.svg?branch=master)](https://travis-ci.org/TopQuadrant/shacl-js)

## Usage

Create a new SHACL validator and load shapes and data to trigger the validation.
The validation function returns a `ValidationReport` object that can be used to inspect conformance rand results.

```javascript
const validator = new SHACLValidator();
const report = await validator.validate(dataGraph, shapesGraph);

console.log("Conforms? " + report.conforms());

if (report.conforms() === false) {
    report.results().forEach((result) => {
        console.log(" - Severity: " + result.severity() + " for " + result.sourceConstraintComponent());
    });
}
```

## Building for the web

A browser version of the library will be built in the `dist` directory using the gulp `browserify` task.

## Running the tests

Tests can be run using the `test` gulp task.

## Regenerating vocabularies and libraries

The vocabularies for SHACL and DASH are located in the `vocabularies` directory. After modifying these files, they must
be transformed into library code using the `generate-vocabularies` gulp task.
The JS libraries referenced in the DASH vocabulary can be found in the `shared` directory. They can be bundled into the
library build using the `generate-libraries` gulp command. If they are not bundled, the library will try to de-reference
them using HTTP.
