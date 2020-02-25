/**
 * Created by antoniogarrote on 08/05/2017.
 */

var jsonld = require("jsonld");
var ValidationReport = require("./src/validation-report");
var debug = require("debug")("index");
var error = require("debug")("index::error");
var util = require('util');

var TermFactory = require("./src/rdfquery/term-factory");
var RDFQuery = require("./src/rdfquery");
var T = RDFQuery.T;
var ShapesGraph = require("./src/shapes-graph");
var ValidationEngine = require("./src/validation-engine");
var rdflibgraph = require("./src/rdflib-graph");
var RDFLibGraph = rdflibgraph.RDFLibGraph;
var fs = require("fs");
var ValidationEngineConfiguration = require("./src/validation-engine-configuration");

/********************************/
/* Vocabularies                 */
/********************************/
var shapesGraphURI = "urn:x-shacl:shapesGraph";
var dataGraphURI = "urn:x-shacl:dataGraph";
/********************************/
/********************************/

var rdf = require("rdf-ext");

const readFile = util.promisify(fs.readFile);

// SHACL Interface
/**
 * SHACL Validator.
 * Main interface with the library
 */
var SHACLValidator = function() {
    this.$data = new RDFLibGraph();
    this.$shapes = new RDFLibGraph();
    this.depth = 0;
    this.results = null;
    this.validationEngine = null;
    this.validationError = null;
    this.sequence = null;
    this.shapesGraph = new ShapesGraph(this);
    this.configuration = new ValidationEngineConfiguration();
    this.functionsRegistry = require("./src/libraries");
};

SHACLValidator.prototype.compareNodes = function(node1, node2) {
    // TODO: Does not handle the case where nodes cannot be compared
    if (node1 && node1.termType === "Literal" && node2 && node2.termType === "Literal") {
        if ((node1.datatype != null) !== (node2.datatype != null)) {
            return null;
        } else if (node1.datatype && node2.datatype && node1.datatype.value !== node2.datatype.value) {
            return null;
        }
    }
    return RDFQuery.compareTerms(node1, node2);
};

SHACLValidator.prototype.getConfiguration = function () {
    return this.configuration;
};

SHACLValidator.prototype.nodeConformsToShape = function(focusNode, shapeNode) {
    var shape = this.shapesGraph.getShape(shapeNode);
    try {
        this.depth++;
        var foundViolations = this.validationEngine.validateNodeAgainstShape(focusNode, shape, this.$data);
        return !foundViolations;
    }
    finally {
        this.depth--;
    }
}

// Data graph and Shapes graph logic


/**
 * Reloads the shapes graph.
 * It will load SHACL and DASH shapes constraints.
 */
SHACLValidator.prototype.loadDataGraph = function(graph) {
    this.$data.clear();
    this.$data.loadGraph(dataGraphURI, graph);
};


/**
 * Validates the data graph against the shapes graph using the validation engine
 */
SHACLValidator.prototype.updateValidationEngine = function() {
    this.validationEngine = new ValidationEngine(this);
    this.validationEngine.setConfiguration(this.configuration);
    try {
        this.validationError = null;
        if (this.sequence) {
            this.sequence = [];
        }
        this.validationEngine.validateAll(this.$data);
    }
    catch (ex) {
        this.validationError = ex;
    }
};

/**
 * Checks for a validation error or results in the validation
 * engine to build the RDF graph with the validation report.
 * It returns a ValidationReport object wrapping the RDF graph
 */
