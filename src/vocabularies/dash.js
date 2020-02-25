/* This file was automatically generated. Do not edit by hand. */

module.exports = (factory) => {
  const blankNodes = {
    'b0': factory.blankNode(),
    'b1': factory.blankNode(),
    'b2': factory.blankNode(),
    'b3': factory.blankNode(),
    'b4': factory.blankNode(),
    'b5': factory.blankNode(),
    'b6': factory.blankNode(),
    'b7': factory.blankNode(),
    'b8': factory.blankNode(),
    'b9': factory.blankNode(),
    'b10': factory.blankNode(),
    'b11': factory.blankNode(),
    'b12': factory.blankNode(),
    'b13': factory.blankNode(),
    'b14': factory.blankNode(),
    'b15': factory.blankNode(),
    'b16': factory.blankNode(),
    'b17': factory.blankNode(),
    'b18': factory.blankNode(),
    'b19': factory.blankNode(),
    'b20': factory.blankNode(),
    'b21': factory.blankNode(),
    'b22': factory.blankNode(),
    'b23': factory.blankNode(),
    'b24': factory.blankNode(),
    'b25': factory.blankNode(),
    'b26': factory.blankNode(),
    'b27': factory.blankNode(),
    'b28': factory.blankNode(),
    'b29': factory.blankNode(),
    'b30': factory.blankNode(),
    'b31': factory.blankNode(),
    'b33': factory.blankNode(),
    'b32': factory.blankNode(),
    'b35': factory.blankNode(),
    'b34': factory.blankNode(),
    'b36': factory.blankNode(),
    'b37': factory.blankNode(),
    'b38': factory.blankNode(),
    'b39': factory.blankNode(),
    'b40': factory.blankNode(),
    'b41': factory.blankNode(),
    'b42': factory.blankNode(),
    'b43': factory.blankNode(),
    'b44': factory.blankNode(),
    'b45': factory.blankNode(),
    'b46': factory.blankNode(),
    'b47': factory.blankNode(),
    'b48': factory.blankNode(),
    'b49': factory.blankNode(),
    'b50': factory.blankNode(),
    'b51': factory.blankNode(),
    'b52': factory.blankNode(),
    'b53': factory.blankNode(),
    'b54': factory.blankNode(),
    'b55': factory.blankNode(),
    'b56': factory.blankNode(),
    'b57': factory.blankNode(),
    'b58': factory.blankNode(),
    'b59': factory.blankNode(),
    'b60': factory.blankNode(),
    'b61': factory.blankNode(),
    'b62': factory.blankNode(),
    'b63': factory.blankNode(),
    'b64': factory.blankNode(),
    'b65': factory.blankNode(),
    'b66': factory.blankNode(),
    'b67': factory.blankNode(),
    'b68': factory.blankNode(),
    'b69': factory.blankNode(),
    'b70': factory.blankNode(),
    'b71': factory.blankNode(),
    'b72': factory.blankNode(),
    'b73': factory.blankNode(),
    'b74': factory.blankNode(),
    'b75': factory.blankNode(),
    'b76': factory.blankNode(),
    'b77': factory.blankNode(),
    'b78': factory.blankNode(),
    'b79': factory.blankNode(),
    'b80': factory.blankNode(),
    'b81': factory.blankNode(),
    'b82': factory.blankNode(),
    'b83': factory.blankNode(),
    'b84': factory.blankNode(),
    'b85': factory.blankNode(),
    'b86': factory.blankNode(),
    'b87': factory.blankNode(),
    'b88': factory.blankNode(),
    'b89': factory.blankNode(),
    'b90': factory.blankNode(),
    'b91': factory.blankNode(),
    'b92': factory.blankNode(),
    'b93': factory.blankNode(),
    'b94': factory.blankNode(),
    'b95': factory.blankNode(),
    'b96': factory.blankNode(),
    'b97': factory.blankNode(),
    'b98': factory.blankNode()
  };

  return [
    factory.quad(
      factory.namedNode('http://datashapes.org/dash'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2002/07/owl#Ontology'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`DASH defines SPARQL-based validators for many SHACL Core constraint components. These are (among others) utilized by TopBraid and its API. Note that constraint components that require validation of nested shapes (such as sh:node) are not implementable without a function such as tosh:hasShape.

DASH is also a SHACL library for frequently needed features and design patterns. All features in this library are 100% standards compliant and will work on any engine that fully supports SHACL.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`DASH Data Shapes Library`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash'),
      factory.namedNode('http://www.w3.org/2002/07/owl#imports'),
      factory.namedNode('http://www.w3.org/ns/shacl#'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b0'],
      factory.namedNode('http://www.w3.org/ns/shacl#namespace'),
      factory.literal(`http://datashapes.org/dash#`, factory.namedNode('http://www.w3.org/2001/XMLSchema#anyURI')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b0'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefix'),
      factory.literal(`dash`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash'),
      factory.namedNode('http://www.w3.org/ns/shacl#declare'),
      blankNodes['b0'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b1'],
      factory.namedNode('http://www.w3.org/ns/shacl#namespace'),
      factory.literal(`http://purl.org/dc/terms/`, factory.namedNode('http://www.w3.org/2001/XMLSchema#anyURI')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b1'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefix'),
      factory.literal(`dcterms`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash'),
      factory.namedNode('http://www.w3.org/ns/shacl#declare'),
      blankNodes['b1'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b2'],
      factory.namedNode('http://www.w3.org/ns/shacl#namespace'),
      factory.literal(`http://www.w3.org/1999/02/22-rdf-syntax-ns#`, factory.namedNode('http://www.w3.org/2001/XMLSchema#anyURI')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b2'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefix'),
      factory.literal(`rdf`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash'),
      factory.namedNode('http://www.w3.org/ns/shacl#declare'),
      blankNodes['b2'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b3'],
      factory.namedNode('http://www.w3.org/ns/shacl#namespace'),
      factory.literal(`http://www.w3.org/2000/01/rdf-schema#`, factory.namedNode('http://www.w3.org/2001/XMLSchema#anyURI')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b3'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefix'),
      factory.literal(`rdfs`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash'),
      factory.namedNode('http://www.w3.org/ns/shacl#declare'),
      blankNodes['b3'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b4'],
      factory.namedNode('http://www.w3.org/ns/shacl#namespace'),
      factory.literal(`http://www.w3.org/2001/XMLSchema#`, factory.namedNode('http://www.w3.org/2001/XMLSchema#anyURI')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b4'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefix'),
      factory.literal(`xsd`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash'),
      factory.namedNode('http://www.w3.org/ns/shacl#declare'),
      blankNodes['b4'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b5'],
      factory.namedNode('http://www.w3.org/ns/shacl#namespace'),
      factory.literal(`http://www.w3.org/2002/07/owl#`, factory.namedNode('http://www.w3.org/2001/XMLSchema#anyURI')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b5'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefix'),
      factory.literal(`owl`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash'),
      factory.namedNode('http://www.w3.org/ns/shacl#declare'),
      blankNodes['b5'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b6'],
      factory.namedNode('http://www.w3.org/ns/shacl#namespace'),
      factory.literal(`http://www.w3.org/2004/02/skos/core#`, factory.namedNode('http://www.w3.org/2001/XMLSchema#anyURI')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b6'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefix'),
      factory.literal(`skos`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash'),
      factory.namedNode('http://www.w3.org/ns/shacl#declare'),
      blankNodes['b6'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllObjects'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://datashapes.org/dash#AllObjectsTarget'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllObjects'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A reusable instance of dash:AllObjectsTarget.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllObjects'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`All objects`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllObjectsTarget'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSTargetType'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllObjectsTarget'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLTargetType'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllObjectsTarget'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A target containing all objects in the data graph as focus nodes.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllObjectsTarget'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`All objects target`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllObjectsTarget'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://www.w3.org/ns/shacl#Target'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllObjectsTarget'),
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`dash_allObjects`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllObjectsTarget'),
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllObjectsTarget'),
      factory.namedNode('http://www.w3.org/ns/shacl#labelTemplate'),
      factory.literal(`All objects`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllObjectsTarget'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllObjectsTarget'),
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.literal(`SELECT DISTINCT ?this
WHERE {
    ?anyS ?anyP ?this .
}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllSubjects'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://datashapes.org/dash#AllSubjectsTarget'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllSubjects'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A reusable instance of dash:AllSubjectsTarget.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllSubjects'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`All subjects`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllSubjectsTarget'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSTargetType'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllSubjectsTarget'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLTargetType'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllSubjectsTarget'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A target containing all subjects in the data graph as focus nodes.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllSubjectsTarget'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`All subjects target`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllSubjectsTarget'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://www.w3.org/ns/shacl#Target'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllSubjectsTarget'),
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`dash_allSubjects`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllSubjectsTarget'),
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllSubjectsTarget'),
      factory.namedNode('http://www.w3.org/ns/shacl#labelTemplate'),
      factory.literal(`All subjects`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllSubjectsTarget'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#AllSubjectsTarget'),
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.literal(`SELECT DISTINCT ?this
WHERE {
    ?this ?anyP ?anyO .
}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ClosedByTypesConstraintComponent'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#ConstraintComponent'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ClosedByTypesConstraintComponent'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A constraint component that can be used to declare that focus nodes are "closed" based on their rdf:types, meaning that focus nodes may only have values for the properties that are explicitly enumerated via sh:property/sh:path in property constraints at their rdf:types and the superclasses of those. This assumes that the type classes are also shapes.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ClosedByTypesConstraintComponent'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Closed by types constraint component`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b7'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b7'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateClosedByTypesNode`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b7'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b7'],
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Property is not among those permitted for any of the types`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ClosedByTypesConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#nodeValidator'),
      blankNodes['b7'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b8'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLSelectValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b8'],
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Property {?path} is not among those permitted for any of the types`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b8'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b8'],
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.literal(`SELECT $this (?predicate AS ?path) ?value
WHERE {
	FILTER ($closedByTypes) .
    $this ?predicate ?value .
	FILTER (?predicate != rdf:type) .
	FILTER NOT EXISTS {
		$this rdf:type ?type .
		?type rdfs:subClassOf* ?class .
		GRAPH $shapesGraph {
			?class sh:property/sh:path ?predicate .
		}
	}
}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ClosedByTypesConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#nodeValidator'),
      blankNodes['b8'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ClosedByTypesConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#parameter'),
      factory.namedNode('http://datashapes.org/dash#ClosedByTypesConstraintComponent-closedByTypes'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ClosedByTypesConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#NodeShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ClosedByTypesConstraintComponent-closedByTypes'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#Parameter'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ClosedByTypesConstraintComponent-closedByTypes'),
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#closedByTypes'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ClosedByTypesConstraintComponent-closedByTypes'),
      factory.namedNode('http://www.w3.org/ns/shacl#datatype'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ClosedByTypesConstraintComponent-closedByTypes'),
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`True to indicate that the focus nodes are closed by their types. A constraint violation is reported for each property value of the focus node where the property is not among those that are explicitly declared via sh:property/sh:path in any of the rdf:types of the focus node (and their superclasses). The property rdf:type is always permitted.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#CoExistsWithConstraintComponent'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#ConstraintComponent'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#CoExistsWithConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#CoExistsWithConstraintComponent'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A constraint component that can be used to express a constraint on property shapes so that if the property path has any value then the given property must also have a value, and vice versa.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#CoExistsWithConstraintComponent'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Co-exists-with constraint component`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#CoExistsWithConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Values must co-exist with values of {$coExistsWith}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#CoExistsWithConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#parameter'),
      factory.namedNode('http://datashapes.org/dash#CoExistsWithConstraintComponent-coExistsWith'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b9'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b9'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateCoExistsWith`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b9'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#CoExistsWithConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b9'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b10'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLSelectValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b10'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b10'],
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.literal(`SELECT $this
WHERE {
	{
    	FILTER (EXISTS { $this $PATH ?any } && NOT EXISTS { $this $coExistsWith ?any })
	}
	UNION
	{
    	FILTER (NOT EXISTS { $this $PATH ?any } && EXISTS { $this $coExistsWith ?any })
	}
}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#CoExistsWithConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b10'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#CoExistsWithConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#PropertyShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#CoExistsWithConstraintComponent-coExistsWith'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#Parameter'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#CoExistsWithConstraintComponent-coExistsWith'),
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#coExistsWith'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#CoExistsWithConstraintComponent-coExistsWith'),
      factory.namedNode('http://www.w3.org/ns/shacl#class'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#CoExistsWithConstraintComponent-coExistsWith'),
      factory.namedNode('http://www.w3.org/ns/shacl#nodeKind'),
      factory.namedNode('http://www.w3.org/ns/shacl#IRI'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`DASH JavaScript library`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#RDFQueryJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibraryURL'),
      factory.literal(`http://datashapes.org/js/dash.js`, factory.namedNode('http://www.w3.org/2001/XMLSchema#anyURI')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#DateOrDateTime'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#List'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#DateOrDateTime'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#first'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#date'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b11'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#first'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#dateTime'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b11'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#rest'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#nil'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#DateOrDateTime'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#rest'),
      blankNodes['b11'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#DateOrDateTime'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`An rdf:List that can be used in property constraints as value for sh:or to indicate that all values of a property must be either xsd:date or xsd:dateTime.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#DateOrDateTime'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Date or date time`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#DefaultValueTypeRule'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLConstructExecutable'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#DefaultValueTypeRule'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`
		A resource encapsulating a query that can be used to construct rdf:type triples for certain untyped nodes
		that are an object in a triple where the predicate has a sh:defaultValueType.
		This can be used as a pre-processor for shape graphs before they are validated.
		`, factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#DefaultValueTypeRule'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`default value type inference rule`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#DefaultValueTypeRule'),
      factory.namedNode('http://www.w3.org/ns/shacl#construct'),
      factory.literal(`
		CONSTRUCT {
			?node a ?defaultValueType .
		}
		WHERE {
			?predicate sh:defaultValueType ?defaultValueType .
			?anySubject ?predicate ?node .
			FILTER (NOT EXISTS { ?node a ?anyType }) .
		}
		`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#FailureResult'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#FailureResult'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A result representing a validation failure such as an unsupported recursion.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#FailureResult'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Failure result`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#FailureResult'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://www.w3.org/ns/shacl#AbstractResult'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#FailureTestCaseResult'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#FailureTestCaseResult'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Represents a failure of a test case.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#FailureTestCaseResult'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Failure test case result`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#FailureTestCaseResult'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://datashapes.org/dash#TestCaseResult'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#FunctionTestCase'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#FunctionTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A test case that verifies that a given SPARQL expression produces a given, expected result.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#FunctionTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Function test case`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#FunctionTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://datashapes.org/dash#TestCase'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b12'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#expectedResult'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b12'],
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`The expected result of a function call.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b12'],
      factory.namedNode('http://www.w3.org/ns/shacl#maxCount'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b12'],
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`expected result`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#FunctionTestCase'),
      factory.namedNode('http://www.w3.org/ns/shacl#property'),
      blankNodes['b12'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b13'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#expression'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b13'],
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`A valid SPARQL expression calling the function to test.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b13'],
      factory.namedNode('http://www.w3.org/ns/shacl#maxCount'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b13'],
      factory.namedNode('http://www.w3.org/ns/shacl#minCount'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b13'],
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`expression`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#FunctionTestCase'),
      factory.namedNode('http://www.w3.org/ns/shacl#property'),
      blankNodes['b13'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#GraphUpdate'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#GraphUpdate'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Graph update`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#GraphUpdate'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://datashapes.org/dash#Suggestion'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#GraphValidationTestCase'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#GraphValidationTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A test case that performs SHACL constraint validation on the whole graph and compares the results with the expected validation results stored with the test case. By default this excludes meta-validation (i.e. the validation of the shape definitions themselves). If that's desired, set dash:validateShapes to true.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#GraphValidationTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Graph validation test case`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#GraphValidationTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://datashapes.org/dash#ValidationTestCase'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#HasValueWithClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#ConstraintComponent'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#HasValueWithClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A constraint component that can be used to express a constraint on property shapes so that one of the values of the property path must be an instance of a given class.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#HasValueWithClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Has value with class constraint component`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#HasValueWithClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`At least one of the values must have class {$hasValueWithClass}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#HasValueWithClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#parameter'),
      factory.namedNode('http://datashapes.org/dash#HasValueWithClassConstraintComponent-hasValueWithClass'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b14'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b14'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateHasValueWithClass`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b14'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#HasValueWithClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b14'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b15'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLSelectValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b15'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b15'],
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.literal(`SELECT $this
WHERE {
	FILTER NOT EXISTS {
    	$this $PATH ?value .
		?value a ?type .
		?type rdfs:subClassOf* ?hasValueWithClass .
	}
}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#HasValueWithClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b15'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#HasValueWithClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#PropertyShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#HasValueWithClassConstraintComponent-hasValueWithClass'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#Parameter'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#HasValueWithClassConstraintComponent-hasValueWithClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#hasValueWithClass'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#HasValueWithClassConstraintComponent-hasValueWithClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#class'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#HasValueWithClassConstraintComponent-hasValueWithClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#nodeKind'),
      factory.namedNode('http://www.w3.org/ns/shacl#IRI'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#InferencingTestCase'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#InferencingTestCase'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#NodeShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#InferencingTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A test case to verify whether an inferencing engine is producing identical results to those stored as expected results.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#InferencingTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Inferencing test case`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#InferencingTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://datashapes.org/dash#TestCase'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b16'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#expectedResult'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b16'],
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`The expected inferred triples, represented by instances of rdfs:Statement.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b16'],
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`expected result`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#InferencingTestCase'),
      factory.namedNode('http://www.w3.org/ns/shacl#property'),
      blankNodes['b16'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#JSTestCase'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#JSTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A test case that calls a given JavaScript function like a sh:JSFunction and compares its result with the dash:expectedResult.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#JSTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`JavaScript test case`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#JSTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://datashapes.org/dash#TestCase'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#JSTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSFunction'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b17'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#expectedResult'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b17'],
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`The expected result of the JavaScript function call, as an RDF node.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b17'],
      factory.namedNode('http://www.w3.org/ns/shacl#maxCount'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b17'],
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`expected result`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#JSTestCase'),
      factory.namedNode('http://www.w3.org/ns/shacl#property'),
      blankNodes['b17'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ListNodeShape'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#NodeShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ListNodeShape'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Defines constraints on what it means for a node to be a node within a well-formed RDF list. Note that this does not check whether the rdf:rest items are also well-formed lists as this would lead to unsupported recursion.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ListNodeShape'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`List node shape`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b18'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#first'),
      blankNodes['b19'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b19'],
      factory.namedNode('http://www.w3.org/ns/shacl#hasValue'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#nil'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b20'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#first'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b20'],
      factory.namedNode('http://www.w3.org/ns/shacl#maxCount'),
      factory.literal(`0`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b19'],
      factory.namedNode('http://www.w3.org/ns/shacl#property'),
      blankNodes['b20'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b21'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#rest'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b21'],
      factory.namedNode('http://www.w3.org/ns/shacl#maxCount'),
      factory.literal(`0`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b19'],
      factory.namedNode('http://www.w3.org/ns/shacl#property'),
      blankNodes['b21'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b18'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#rest'),
      blankNodes['b22'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b22'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#first'),
      blankNodes['b23'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b24'],
      factory.namedNode('http://www.w3.org/ns/shacl#hasValue'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#nil'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b23'],
      factory.namedNode('http://www.w3.org/ns/shacl#not'),
      blankNodes['b24'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b25'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#first'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b25'],
      factory.namedNode('http://www.w3.org/ns/shacl#maxCount'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b25'],
      factory.namedNode('http://www.w3.org/ns/shacl#minCount'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b23'],
      factory.namedNode('http://www.w3.org/ns/shacl#property'),
      blankNodes['b25'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b26'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#rest'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b26'],
      factory.namedNode('http://www.w3.org/ns/shacl#maxCount'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b26'],
      factory.namedNode('http://www.w3.org/ns/shacl#minCount'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b23'],
      factory.namedNode('http://www.w3.org/ns/shacl#property'),
      blankNodes['b26'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b22'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#rest'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#nil'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ListNodeShape'),
      factory.namedNode('http://www.w3.org/ns/shacl#or'),
      blankNodes['b18'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ListShape'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#NodeShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ListShape'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Defines constraints on what it means for a node to be a well-formed RDF list.

The focus node must either be rdf:nil or not recursive. Furthermore, this shape uses dash:ListNodeShape as a "helper" to walk through all members of the whole list (including itself).`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ListShape'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`List shape`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b27'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#first'),
      blankNodes['b28'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b28'],
      factory.namedNode('http://www.w3.org/ns/shacl#hasValue'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#nil'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b27'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#rest'),
      blankNodes['b29'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b29'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#first'),
      blankNodes['b30'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b31'],
      factory.namedNode('http://www.w3.org/ns/shacl#hasValue'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#nil'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b30'],
      factory.namedNode('http://www.w3.org/ns/shacl#not'),
      blankNodes['b31'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b33'],
      factory.namedNode('http://www.w3.org/ns/shacl#oneOrMorePath'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#rest'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b32'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      blankNodes['b33'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b32'],
      factory.namedNode('http://datashapes.org/dash#nonRecursive'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b30'],
      factory.namedNode('http://www.w3.org/ns/shacl#property'),
      blankNodes['b32'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b29'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#rest'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#nil'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ListShape'),
      factory.namedNode('http://www.w3.org/ns/shacl#or'),
      blankNodes['b27'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b35'],
      factory.namedNode('http://www.w3.org/ns/shacl#zeroOrMorePath'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#rest'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b34'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      blankNodes['b35'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b34'],
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Each list member (including this node) must be have the shape dash:ListNodeShape.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b34'],
      factory.namedNode('http://www.w3.org/ns/shacl#node'),
      factory.namedNode('http://datashapes.org/dash#ListNodeShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ListShape'),
      factory.namedNode('http://www.w3.org/ns/shacl#property'),
      blankNodes['b34'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#NonRecursiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#ConstraintComponent'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#NonRecursiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Used to state that a property or path must not point back to itself.

For example, "a person cannot have itself as parent" can be expressed by setting dash:nonRecursive=true for a given sh:path.

To express that a person cannot have itself among any of its (recursive) parents, use a sh:path with the + operator such as ex:parent+.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#NonRecursiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Non-recursive constraint component`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#NonRecursiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Points back at itself (recursively)`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#NonRecursiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#parameter'),
      factory.namedNode('http://datashapes.org/dash#NonRecursiveConstraintComponent-nonRecursive'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b36'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b36'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateNonRecursiveProperty`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b36'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#NonRecursiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b36'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b37'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLSelectValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b37'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b37'],
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.literal(`SELECT DISTINCT $this ($this AS ?value)
WHERE {
	{
		FILTER (?nonRecursive)
	}
    $this $PATH $this .
}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#NonRecursiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b37'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#NonRecursiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#PropertyShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#NonRecursiveConstraintComponent-nonRecursive'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#Parameter'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#NonRecursiveConstraintComponent-nonRecursive'),
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#nonRecursive'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#NonRecursiveConstraintComponent-nonRecursive'),
      factory.namedNode('http://www.w3.org/ns/shacl#datatype'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#NonRecursiveConstraintComponent-nonRecursive'),
      factory.namedNode('http://www.w3.org/ns/shacl#maxCount'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#NonRecursiveConstraintComponent-nonRecursive'),
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`non-recursive`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#None'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#NodeShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#None'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A Shape that is no node can conform to.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#None'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`None`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#None'),
      factory.namedNode('http://www.w3.org/ns/shacl#in'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#nil'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ParameterConstraintComponent'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#ConstraintComponent'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ParameterConstraintComponent'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A constraint component that can be used to verify that all value nodes conform to the given Parameter.`, 'en'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ParameterConstraintComponent'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Parameter constraint component`, 'en'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ParameterConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#parameter'),
      factory.namedNode('http://datashapes.org/dash#ParameterConstraintComponent-parameter'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ParameterConstraintComponent-parameter'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#Parameter'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ParameterConstraintComponent-parameter'),
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://www.w3.org/ns/shacl#parameter'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#PrimaryKeyConstraintComponent'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#ConstraintComponent'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#PrimaryKeyConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#PrimaryKeyConstraintComponent'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Enforces a constraint that the given property (sh:path) serves as primary key for all resources in the target of the shape. If a property has been declared to be the primary key then each resource must have exactly one value for that property. Furthermore, the URIs of those resources must start with a given string (dash:uriStart), followed by the URL-encoded primary key value. For example if dash:uriStart is "http://example.org/country-" and the primary key for an instance is "de" then the URI must be "http://example.org/country-de". Finally, as a result of the URI policy, there can not be any other resource with the same value under the same primary key policy.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#PrimaryKeyConstraintComponent'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Primary key constraint component`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#PrimaryKeyConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#labelTemplate'),
      factory.literal(`The property {?predicate} is the primary key and URIs start with {?uriStart}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#PrimaryKeyConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Violation of primary key constraint`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#PrimaryKeyConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#parameter'),
      factory.namedNode('http://datashapes.org/dash#PrimaryKeyConstraintComponent-uriStart'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b38'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b38'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validatePrimaryKeyProperty`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b38'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#PrimaryKeyConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b38'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b39'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLSelectValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b39'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b39'],
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.literal(`SELECT DISTINCT $this
WHERE {
        FILTER (
			# Must have a value for the primary key
			NOT EXISTS { ?this $PATH ?any }
			||
			# Must have no more than one value for the primary key
			EXISTS {
				?this $PATH ?value1 .
				?this $PATH ?value2 .
				FILTER (?value1 != ?value2) .
			}
			||
			# The value of the primary key must align with the derived URI
			EXISTS {
				{
        			?this $PATH ?value .
					FILTER NOT EXISTS { ?this $PATH ?value2 . FILTER (?value != ?value2) }
				}
        		BIND (CONCAT($uriStart, ENCODE_FOR_URI(str(?value))) AS ?uri) .
        		FILTER (str(?this) != ?uri) .
    		}
		)
}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#PrimaryKeyConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b39'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#PrimaryKeyConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#PropertyShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#PrimaryKeyConstraintComponent-uriStart'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#Parameter'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#PrimaryKeyConstraintComponent-uriStart'),
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#uriStart'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#PrimaryKeyConstraintComponent-uriStart'),
      factory.namedNode('http://www.w3.org/ns/shacl#datatype'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#string'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#PrimaryKeyConstraintComponent-uriStart'),
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`The start of the URIs of well-formed resources.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#PrimaryKeyConstraintComponent-uriStart'),
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`URI start`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#QueryTestCase'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#QueryTestCase'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#NodeShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#QueryTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A test case running a given SPARQL SELECT query and comparing its results with those stored as JSON Result Set in the expected result property.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#QueryTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Query test case`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#QueryTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://datashapes.org/dash#TestCase'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#QueryTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLSelectExecutable'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b40'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#expectedResult'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b40'],
      factory.namedNode('http://www.w3.org/ns/shacl#datatype'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#string'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b40'],
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`The expected result set, as a JSON string.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b40'],
      factory.namedNode('http://www.w3.org/ns/shacl#maxCount'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b40'],
      factory.namedNode('http://www.w3.org/ns/shacl#minCount'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b40'],
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`expected result`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#QueryTestCase'),
      factory.namedNode('http://www.w3.org/ns/shacl#property'),
      blankNodes['b40'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b41'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b41'],
      factory.namedNode('http://www.w3.org/ns/shacl#datatype'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#string'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b41'],
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`The SPARQL SELECT query to execute.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b41'],
      factory.namedNode('http://www.w3.org/ns/shacl#maxCount'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b41'],
      factory.namedNode('http://www.w3.org/ns/shacl#minCount'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b41'],
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`SPARQL query`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#QueryTestCase'),
      factory.namedNode('http://www.w3.org/ns/shacl#property'),
      blankNodes['b41'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#RDFQueryJSLibrary'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#RDFQueryJSLibrary'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`rdfQuery JavaScript Library`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#RDFQueryJSLibrary'),
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibraryURL'),
      factory.literal(`http://datashapes.org/js/rdfquery.js`, factory.namedNode('http://www.w3.org/2001/XMLSchema#anyURI')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#RootClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#ConstraintComponent'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#RootClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A constraint component defining the parameter dash:rootClass, which restricts the values to be either the root class itself or one of its subclasses. This is typically used in conjunction with properties that have rdfs:Class as their type.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#RootClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Root class constraint component`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#RootClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#labelTemplate'),
      factory.literal(`Root class {$rootClass}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#RootClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value must be subclass of {$rootClass}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#RootClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#parameter'),
      factory.namedNode('http://datashapes.org/dash#RootClassConstraintComponent-rootClass'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#RootClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#PropertyShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#RootClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      factory.namedNode('http://datashapes.org/dash#hasRootClass'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b42'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b42'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateRootClass`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b42'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#RootClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b42'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#RootClassConstraintComponent-rootClass'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#Parameter'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#RootClassConstraintComponent-rootClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#rootClass'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#RootClassConstraintComponent-rootClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#class'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#RootClassConstraintComponent-rootClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`The root class.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#RootClassConstraintComponent-rootClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`root class`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#RootClassConstraintComponent-rootClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#nodeKind'),
      factory.namedNode('http://www.w3.org/ns/shacl#IRI'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SPARQLUpdateSuggestionGenerator'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SPARQLUpdateSuggestionGenerator'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A SuggestionGenerator based on a SPARQL UPDATE query (sh:update), producing an instance of dash:GraphUpdate. The INSERTs become dash:addedTriple and the DELETEs become dash:deletedTriple. The WHERE clause operates on the data graph with the pre-bound variables $subject, $predicate and $object, as well as the other pre-bound variables for the parameters of the constraint.

In many cases, there may be multiple possible suggestions to fix a problem. For example, with sh:maxLength there are many ways to slice a string. In those cases, the system will first iterate through the result variables from a SELECT query (sh:select) and apply these results as pre-bound variables into the UPDATE query.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SPARQLUpdateSuggestionGenerator'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`SPARQL UPDATE suggestion generator`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SPARQLUpdateSuggestionGenerator'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://datashapes.org/dash#SuggestionGenerator'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SPARQLUpdateSuggestionGenerator'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLSelectExecutable'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SPARQLUpdateSuggestionGenerator'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLUpdateExecutable'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#StemConstraintComponent'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#ConstraintComponent'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#StemConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#staticConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#StemConstraintComponent'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A constraint component that can be used to verify that every value node is an IRI and the IRI starts with a given string value.`, 'en'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#StemConstraintComponent'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Stem constraint component`, 'en'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#StemConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value does not have stem {$stem}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#StemConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#parameter'),
      factory.namedNode('http://datashapes.org/dash#StemConstraintComponent-stem'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#StemConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#StemConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      factory.namedNode('http://datashapes.org/dash#hasStem'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b43'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b43'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateStem`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b43'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#StemConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b43'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#StemConstraintComponent-stem'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#Parameter'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#StemConstraintComponent-stem'),
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#stem'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#StemConstraintComponent-stem'),
      factory.namedNode('http://www.w3.org/ns/shacl#datatype'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#string'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#StringOrLangString'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#List'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#StringOrLangString'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#first'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#string'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b44'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#first'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b44'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#rest'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#nil'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#StringOrLangString'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#rest'),
      blankNodes['b44'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#StringOrLangString'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`An rdf:List that can be used in property constraints as value for sh:or to indicate that all values of a property must be either xsd:string or rdf:langString.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#StringOrLangString'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`String or langString`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SubSetOfConstraintComponent'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#ConstraintComponent'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SubSetOfConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SubSetOfConstraintComponent'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A constraint component that can be used to state that the set of value nodes must be a subset of the value of a given property.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SubSetOfConstraintComponent'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Sub set of constraint component`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SubSetOfConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Must be one of the values of {$subSetOf}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SubSetOfConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#parameter'),
      factory.namedNode('http://datashapes.org/dash#SubSetOfConstraintComponent-subSetOf'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b45'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLAskValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b45'],
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`ASK {
    $this $subSetOf $value .
}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b45'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SubSetOfConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b45'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SubSetOfConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#PropertyShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b46'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b46'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateSubSetOf`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b46'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SubSetOfConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b46'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SubSetOfConstraintComponent-subSetOf'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#Parameter'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SubSetOfConstraintComponent-subSetOf'),
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#subSetOf'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SubSetOfConstraintComponent-subSetOf'),
      factory.namedNode('http://www.w3.org/ns/shacl#class'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SubSetOfConstraintComponent-subSetOf'),
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`A property (of the focus node) that must (at least) have all values from the set of value nodes.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SuccessResult'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SuccessResult'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A result representing a successfully validated constraint.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SuccessResult'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Success result`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SuccessResult'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://www.w3.org/ns/shacl#AbstractResult'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SuccessTestCaseResult'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SuccessTestCaseResult'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Represents a successful run of a test case.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SuccessTestCaseResult'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Success test case result`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SuccessTestCaseResult'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://datashapes.org/dash#TestCaseResult'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#Suggestion'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#Suggestion'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Base class of suggestions that modify a graph to "fix" the source of a validation result.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#Suggestion'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Suggestion`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#Suggestion'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Resource'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SuggestionGenerator'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SuggestionGenerator'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Base class of objects that can generate suggestions (added or deleted triples) for a validation result of a given constraint component.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SuggestionGenerator'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Suggestion generator`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#SuggestionGenerator'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Resource'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#TestCase'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#TestCase'),
      factory.namedNode('http://datashapes.org/dash#abstract'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#TestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`A test case to verify that a (SHACL-based) feature works as expected.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#TestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Test case`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#TestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Resource'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#TestCaseResult'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#TestCaseResult'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Base class for results produced by running test cases.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#TestCaseResult'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Test case result`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#TestCaseResult'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://www.w3.org/ns/shacl#AbstractResult'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b47'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#testCase'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b47'],
      factory.namedNode('http://www.w3.org/ns/shacl#class'),
      factory.namedNode('http://datashapes.org/dash#TestCase'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b47'],
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`The dash:TestCase that was executed.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b47'],
      factory.namedNode('http://www.w3.org/ns/shacl#maxCount'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b47'],
      factory.namedNode('http://www.w3.org/ns/shacl#minCount'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b47'],
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`test case`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#TestCaseResult'),
      factory.namedNode('http://www.w3.org/ns/shacl#property'),
      blankNodes['b47'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b48'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#testGraph'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b48'],
      factory.namedNode('http://www.w3.org/ns/shacl#class'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Resource'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b48'],
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`The graph containing the test case.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b48'],
      factory.namedNode('http://www.w3.org/ns/shacl#maxCount'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b48'],
      factory.namedNode('http://www.w3.org/ns/shacl#minCount'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b48'],
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`test graph`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b48'],
      factory.namedNode('http://www.w3.org/ns/shacl#nodeKind'),
      factory.namedNode('http://www.w3.org/ns/shacl#IRI'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#TestCaseResult'),
      factory.namedNode('http://www.w3.org/ns/shacl#property'),
      blankNodes['b48'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#TestEnvironment'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#TestEnvironment'),
      factory.namedNode('http://datashapes.org/dash#abstract'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#TestEnvironment'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Abstract base class for test environments, holding information on how to set up a test case.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#TestEnvironment'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Test environment`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#TestEnvironment'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Resource'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ValidationTestCase'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ValidationTestCase'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#NodeShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ValidationTestCase'),
      factory.namedNode('http://datashapes.org/dash#abstract'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ValidationTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Abstract superclass for test cases concerning SHACL constraint validation. Future versions may add new kinds of validatin test cases, e.g. to validate a single resource only.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ValidationTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`Validation test case`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ValidationTestCase'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://datashapes.org/dash#TestCase'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b49'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#expectedResult'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b49'],
      factory.namedNode('http://www.w3.org/ns/shacl#class'),
      factory.namedNode('http://www.w3.org/ns/shacl#ValidationReport'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b49'],
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`The expected validation report.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b49'],
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`expected result`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#ValidationTestCase'),
      factory.namedNode('http://www.w3.org/ns/shacl#property'),
      blankNodes['b49'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#abstract'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#abstract'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Indicates that a class is "abstract" and cannot be used in asserted rdf:type triples. Only non-abstract subclasses of abstract classes should be instantiated directly.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#abstract'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#domain'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#abstract'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`abstract`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#abstract'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#addedTriple'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#addedTriple'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`May link a dash:GraphUpdate with one or more triples (represented as instances of rdf:Statement) that should be added to fix the source of the result.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#addedTriple'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#domain'),
      factory.namedNode('http://datashapes.org/dash#GraphUpdate'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#addedTriple'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`added triple`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#addedTriple'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Statement'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#cachable'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#cachable'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`If set to true then the results of the SHACL function can be cached in between invocations with the same arguments. In other words, they are stateless and do not depend on triples in any graph, or the current time stamp etc.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#cachable'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#domain'),
      factory.namedNode('http://www.w3.org/ns/shacl#Function'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#cachable'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`cachable`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#cachable'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#closedByTypes'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#closedByTypes'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`closed by types`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#coExistsWith'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#coExistsWith'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Specifies a property that must have a value whenever the property path has a value, and must have no value whenever the property path has no value.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#coExistsWith'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`co-exists with`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#coExistsWith'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#composite'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#composite'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Can be used to indicate that a property/path represented by a property constraint represents a composite relationship. In a composite relationship, the life cycle of a "child" object (value of the property/path) depends on the "parent" object (focus node). If the parent gets deleted, then the child objects should be deleted, too. Tools may use dash:composite (if set to true) to implement cascading delete operations.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#composite'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#domain'),
      factory.namedNode('http://www.w3.org/ns/shacl#PropertyShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#composite'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`composite`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#composite'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#defaultValueType'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#defaultValueType'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`
		Links a property with a default value type.
		The default value type is assumed to be the <code>rdf:type</code> of values of the property
		that declare no type on their own.
		An example use of <code>sh:defaultValueType</code> is <code>sh:property</code>,
		the values of which are assumed to be instances of <code>sh:PropertyShape</code>
		even if they are untyped (blank) nodes.
		`, factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#defaultValueType'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`default value type`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#defaultValueType'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#defaultValueType'),
      factory.namedNode('http://www.w3.org/2002/07/owl#versionInfo'),
      factory.literal(`Note this property may get removed in future versions. It is a left-over from a previous design in SHACL.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#deletedTriple'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#deletedTriple'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`May link a dash:GraphUpdate result with one or more triples (represented as instances of rdf:Statement) that should be deleted to fix the source of the result.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#deletedTriple'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#domain'),
      factory.namedNode('http://datashapes.org/dash#GraphUpdate'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#deletedTriple'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`deleted triple`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#deletedTriple'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Statement'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#expectedResult'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#expectedResult'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`The expected result(s) of a test case. The value range of this property is different for each kind of test cases.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#expectedResult'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#domain'),
      factory.namedNode('http://datashapes.org/dash#TestCase'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#expectedResult'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`expected result`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#fixed'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#fixed'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Can be used to mark that certain validation results have already been fixed.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#fixed'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#domain'),
      factory.namedNode('http://www.w3.org/ns/shacl#ValidationResult'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#fixed'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`fixed`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#fixed'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasClass'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLAskValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasClass'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`has class`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`
		ASK {
			$value rdf:type/rdfs:subClassOf* $class .
		}
		`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value does not have class {$class}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMaxExclusive'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLAskValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMaxExclusive'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Checks whether a given node (?value) has value less than (<) the provided ?maxExclusive. Returns false if this cannot be determined, e.g. because values do not have comparable types.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMaxExclusive'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`has max exclusive`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMaxExclusive'),
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`ASK { FILTER ($value < $maxExclusive) }`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMaxExclusive'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMaxInclusive'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLAskValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMaxInclusive'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Checks whether a given node (?value) has value less than or equal to (<=) the provided ?maxInclusive. Returns false if this cannot be determined, e.g. because values do not have comparable types.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMaxInclusive'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`has max inclusive`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMaxInclusive'),
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`ASK { FILTER ($value <= $maxInclusive) }`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMaxInclusive'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMaxLength'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLAskValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMaxLength'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Checks whether a given string (?value) has a length within a given maximum string length.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMaxLength'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`has max length`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMaxLength'),
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`
		ASK {
			FILTER (STRLEN(str($value)) <= $maxLength) .
		}
		`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMaxLength'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMinExclusive'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLAskValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMinExclusive'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Checks whether a given node (?value) has value greater than (>) the provided ?minExclusive. Returns false if this cannot be determined, e.g. because values do not have comparable types.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMinExclusive'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`has min exclusive`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMinExclusive'),
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`ASK { FILTER ($value > $minExclusive) }`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMinExclusive'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMinInclusive'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLAskValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMinInclusive'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Checks whether a given node (?value) has value greater than or equal to (>=) the provided ?minInclusive. Returns false if this cannot be determined, e.g. because values do not have comparable types.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMinInclusive'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`has min inclusive`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMinInclusive'),
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`ASK { FILTER ($value >= $minInclusive) }`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMinInclusive'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMinLength'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLAskValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMinLength'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Checks whether a given string (?value) has a length within a given minimum string length.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMinLength'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`has min length`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMinLength'),
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`
		ASK {
			FILTER (STRLEN(str($value)) >= $minLength) .
		}
		`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasMinLength'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasNodeKind'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLAskValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasNodeKind'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Checks whether a given node (?value) has a given sh:NodeKind (?nodeKind). For example, sh:hasNodeKind(42, sh:Literal) = true.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasNodeKind'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`has node kind`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasNodeKind'),
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`
		ASK {
			FILTER ((isIRI($value) && $nodeKind IN ( sh:IRI, sh:BlankNodeOrIRI, sh:IRIOrLiteral ) ) ||
				(isLiteral($value) && $nodeKind IN ( sh:Literal, sh:BlankNodeOrLiteral, sh:IRIOrLiteral ) ) ||
				(isBlank($value)   && $nodeKind IN ( sh:BlankNode, sh:BlankNodeOrIRI, sh:BlankNodeOrLiteral ) )) .
		}
		`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasNodeKind'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasPattern'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLAskValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasPattern'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Checks whether the string representation of a given node (?value) matches a given regular expression (?pattern). Returns false if the value is a blank node.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasPattern'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`has pattern`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasPattern'),
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`ASK { FILTER (!isBlank($value) && IF(bound($flags), regex(str($value), $pattern, $flags), regex(str($value), $pattern))) }`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasPattern'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasRootClass'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLAskValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasRootClass'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`has root class`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasRootClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`ASK {
    $value rdfs:subClassOf* $rootClass .
}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasRootClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasStem'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLAskValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasStem'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Checks whether a given node is an IRI starting with a given stem.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasStem'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`has stem`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasStem'),
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`ASK { FILTER (isIRI($value) && STRSTARTS(str($value), $stem)) }`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasStem'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasValueWithClass'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasValueWithClass'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Specifies a constraint that at least one of the value nodes must be an instance of a given class.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasValueWithClass'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`has value with class`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#hasValueWithClass'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#height'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#height'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`The height.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#height'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`height`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#height'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#integer'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isDeactivated'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLFunction'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isDeactivated'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Checks whether a given shape or constraint has been marked as "deactivated" using sh:deactivated.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isDeactivated'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`is deactivated`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isDeactivated'),
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`ASK {
    ?constraintOrShape sh:deactivated true .
}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b50'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#constraintOrShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b50'],
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`The sh:Constraint or sh:Shape to test.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b50'],
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`constraint or shape`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isDeactivated'),
      factory.namedNode('http://www.w3.org/ns/shacl#parameter'),
      blankNodes['b50'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isDeactivated'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isDeactivated'),
      factory.namedNode('http://www.w3.org/ns/shacl#returnType'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isIn'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLAskValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isIn'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`is in`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isIn'),
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`
		ASK {
			GRAPH $shapesGraph {
				$in (rdf:rest*)/rdf:first $value .
			}
		}
		`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isIn'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isLanguageIn'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLAskValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isLanguageIn'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`is language in`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isLanguageIn'),
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`
		ASK {
			BIND (lang($value) AS ?valueLang) .
			FILTER EXISTS {
				GRAPH $shapesGraph {
					$languageIn (rdf:rest*)/rdf:first ?lang .
				    FILTER (langMatches(?valueLang, ?lang))
				} }
		}
		`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isLanguageIn'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindBlankNode'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLFunction'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindBlankNode'),
      factory.namedNode('http://datashapes.org/dash#cachable'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindBlankNode'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Checks if a given sh:NodeKind is one that includes BlankNodes.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindBlankNode'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`is NodeKind BlankNode`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindBlankNode'),
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`ASK {
	FILTER ($nodeKind IN ( sh:BlankNode, sh:BlankNodeOrIRI, sh:BlankNodeOrLiteral ))
}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b51'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#nodeKind'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b51'],
      factory.namedNode('http://www.w3.org/ns/shacl#class'),
      factory.namedNode('http://www.w3.org/ns/shacl#NodeKind'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b51'],
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`The sh:NodeKind to check.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b51'],
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`node kind`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b51'],
      factory.namedNode('http://www.w3.org/ns/shacl#nodeKind'),
      factory.namedNode('http://www.w3.org/ns/shacl#IRI'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindBlankNode'),
      factory.namedNode('http://www.w3.org/ns/shacl#parameter'),
      blankNodes['b51'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindBlankNode'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindBlankNode'),
      factory.namedNode('http://www.w3.org/ns/shacl#returnType'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindIRI'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLFunction'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindIRI'),
      factory.namedNode('http://datashapes.org/dash#cachable'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindIRI'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Checks if a given sh:NodeKind is one that includes IRIs.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindIRI'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`is NodeKind IRI`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindIRI'),
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`ASK {
	FILTER ($nodeKind IN ( sh:IRI, sh:BlankNodeOrIRI, sh:IRIOrLiteral ))
}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b52'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#nodeKind'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b52'],
      factory.namedNode('http://www.w3.org/ns/shacl#class'),
      factory.namedNode('http://www.w3.org/ns/shacl#NodeKind'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b52'],
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`The sh:NodeKind to check.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b52'],
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`node kind`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b52'],
      factory.namedNode('http://www.w3.org/ns/shacl#nodeKind'),
      factory.namedNode('http://www.w3.org/ns/shacl#IRI'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindIRI'),
      factory.namedNode('http://www.w3.org/ns/shacl#parameter'),
      blankNodes['b52'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindIRI'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindIRI'),
      factory.namedNode('http://www.w3.org/ns/shacl#returnType'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindLiteral'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLFunction'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindLiteral'),
      factory.namedNode('http://datashapes.org/dash#cachable'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindLiteral'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Checks if a given sh:NodeKind is one that includes Literals.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindLiteral'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`is NodeKind Literal`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindLiteral'),
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`ASK {
	FILTER ($nodeKind IN ( sh:Literal, sh:BlankNodeOrLiteral, sh:IRIOrLiteral ))
}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b53'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#nodeKind'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b53'],
      factory.namedNode('http://www.w3.org/ns/shacl#class'),
      factory.namedNode('http://www.w3.org/ns/shacl#NodeKind'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b53'],
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`The sh:NodeKind to check.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b53'],
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`node kind`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b53'],
      factory.namedNode('http://www.w3.org/ns/shacl#nodeKind'),
      factory.namedNode('http://www.w3.org/ns/shacl#IRI'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindLiteral'),
      factory.namedNode('http://www.w3.org/ns/shacl#parameter'),
      blankNodes['b53'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindLiteral'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#isNodeKindLiteral'),
      factory.namedNode('http://www.w3.org/ns/shacl#returnType'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Can be set to true for those constraint components where the validation does not require to visit any other triples than the shape definitions and the direct property values of the focus node mentioned in the property constraints. Examples of this include sh:minCount and sh:hasValue.

Constraint components that are marked as such can be optimized by engines, e.g. they can be evaluated client-side at form submission time, without having to make a round-trip to a server, assuming the client has downloaded a complete snapshot of the resource.

Any component marked with dash:staticConstraint is also a dash:localConstraint.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#domain'),
      factory.namedNode('http://www.w3.org/ns/shacl#ConstraintComponent'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`local constraint`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#propertySuggestionGenerator'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#propertySuggestionGenerator'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Links the constraint component with instances of dash:SuggestionGenerator that may be used to produce suggestions for a given validation result that was produced by a property constraint.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#propertySuggestionGenerator'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#domain'),
      factory.namedNode('http://www.w3.org/ns/shacl#ConstraintComponent'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#propertySuggestionGenerator'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`property suggestion generator`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#propertySuggestionGenerator'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://datashapes.org/dash#SuggestionGenerator'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#rootClass'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#rootClass'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`root class`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#staticConstraint'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#staticConstraint'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Can be set to true for those constraint components where the validation does not require to visit any other triples than the parameters. Examples of this include sh:datatype or sh:nodeKind, where no further triples need to be queried to determine the result.

Constraint components that are marked as such can be optimized by engines, e.g. they can be evaluated client-side at form submission time, without having to make a round-trip to a server.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#staticConstraint'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#domain'),
      factory.namedNode('http://www.w3.org/ns/shacl#ConstraintComponent'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#staticConstraint'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`static constraint`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#staticConstraint'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#stem'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#stem'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Specifies a string value that the IRI of the value nodes must start with.`, 'en'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#stem'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`stem`, 'en'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#stem'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#string'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#subSetOf'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#subSetOf'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`sub set of`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#suggestion'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#suggestion'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Can be used to link a validation result with one or more suggestions on how to fix the underlying issue.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#suggestion'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#domain'),
      factory.namedNode('http://www.w3.org/ns/shacl#ValidationResult'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#suggestion'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`suggestion`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#suggestion'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://datashapes.org/dash#Suggestion'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#suggestionGenerator'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#suggestionGenerator'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Links a sh:SPARQLConstraint with instances of dash:SuggestionGenerator that may be used to produce suggestions for a given validation result that was produced by the constraint.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#suggestionGenerator'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#domain'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLConstraint'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#suggestionGenerator'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`suggestion generator`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#suggestionGenerator'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://datashapes.org/dash#SuggestionGenerator'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#suggestionGroup'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#suggestionGroup'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Can be used to link a suggestion with the group identifier to which it belongs. By default this is a link to the dash:SuggestionGenerator, but in principle this could be any value.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#suggestionGroup'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#domain'),
      factory.namedNode('http://datashapes.org/dash#Suggestion'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#suggestionGroup'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`suggestion`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#testEnvironment'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#testEnvironment'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Can be used by TestCases to point at a resource with information on how to set up the execution environment prior to execution.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#testEnvironment'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#domain'),
      factory.namedNode('http://datashapes.org/dash#TestCase'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#testEnvironment'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`test environment`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#testEnvironment'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://datashapes.org/dash#TestEnvironment'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#testModifiesEnvironment'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#testModifiesEnvironment'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Indicates whether this test modifies the specified dash:testEnvironment. If set to true then a test runner can make sure to wipe out the previous environment, while leaving it false (or undefined) means that the test runner can reuse the environment from the previous test case. As setting up and tearing down tests is sometimes slow, this flag can significantly accelerate test execution.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#testModifiesEnvironment'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#domain'),
      factory.namedNode('http://datashapes.org/dash#TestCase'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#testModifiesEnvironment'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`test modifies environment`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#testModifiesEnvironment'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#toString'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSFunction'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#toString'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLFunction'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#toString'),
      factory.namedNode('http://datashapes.org/dash#cachable'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#toString'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Returns a literal with datatype xsd:string that has the input value as its string. If the input value is an (URI) resource then its URI will be used.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#toString'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`to string`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#toString'),
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`dash_toString`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#toString'),
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#toString'),
      factory.namedNode('http://www.w3.org/ns/shacl#labelTemplate'),
      factory.literal(`Convert {$arg} to xsd:string`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b54'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#arg'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b54'],
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`The input value.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b54'],
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`arg`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b54'],
      factory.namedNode('http://www.w3.org/ns/shacl#nodeKind'),
      factory.namedNode('http://www.w3.org/ns/shacl#IRIOrLiteral'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#toString'),
      factory.namedNode('http://www.w3.org/ns/shacl#parameter'),
      blankNodes['b54'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#toString'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#toString'),
      factory.namedNode('http://www.w3.org/ns/shacl#returnType'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#string'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#toString'),
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.literal(`SELECT (xsd:string($arg) AS ?result)
WHERE {
}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#validateShapes'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#validateShapes'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`True to also validate the shapes itself (i.e. parameter declarations).`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#validateShapes'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#domain'),
      factory.namedNode('http://datashapes.org/dash#GraphValidationTestCase'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#validateShapes'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`validate shapes`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#validateShapes'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#valueCount'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLFunction'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#valueCount'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`Computes the number of objects for a given subject/predicate combination.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#valueCount'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`value count`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b55'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#predicate'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b55'],
      factory.namedNode('http://www.w3.org/ns/shacl#class'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Resource'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b55'],
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`The predicate to get the number of objects of.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b55'],
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`predicate`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b55'],
      factory.namedNode('http://www.w3.org/ns/shacl#order'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#valueCount'),
      factory.namedNode('http://www.w3.org/ns/shacl#parameter'),
      blankNodes['b55'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b56'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#subject'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b56'],
      factory.namedNode('http://www.w3.org/ns/shacl#class'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Resource'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b56'],
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`The subject to get the number of objects of.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b56'],
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`subject`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b56'],
      factory.namedNode('http://www.w3.org/ns/shacl#order'),
      factory.literal(`0`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#valueCount'),
      factory.namedNode('http://www.w3.org/ns/shacl#parameter'),
      blankNodes['b56'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#valueCount'),
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#valueCount'),
      factory.namedNode('http://www.w3.org/ns/shacl#returnType'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#integer'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#valueCount'),
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.literal(`
		SELECT (COUNT(?object) AS ?result)
		WHERE {
    		$subject $predicate ?object .
		}
`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#width'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#width'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`The width.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#width'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`width`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#width'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#integer'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#x'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#x'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`The x position.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#x'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`x`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#x'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#integer'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#y'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#y'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
      factory.literal(`The y position.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#y'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label'),
      factory.literal(`y`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://datashapes.org/dash#y'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#integer'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/2002/07/owl#Class'),
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/2002/07/owl#Class'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#AndConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b57'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b57'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateAnd`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b57'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#AndConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b57'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#ClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#ClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      factory.namedNode('http://datashapes.org/dash#hasClass'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b58'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b58'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateClass`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b58'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#ClassConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b58'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#ClosedConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b59'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLSelectValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b59'],
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Predicate {?path} is not allowed (closed shape)`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b59'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b59'],
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.literal(`
		SELECT $this (?predicate AS ?path) ?value
		WHERE {
			{
				FILTER ($closed) .
			}
			$this ?predicate ?value .
			FILTER (NOT EXISTS {
				GRAPH $shapesGraph {
					$currentShape sh:property/sh:path ?predicate .
				}
			} && (!bound($ignoredProperties) || NOT EXISTS {
				GRAPH $shapesGraph {
					$ignoredProperties rdf:rest*/rdf:first ?predicate .
				}
			}))
		}
`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#ClosedConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#nodeValidator'),
      blankNodes['b59'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#ClosedConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#NodeShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b60'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b60'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateClosed`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b60'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b60'],
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Predicate is not allowed (closed shape)`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#ClosedConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b60'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#DatatypeConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#staticConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#DatatypeConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value does not have datatype {$datatype}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#DatatypeConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#PropertyShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b61'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b61'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateDatatype`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b61'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#DatatypeConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b61'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#DerivedValuesConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#PropertyShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#DisjointConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#DisjointConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b62'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b62'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateDisjoint`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b62'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b62'],
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value node must not also be one of the values of {$disjoint}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#DisjointConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b62'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b63'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLAskValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b63'],
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`
		ASK {
			FILTER NOT EXISTS {
				$this $disjoint $value .
			}
		}
		`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b63'],
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Property must not share any values with {$disjoint}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b63'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#DisjointConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b63'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#EqualsConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#EqualsConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Must have same values as {$equals}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b64'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLSelectValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b64'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b64'],
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.literal(`
		SELECT DISTINCT $this ?value
		WHERE {
			{
				FILTER NOT EXISTS { $this $equals $this }
				BIND ($this AS ?value) .
			}
			UNION
			{
				$this $equals ?value .
				FILTER (?value != $this) .
			}
		}
		`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#EqualsConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#nodeValidator'),
      blankNodes['b64'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b65'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b65'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateEqualsNode`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b65'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#EqualsConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#nodeValidator'),
      blankNodes['b65'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b66'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b66'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateEqualsProperty`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b66'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#EqualsConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b66'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b67'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLSelectValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b67'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b67'],
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.literal(`
		SELECT DISTINCT $this ?value
		WHERE {
			{
				$this $PATH ?value .
				MINUS {
					$this $equals ?value .
				}
			}
			UNION
			{
				$this $equals ?value .
				MINUS {
					$this $PATH ?value .
				}
			}
		}
		`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#EqualsConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b67'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#EqualsConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b68'],
      factory.namedNode('http://www.w3.org/ns/shacl#path'),
      factory.namedNode('http://datashapes.org/dash#cachable'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b68'],
      factory.namedNode('http://www.w3.org/ns/shacl#datatype'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b68'],
      factory.namedNode('http://www.w3.org/ns/shacl#description'),
      factory.literal(`True to indicate that this function will always return the same values for the same combination of arguments, regardless of the query graphs. Engines can use this information to cache and reuse previous function calls.`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b68'],
      factory.namedNode('http://www.w3.org/ns/shacl#maxCount'),
      factory.literal(`1`, factory.namedNode('http://www.w3.org/2001/XMLSchema#integer')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b68'],
      factory.namedNode('http://www.w3.org/ns/shacl#name'),
      factory.literal(`cachable`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#Function'),
      factory.namedNode('http://www.w3.org/ns/shacl#property'),
      blankNodes['b68'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#HasValueConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b69'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b69'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateHasValueNode`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b69'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b69'],
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value must be {$hasValue}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#HasValueConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#nodeValidator'),
      blankNodes['b69'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b70'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLAskValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b70'],
      factory.namedNode('http://www.w3.org/ns/shacl#ask'),
      factory.literal(`ASK {
    FILTER ($value = $hasValue)
}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b70'],
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value must be {$hasValue}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b70'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#HasValueConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#nodeValidator'),
      blankNodes['b70'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b71'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b71'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateHasValueProperty`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b71'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b71'],
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Missing expected value {$hasValue}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#HasValueConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b71'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b72'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLSelectValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b72'],
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Missing expected value {$hasValue}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b72'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b72'],
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.literal(`
		SELECT $this
		WHERE {
			FILTER NOT EXISTS { $this $PATH $hasValue }
		}
		`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#HasValueConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b72'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#HasValueConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#InConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#InConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value is not in {$in}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#InConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#InConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      factory.namedNode('http://datashapes.org/dash#isIn'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b73'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b73'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateIn`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b73'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#InConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b73'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#LanguageInConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#LanguageInConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Language does not match any of {$languageIn}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#LanguageInConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#LanguageInConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      factory.namedNode('http://datashapes.org/dash#isLanguageIn'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b74'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b74'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateLanguageIn`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b74'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#LanguageInConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b74'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#LessThanConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#LessThanConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value is not < value of {$lessThan}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b75'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b75'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateLessThanProperty`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b75'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#LessThanConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b75'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b76'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLSelectValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b76'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b76'],
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.literal(`
		SELECT $this ?value
		WHERE {
			$this $PATH ?value .
			$this $lessThan ?otherValue .
			BIND (?value < ?otherValue AS ?result) .
			FILTER (!bound(?result) || !(?result)) .
		}
		`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#LessThanConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b76'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#LessThanConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#PropertyShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#LessThanOrEqualsConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#LessThanOrEqualsConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value is not <= value of {$lessThanOrEquals}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b77'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b77'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateLessThanOrEqualsProperty`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b77'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#LessThanOrEqualsConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b77'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b78'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLSelectValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b78'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b78'],
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.literal(`
		SELECT DISTINCT $this ?value
		WHERE {
			$this $PATH ?value .
			$this $lessThanOrEquals ?otherValue .
			BIND (?value <= ?otherValue AS ?result) .
			FILTER (!bound(?result) || !(?result)) .
		}
`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#LessThanOrEqualsConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b78'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#LessThanOrEqualsConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#PropertyShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxCountConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxCountConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`More than {$maxCount} values`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b79'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b79'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateMaxCountProperty`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b79'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxCountConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b79'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b80'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLSelectValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b80'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b80'],
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.literal(`
		SELECT $this
		WHERE {
			$this $PATH ?value .
		}
		GROUP BY $this
		HAVING (COUNT(DISTINCT ?value) > $maxCount)
		`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxCountConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b80'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxCountConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#PropertyShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxExclusiveConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#staticConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxExclusiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value is not < {$maxExclusive}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxExclusiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxExclusiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      factory.namedNode('http://datashapes.org/dash#hasMaxExclusive'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b81'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b81'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateMaxExclusive`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b81'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxExclusiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b81'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxInclusiveConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#staticConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxInclusiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value is not <= {$maxInclusive}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxInclusiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxInclusiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      factory.namedNode('http://datashapes.org/dash#hasMaxInclusive'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b82'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b82'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateMaxInclusive`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b82'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxInclusiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b82'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxLengthConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#staticConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxLengthConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value has more than {$maxLength} characters`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxLengthConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxLengthConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      factory.namedNode('http://datashapes.org/dash#hasMaxLength'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b83'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b83'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateMaxLength`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b83'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MaxLengthConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b83'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinCountConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinCountConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Less than {$minCount} values`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b84'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b84'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateMinCountProperty`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b84'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinCountConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b84'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b85'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLSelectValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b85'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b85'],
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.literal(`
		SELECT $this
		WHERE {
			OPTIONAL {
				$this $PATH ?value .
			}
		}
		GROUP BY $this
		HAVING (COUNT(DISTINCT ?value) < $minCount)
		`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinCountConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b85'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinCountConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#PropertyShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinExclusiveConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#staticConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinExclusiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value is not > {$minExclusive}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinExclusiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinExclusiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      factory.namedNode('http://datashapes.org/dash#hasMinExclusive'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b86'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b86'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateMinExclusive`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b86'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinExclusiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b86'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinInclusiveConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#staticConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinInclusiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value is not >= {$minInclusive}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinInclusiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinInclusiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      factory.namedNode('http://datashapes.org/dash#hasMinInclusive'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b87'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b87'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateMinInclusive`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b87'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinInclusiveConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b87'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinLengthConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#staticConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinLengthConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value has less than {$minLength} characters`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinLengthConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinLengthConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      factory.namedNode('http://datashapes.org/dash#hasMinLength'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b88'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b88'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateMinLength`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b88'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#MinLengthConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b88'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#NodeConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value does not have shape {$node}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#NodeConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b89'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b89'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateNode`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b89'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#NodeConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b89'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#NodeKindConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#staticConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#NodeKindConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value does not have node kind {$nodeKind}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#NodeKindConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#NodeKindConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      factory.namedNode('http://datashapes.org/dash#hasNodeKind'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b90'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b90'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateNodeKind`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b90'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#NodeKindConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b90'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#NotConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value does have shape {$not}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#NotConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b91'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b91'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateNot`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b91'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#NotConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b91'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#OrConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b92'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b92'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateOr`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b92'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#OrConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b92'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#PatternConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#staticConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#PatternConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Value does not match pattern "{$pattern}"`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#PatternConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#PatternConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      factory.namedNode('http://datashapes.org/dash#hasPattern'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b93'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b93'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validatePattern`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b93'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#PatternConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b93'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#QualifiedMaxCountConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`More than {$qualifiedMaxCount} values have shape {$qualifiedValueShape}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b94'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b94'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateQualifiedMaxCountProperty`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b94'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#QualifiedMaxCountConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b94'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#QualifiedMaxCountConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#PropertyShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#QualifiedMinCountConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Less than {$qualifiedMinCount} values have shape {$qualifiedValueShape}`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b95'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b95'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateQualifiedMinCountProperty`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b95'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#QualifiedMinCountConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b95'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#QualifiedMinCountConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#PropertyShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#UniqueLangConstraintComponent'),
      factory.namedNode('http://datashapes.org/dash#localConstraint'),
      factory.literal(`true`, factory.namedNode('http://www.w3.org/2001/XMLSchema#boolean')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#UniqueLangConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#message'),
      factory.literal(`Language "{?lang}" used more than once`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b96'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b96'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateUniqueLangProperty`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b96'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#UniqueLangConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b96'],
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b97'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLSelectValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b97'],
      factory.namedNode('http://www.w3.org/ns/shacl#prefixes'),
      factory.namedNode('http://datashapes.org/dash'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b97'],
      factory.namedNode('http://www.w3.org/ns/shacl#select'),
      factory.literal(`
		SELECT DISTINCT $this ?lang
		WHERE {
			{
				FILTER sameTerm($uniqueLang, true) .
			}
			$this $PATH ?value .
			BIND (lang(?value) AS ?lang) .
			FILTER (bound(?lang) && ?lang != "") .
			FILTER EXISTS {
				$this $PATH ?otherValue .
				FILTER (?otherValue != ?value && ?lang = lang(?otherValue)) .
			}
		}
		`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#UniqueLangConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#propertyValidator'),
      blankNodes['b97'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#UniqueLangConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#PropertyShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#XoneConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#targetClass'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b98'],
      factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      factory.namedNode('http://www.w3.org/ns/shacl#JSValidator'),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b98'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsFunctionName'),
      factory.literal(`validateXone`, factory.namedNode('http://www.w3.org/2001/XMLSchema#string')),
      factory.defaultGraph()
    ),
    factory.quad(
      blankNodes['b98'],
      factory.namedNode('http://www.w3.org/ns/shacl#jsLibrary'),
      factory.namedNode('http://datashapes.org/dash#DASHJSLibrary'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#XoneConstraintComponent'),
      factory.namedNode('http://www.w3.org/ns/shacl#validator'),
      blankNodes['b98'],
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#node'),
      factory.namedNode('http://datashapes.org/dash#defaultValueType'),
      factory.namedNode('http://www.w3.org/ns/shacl#NodeShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#not'),
      factory.namedNode('http://datashapes.org/dash#defaultValueType'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#order'),
      factory.namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
      factory.namedNode('http://www.w3.org/2001/XMLSchema#decimal'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#parameter'),
      factory.namedNode('http://datashapes.org/dash#defaultValueType'),
      factory.namedNode('http://www.w3.org/ns/shacl#Parameter'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#property'),
      factory.namedNode('http://datashapes.org/dash#defaultValueType'),
      factory.namedNode('http://www.w3.org/ns/shacl#PropertyShape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#qualifiedValueShape'),
      factory.namedNode('http://datashapes.org/dash#defaultValueType'),
      factory.namedNode('http://www.w3.org/ns/shacl#Shape'),
      factory.defaultGraph()
    ),
    factory.quad(
      factory.namedNode('http://www.w3.org/ns/shacl#sparql'),
      factory.namedNode('http://datashapes.org/dash#defaultValueType'),
      factory.namedNode('http://www.w3.org/ns/shacl#SPARQLConstraint'),
      factory.defaultGraph()
    )
  ]
}
