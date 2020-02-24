var assert = require("assert");
var SHACLValidator = require("../index");
var fs = require("fs");

describe('configuration', () => {
    it('sets validationErrorBatch', async () => {
        var validator = new SHACLValidator();

        var data = fs.readFileSync(__dirname + "/data/core/property/class-001.test.ttl").toString();

        const report1 = await validator.validate(data, "text/turtle", data, "text/turtle");
        assert.equal(report1.conforms(), false);
        assert.equal(report1.results().length, 2);

        validator.getConfiguration().setValidationErrorBatch(1);
        const report2 = await validator.validate(data, "text/turtle", data, "text/turtle");
        assert.equal(report2.conforms(), false);
        assert.equal(report2.results().length, 1);
    })
})
