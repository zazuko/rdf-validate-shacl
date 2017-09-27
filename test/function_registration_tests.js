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

exports.functionRegistrationTest = function(test) {
    var validator = new SHACLValidator();

    var url = "http://example.org/ns/shapesConstraints.js";
    var localFile = __dirname + "/data/functionregistry/jsconstraintcomponent/library.js";
    var data = fs.readFileSync(__dirname + "/data/functionregistry/jsconstraintcomponent/data.ttl").toString();

    validator.registerJSLibrary(url, localFile, function(e) {
        test.ok(e == null);

        validator.validate(data, "text/turtle", data, "text/turtle", function (e, report) {
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


exports.functionCodeRegistrationTest = function(test) {
    var validator = new SHACLValidator();

    var url = "http://example.org/ns/shapesConstraints.js";
    var jsCode = fs.readFileSync(__dirname + "/data/functionregistry/jsconstraintcomponent/library.js").toString();
    var data = fs.readFileSync(__dirname + "/data/functionregistry/jsconstraintcomponent/data.ttl").toString();

    validator.registerJSCode(url, jsCode);
    validator.validate(data, "text/turtle", data, "text/turtle", function (e, report) {
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
};