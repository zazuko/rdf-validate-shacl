var SHACLValidator = require("../index");
var rdf = require("rdf-ext");
var rdfFS = require("rdf-utils-fs");


var results = {
    "http://datashapes.org/sh/tests/functionregistry/jsconstraintcomponent/data#InvalidExample": {
        "path": "http://datashapes.org/sh/tests/functionregistry/jsconstraintcomponent/data#prop",
        "message": "Value has more than 3 characters"
    },
    "http://datashapes.org/sh/tests/functionregistry/jsconstraintcomponent/data#InvalidExampleShape": {
        "message": "Shape is constantly valid false"
    }
};

exports.loadFromMemoryModelTest = async function(test) {
    var validator = new SHACLValidator();

    var url = "http://example.org/ns/shapesConstraints.js";
    var localFile = __dirname + "/data/functionregistry/jsconstraintcomponent/library.js";
    var dataFile = __dirname + "/data/functionregistry/jsconstraintcomponent/data.ttl"

    var dataGraph = await rdf.dataset().import(rdfFS.fromFile(dataFile));
    var shapesGraph = dataGraph.clone();

    validator.registerJSLibrary(url, localFile, function(e) {
        test.ok(e == null);
        validator.validateFromModels(dataGraph, shapesGraph, function (e, report) {
            test.ok(report.conforms() === false);
            test.ok(report.results().length === 2);
            report.results().forEach(function(result) {
                var expected = results[result.focusNode()];
                test.ok(expected != null);
                test.ok(result.path() === expected.path);
                test.ok(result.message() === expected.message);
            });
            test.done();
        });
    });
};
