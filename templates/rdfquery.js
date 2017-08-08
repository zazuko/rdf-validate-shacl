/// ADDED...
var TermFactory = require("./rdfquery/term-factory");
this["TermFactory"] = TermFactory;
///

</content>

/// ADDED...
RDFQuery.T = T;
RDFQuery.getLocalName = getLocalName;
RDFQuery.compareTerms = compareTerms;
RDFQuery.exprEquals = exprEquals;
RDFQuery.exprNotEquals = exprNotEquals;
RDFQuery.NodeSet = NodeSet;

module.exports = RDFQuery;
///