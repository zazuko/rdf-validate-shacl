var $rdf = require("rdflib");
var RDFQuery = require("./rdfquery");
var T = RDFQuery.T;
var rdf = require("rdf-ext");
var stringToDataset = require("./dataset-utils").stringToDataset;

var errorHandler = function(e){
    require("debug")("rdflib-graph::error")(e);
    throw(e);
};

// Monkey Patching rdflib, Literals, BlankNodes and NamedNodes
var exLiteral = $rdf.literal("a", "de");
Object.defineProperty(Object.getPrototypeOf(exLiteral), "lex", { get: function () { return this.value } });
Object.getPrototypeOf(exLiteral).isBlankNode = function () { return false };
Object.getPrototypeOf(exLiteral).isLiteral = function () { return true };
Object.getPrototypeOf(exLiteral).isURI = function () { return false };

var exBlankNode = $rdf.blankNode();
Object.getPrototypeOf(exBlankNode).isBlankNode = function () { return true };
Object.getPrototypeOf(exBlankNode).isLiteral = function () { return false };
Object.getPrototypeOf(exBlankNode).isURI = function () { return false };

var exNamedNode = $rdf.namedNode("urn:x-dummy");
Object.getPrototypeOf(exNamedNode).isBlankNode = function () { return false };
Object.getPrototypeOf(exNamedNode).isLiteral = function () { return false };
Object.getPrototypeOf(exNamedNode).isURI = function () { return true };


/**
 * Creates a ne RDFLibGraph wrapping a provided $rdf.graph or creating
 * a new one if no graph is provided
 * @param store rdflib graph object
 * @constructor
 */
var RDFLibGraph = function (store) {
    if (store != null) {
        this.store = store;
    } else {
        this.store = rdf.dataset();
    }
};

RDFLibGraph.prototype.find = function (s, p, o) {
    return new RDFLibGraphIterator(this.store, s, p, o);
};

RDFLibGraph.prototype.query = function () {
    return RDFQuery(this);
};

RDFLibGraph.prototype.loadMemoryGraph = function(graphURI, rdfModel, andThen) {
    postProcessGraph(this.store, graphURI, rdfModel)
    andThen();
};

RDFLibGraph.prototype.loadGraph = function(str, graphURI, mimeType, andThen, handleError) {
    stringToDataset(mimeType, str).then((newStore) => {
        postProcessGraph(this.store, graphURI, newStore);
        andThen();
    }).catch(handleError)
};

RDFLibGraph.prototype.clear = function() {
    this.store = rdf.dataset();
};



var RDFLibGraphIterator = function (store, s, p, o) {
    this.index = 0;
    // TODO: Could probably make a lazy iterator since Dataset is already an iterator
    this.ss = store.match(s, p, o).toArray();
};

RDFLibGraphIterator.prototype.close = function () {
    // Do nothing
};

RDFLibGraphIterator.prototype.next = function () {
    if (this.index >= this.ss.length) {
        return null;
    }
    else {
        return this.ss[this.index++];
    }
};

function ensureBlankId(component) {
    if (component.termType === "BlankNode") {
        if (typeof(component.value) !== "string") {
            component.value = "_:" + component.id;
        }
        return component;
    }

    return component
}

function postProcessGraph(store, graphURI, newStore) {

    var ss = newStore.match(undefined, undefined, undefined);
    for (quad of ss) {
        var object = quad.object;
        ensureBlankId(quad.subject);
        ensureBlankId(quad.predicate);
        ensureBlankId(quad.object);
        if (T("xsd:boolean").equals(object.datatype)) {
            if ("0" === object.value || "false" === object.value) {
                store.add(rdf.quad(quad.subject, quad.predicate, T("false"), graphURI));
            }
            else if ("1" === object.value || "true" === object.value) {
                store.add(rdf.quad(quad.subject, quad.predicate, T("true"), graphURI));
            } else {
                store.add(rdf.quad(quad.subject, quad.predicate, object, graphURI));
            }
        }
        else if (object.termType === 'collection') {
            var items = object.elements;
            store.add(rdf.quad(quad.subject, quad.predicate, createRDFListNode(store, items, 0)));
        }
        else {
            store.add(rdf.quad(quad.subject, quad.predicate, quad.object, graphURI));
        }
    }

    for (var prefix in newStore.namespaces) {
        var ns = newStore.namespaces[prefix];
        store.namespaces[prefix] = ns;
    }
}

module.exports.RDFLibGraph = RDFLibGraph;
module.exports.RDFLibGraphIterator = RDFLibGraphIterator;
