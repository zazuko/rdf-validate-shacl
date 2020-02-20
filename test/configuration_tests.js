var assert = require("assert");
var SHACLValidator = require("../index");
var fs = require("fs");

describe('configuration', () => {
    it('sets validationErrorBatch', (done) => {
        var validator = new SHACLValidator();

        var data = fs.readFileSync(__dirname + "/data/core/property/class-001.test.ttl").toString();

        validator.validate(data, "text/turtle", data, "text/turtle", function(e, report) {
            assert.equal(e, null);
            assert.equal(report.conforms(), false);
            assert.equal(report.results().length, 2);

            validator.getConfiguration().setValidationErrorBatch(1);
            validator.validate(data, "text/turtle", data, "text/turtle", function(e, report) {
                assert.equal(e, null);
                assert.equal(report.conforms(), false);
                assert.equal(report.results().length, 1);
                done();
            });
        });
    })
})
