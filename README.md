# SHACL.js [![Build Status](https://travis-ci.org/TopQuadrant/shacl-js.svg?branch=master)](https://travis-ci.org/TopQuadrant/shacl-js)

## Usage

Create a new SHACL validator and load shapes and data to trigger the validation.
The validation function returns a `ValidationReport` object that can be used to inspect conformance rand results.

```javascript
var validator = new SHACLValidator();
validator.validate(data, "text/turtle", shapes, "text/turtle", function (e, report) {
    console.log("Conforms? " + report.conforms());
    if (report.conforms() === false) {
        report.results().forEach(function(result) {
            console.log(" - Severity: " + result.severity() + " for " + result.sourceConstraintComponent());
        });
    }
});
```

## Building for the web

A browser version of the library will be built in the `dist` directory using the gulp `browserify` task.

## Running the tests

Tests can be run using the `test` gulp task.

## Running the web tests

Tests can be run for the browser version running the `test-web` gulp task. This task will generate the test cases from
the node version and start a server in port 3000. The browser version of the library must have been built before running
this task.

## Regenerating vocabularies and libraries

The vocabularies for SHACL and DASH are located in the `vocabularies` directory. After modifying these files, they must
be transformed into library code using the `generate-vocabularies` gulp task.
The JS libraries referenced in the DASH vocabulary can be found in the `shared` directory. They can be bundled into the
library build using the `generate-libraries` gulp command. If they are not bundled, the library will try to de-reference
them using HTTP.
