var assert = require("assert");
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

describe('validateFromModels', () => {
    it('takes in memory datasets', async function() {
        var validator = new SHACLValidator();

        var url = "http://example.org/ns/shapesConstraints.js";
        var localFile = __dirname + "/data/functionregistry/jsconstraintcomponent/library.js";
        var dataFile = __dirname + "/data/functionregistry/jsconstraintcomponent/data.ttl"

        var dataGraph = await rdf.dataset().import(rdfFS.fromFile(dataFile));
        var shapesGraph = dataGraph.clone();

        return new Promise((resolve, reject) => {
            validator.registerJSLibrary(url, localFile, function(e) {
                assert.equal(e, null);
                validator.validateFromModels(dataGraph, shapesGraph, function (e, report) {
                    assert.equal(e, null);
                    assert.equal(report.conforms(), false);
                    assert.equal(report.results().length, 2);
                    report.results().forEach(function(result) {
                        var expected = results[result.focusNode()];
                        assert.notEqual(expected, null);
                        assert.equal(result.path(), expected.path);
                        assert.equal(result.message(), expected.message);
                    });
                    resolve();
                });
            });
        });
    });
})
