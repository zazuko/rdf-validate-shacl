var assert = require("assert");
var rdf = require("rdf-ext");
var rdfFS = require("rdf-utils-fs");
var SHACLValidator = require("../index");
var fs = require("fs");

var results = {
    "http://datashapes.org/sh/tests/functionregistry/jsconstraintcomponent/data#InvalidExample": {
        "path": "http://datashapes.org/sh/tests/functionregistry/jsconstraintcomponent/data#prop",
        "message": "Value has more than 3 characters"
    },
    "http://datashapes.org/sh/tests/functionregistry/jsconstraintcomponent/data#InvalidExampleShape": {
        "message": "Shape is constantly valid false"
    }
};

describe('registerJSLibrary', () => {
    it('registers code via file path', async () => {
        var validator = new SHACLValidator();

        var url = "http://example.org/ns/shapesConstraints.js";
        var localFile = __dirname + "/data/functionregistry/jsconstraintcomponent/library.js";
        var dataFile = __dirname + "/data/functionregistry/jsconstraintcomponent/data.ttl";
        var data = await rdf.dataset().import(rdfFS.fromFile(dataFile));

        await validator.registerJSLibrary(url, localFile);
        const report = await validator.validate(data, data);
        assert.equal(report.conforms(), false);
        assert.equal(report.results().length, 2);
        report.results().forEach((result) => {
            var expected = results[result.focusNode()];
            assert.notEqual(expected, null);
            assert.equal(result.path(), expected.path);
            assert.equal(result.message(), expected.message);
        });
    });

    it('registers code with string', async () => {
        var validator = new SHACLValidator();

        var url = "http://example.org/ns/shapesConstraints.js";
        var jsCode = fs.readFileSync(__dirname + "/data/functionregistry/jsconstraintcomponent/library.js").toString();
        var dataFile = __dirname + "/data/functionregistry/jsconstraintcomponent/data.ttl";
        var data = await rdf.dataset().import(rdfFS.fromFile(dataFile));

        validator.registerJSCode(url, jsCode);
        const report = await validator.validate(data, data);
        assert.equal(report.conforms(), false);
        assert.equal(report.results().length, 2);
        report.results().forEach(function(result) {
            var expected = results[result.focusNode()];
            assert.notEqual(expected, null);
            assert.equal(result.path(), expected.path);
            assert.equal(result.message(), expected.message);
        });
    });
});