SHACLValidator.prototype.showValidationResults = async function() {
    if (this.validationError) {
        error("Validation Failure: " + this.validationError);
        throw (this.validationError);
    }
    else {
        var resultGraph = rdf.dataset();
        var reportNode = TermFactory.blankNode("report");
        resultGraph.add(rdf.quad(reportNode, T("rdf:type"), T("sh:ValidationReport")));
        resultGraph.add(rdf.quad(reportNode, T("sh:conforms"), T("" + (this.validationEngine.results.length === 0))));
        var nodes = {};

        for (var i = 0; i < this.validationEngine.results.length; i++) {
            var result = this.validationEngine.results[i];
            if (nodes[result[0].toString()] == null) {
                nodes[result[0].toString()] = true;
                resultGraph.add(rdf.quad(reportNode, T("sh:result"), result[0]));
            }
            resultGraph.add(rdf.quad(result[0], result[1], result[2]));
        }

        // Unsupported bug in JSON parser bug workaround
        var oldToString = resultGraph.toString;
        resultGraph.toString = function () {
            var text = oldToString.call(resultGraph);
            text = text.replace(/^\{/, "").replace(/\}$/, "");
            return text;
        };
        //////////////////

        return jsonld.fromRDF(resultGraph.toString())
            .then((doc) => jsonld.flatten(doc))
            .then((flatDoc) => new ValidationReport(flatDoc));
    }
};

/**
 * Reloads the shapes graph.
 * It will load SHACL and DASH shapes constraints.
 */
SHACLValidator.prototype.loadShapesGraph = async function(graph) {
    this.$shapes.clear();

    this.$shapes.loadGraph(shapesGraphURI, graph);

    this.$shapes.loadGraph("http://shacl.org", this.loadVocabulary('shacl'));
    this.$shapes.loadGraph("http://datashapes.org/dash", this.loadVocabulary('dash'));
};

SHACLValidator.prototype.loadVocabulary = function(vocab) {
    const vocabFactory = require(`./src/vocabularies/${vocab}`);
    const quads = vocabFactory(rdf);
    return rdf.dataset(quads);
}


// Update validations

/**
 * Updates the data graph and validate it against the current data shapes
 */
SHACLValidator.prototype.updateDataGraph = async function(graph) {
    var startTime = new Date().getTime();
    await this.loadDataGraph(graph);

    var midTime = new Date().getTime();
    this.updateValidationEngine();

    var endTime = new Date().getTime();
    debug("Parsing took " + (midTime - startTime) + " ms. Validating the data took " + (endTime - midTime) + " ms.");

    return this.showValidationResults();
}

/**
 *  Updates the shapes graph from a memory model, and validates it against the current data graph
 */
SHACLValidator.prototype.updateShapesGraph = async function(graph) {
    var startTime = new Date().getTime();
    await this.loadShapesGraph(graph);

    var midTime = new Date().getTime();
    this.shapesGraph = new ShapesGraph(this);
    var midTime2 = new Date().getTime();

    await this.shapesGraph.loadJSLibraries();
    this.updateValidationEngine();

    var endTime = new Date().getTime();
    debug("Parsing took " + (midTime - startTime) + " ms. Preparing the shapes took " + (midTime2 - midTime)
        + " ms. Validation the data took " + (endTime - midTime2) + " ms.");

    return this.showValidationResults();
}

/**
* Validates the provided data graph against the provided shapes graph
*/
SHACLValidator.prototype.validate = async function (dataGraph, shapesGraph) {
    await this.updateDataGraph(dataGraph);
    return this.updateShapesGraph(shapesGraph);
};

/**
 * Saves a cached version of a remote JS file used during validation
 * @param url URL of the library to cache
 * @param localFile path to a local version of the file identified by url
 */
SHACLValidator.prototype.registerJSLibrary = async function(url, localFile) {
    const buffer = await readFile(localFile);
    this.functionsRegistry[url] = buffer.toString();
};

/**
 * Saves a some JS library code using the provided URL that can be used during validation
 * @param url URL of the library to register
 * @param libraryCode JS code for the library being registered
  */
SHACLValidator.prototype.registerJSCode = function(url, jsCode){
    this.functionsRegistry[url] =  jsCode;
};

// Expose the RDF interface
// TODO: Check $rdf was exposed on the validator. Do we need that?
// SHACLValidator.$rdf = $rdf;

module.exports = SHACLValidator;
