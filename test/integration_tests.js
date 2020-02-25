var assert = require("assert");
var SHACLValidator = require("../index");
var fs = require("fs");
var rdf = require("rdf-ext");
var rdfFS = require("rdf-utils-fs");
// expected result
var rdflibgraph = require("../src/rdflib-graph");
var RDFLibGraph = rdflibgraph.RDFLibGraph;


var ExpectedValidationResult = function(solution) {
    this._id = solution["report"].value;

    this._focusNode = solution["focusNode"].termType === "BlankNode" ? "_:" + solution["focusNode"].id : solution["focusNode"].value;
    this._severity = solution["severity"].value;
    this._constraint = solution["constraint"].value;
    this._shape = solution["shape"].termType === "BlankNode" ? "_:" + solution["shape"].id : solution["shape"].value;
};

ExpectedValidationResult.prototype.id = function() {
    return this._id;
}

ExpectedValidationResult.prototype.focusNode = function() {
    return this._focusNode;
};

ExpectedValidationResult.prototype.severity = function() {
    if (this._severity != null) {
        return this._severity.split("#")[1];
    }
};

ExpectedValidationResult.prototype.sourceConstraintComponent = function() {
    return this._constraint;
};

ExpectedValidationResult.prototype.sourceShape = function() {
    return this._shape
};


var ExpectedValidationReport = function(graph) {
    this.graph = graph;
};

ExpectedValidationReport.prototype.conforms = function() {
    var conforms = this.graph.query()
        .match("?report", "rdf:type", "sh:ValidationReport")
        .match("?report", "sh:conforms", "?conforms")
        .getNode("?conforms");
    return conforms != null && conforms.value === "true"
};

ExpectedValidationReport.prototype.results = function() {
    var acc = [];
    var query = this.graph.query()
        .match("?report", "sh:result", "?result")
        .match("?result", "sh:focusNode", "?focusNode")
        .match("?result", "sh:resultSeverity", "?severity")
        .match("?result", "sh:sourceConstraintComponent", "?constraint")
        .match("?result", "sh:sourceShape", "?shape");
    var solution = query.nextSolution();
    while (solution != null) {
        acc.push(new ExpectedValidationResult(solution));
        solution = query.nextSolution();
    }
    return acc;
};

var expectedResult = async function(data, mediaType) {
    var graph = new RDFLibGraph();
    graph.loadGraph("http://test.com/example", data);
    var expectedValidationReport = new ExpectedValidationReport(graph);
    expectedValidationReport.results();
    return expectedValidationReport;
};

var isBlank = function(s) {
    return s != null && (s.indexOf("_:") === 0 || s.indexOf("_g_") > -1);
}

var validateReports = async function(input) {
    var data = await rdf.dataset().import(rdfFS.fromFile(input));

    const expectedReport = await expectedResult(data);
    const report = await new SHACLValidator().validate(data, data);
    assert.equal(report.conforms(), expectedReport.conforms());
    assert.equal(report.results().length, expectedReport.results().length);
    var results = report.results() || [];
    var expectedResults = expectedReport.results();
    for (var i=0; i <results.length; i++) {
        found = false;
        for (var j=0; j<expectedResults.length; j++) {
            if (//(results[i].focusNode() ===  expectedResults[j].focusNode() ) &&
                results[i].severity() === expectedResults[j].severity() &&
                ( (isBlank(results[i].sourceShape()) && isBlank(expectedResults[j].sourceShape())) ||
                    results[i].sourceShape() === expectedResults[j].sourceShape()) &&
                results[i].sourceConstraintComponent() === expectedResults[j].sourceConstraintComponent()) {
                found = true;
            }

        }
        assert.equal(found, true);
    }
};

describe('integration tests', () => {
    fs.readdirSync(__dirname + "/data/core").forEach(function(dir) {
        fs.readdirSync(__dirname + "/data/core/" + dir).forEach(function(file) {
            it(dir + "-test-" + file, async () => validateReports(__dirname + "/data/core/" + dir + "/" + file));
        });
    });
});
