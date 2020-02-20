var assert = require("assert");
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
    it('registers code via file path', (done) => {
        var validator = new SHACLValidator();

        var url = "http://example.org/ns/shapesConstraints.js";
        var localFile = __dirname + "/data/functionregistry/jsconstraintcomponent/library.js";
        var data = fs.readFileSync(__dirname + "/data/functionregistry/jsconstraintcomponent/data.ttl").toString();

        validator.registerJSLibrary(url, localFile, function(e) {
            assert.equal(e, null);

            validator.validate(data, "text/turtle", data, "text/turtle", function (e, report) {
                assert.equal(e, null);
                assert.equal(report.conforms(), false);
                assert.equal(report.results().length, 2);

                report.results().forEach(function(result) {
                    var expected = results[result.focusNode()];
                    assert.notEqual(expected, null);
                    assert.equal(result.path(), expected.path);
                    assert.equal(result.message(), expected.message);
                });
                done();
            });
        });
    });

    it('registers code with string', (done) => {
        var validator = new SHACLValidator();

        var url = "http://example.org/ns/shapesConstraints.js";
        var jsCode = fs.readFileSync(__dirname + "/data/functionregistry/jsconstraintcomponent/library.js").toString();
        var data = fs.readFileSync(__dirname + "/data/functionregistry/jsconstraintcomponent/data.ttl").toString();

        validator.registerJSCode(url, jsCode);
        validator.validate(data, "text/turtle", data, "text/turtle", function (e, report) {
            assert.equal(e, null);
            assert.equal(report.conforms(), false);
            assert.equal(report.results().length, 2);
            report.results().forEach(function(result) {
                var expected = results[result.focusNode()];
                assert.notEqual(expected, null);
                assert.equal(result.path(), expected.path);
                assert.equal(result.message(), expected.message);
            });
            done();
        });
    });
});

