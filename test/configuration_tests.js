var SHACLValidator = require("../index");

var fs = require("fs");

exports.maxErrorsTest = function(test) {
    var validator = new SHACLValidator();

    var data = fs.readFileSync(__dirname + "/data/core/property/class-001.test.ttl").toString();

    validator.validate(data, "text/turtle", data, "text/turtle", function(e, report) {
        test.ok(e === null);
        test.ok(report.conforms() === false);
        test.ok(report.results().length === 2);
        validator.getConfiguration().setValidationErrorBatch(1);
        validator.validate(data, "text/turtle", data, "text/turtle", function(e, report) {
            test.ok(e === null);
            test.ok(report.conforms() === false);
            test.ok(report.results().length === 1);
            test.done();
        });
    });
};
