/* globals $data */

// A simple SHACL validator in JavaScript based on SHACL-JS.

// Design:
//
// First, derive a ShapesGraph object from the definitions in $shapes.
// This manages a map of parameters to ConstraintComponents.
// Each ConstraintComponent manages its list of parameters and a link to the validators.
//
// The ShapesGraph also manages a list of Shapes, each which has a list of Constraints.
// A Constraint is a specific combination of parameters for a constraint component,
// and has functions to access the target nodes.
//
// Each ShapesGraph can be reused between validation calls, and thus often only needs
// to be created once per application.
//
// The validation process is started by creating a ValidationEngine that relies on
// a given ShapesGraph and operates on the current $data().
// It basically walks through all Shapes that have target nodes and runs the validators
// for each Constraint of the shape, producing results along the way.

var TermFactory = require('./rdfquery/term-factory')
var RDFQuery = require('./rdfquery')
var NodeSet = RDFQuery.NodeSet
var T = RDFQuery.T
var ValidationFunction = require('./validation-function')

TermFactory.registerNamespace('dash', 'http://datashapes.org/dash#')

class ShapesGraph {
  constructor (context) {
    this.context = context

    // Collect all defined constraint components
    var components = []
    new RDFQueryUtil(this.context.$shapes).getInstancesOf(T('sh:ConstraintComponent')).forEach(function (node) {
      if (!T('dash:ParameterConstraintComponent').equals(node)) {
        components.push(new ConstraintComponent(node, context))
      }
    })
    this.components = components

    // Build map from parameters to constraint components
    this.parametersMap = {}
    for (var i = 0; i < this.components.length; i++) {
      var component = this.components[i]
      var parameters = component.getParameters()
      for (var j = 0; j < parameters.length; j++) {
        this.parametersMap[parameters[j].value] = component
      }
    }

    // Collection of shapes is populated on demand - here we remember the instances
    this.shapes = {} // Keys are the URIs/bnode ids of the shape nodes
  }

  getComponentWithParameter (parameter) {
    return this.parametersMap[parameter.value]
  }

  getShape (shapeNode) {
    var shape = this.shapes[shapeNode.value]
    if (!shape) {
      shape = new Shape(this.context, shapeNode)
      this.shapes[shapeNode.value] = shape
    }
    return shape
  }

  getShapeNodesWithConstraints () {
    if (!this.shapeNodesWithConstraints) {
      var set = new NodeSet()
      for (var i = 0; i < this.components.length; i++) {
        var params = this.components[i].requiredParameters
        for (var j = 0; j < params.length; j++) {
          this.context.$shapes.query().match('?shape', params[j], null).addAllNodes('?shape', set)
        }
      }
      this.shapeNodesWithConstraints = set.toArray()
    }
    return this.shapeNodesWithConstraints
  }

  getShapesWithTarget () {
    if (!this.targetShapes) {
      this.targetShapes = []
      var cs = this.getShapeNodesWithConstraints()
      for (var i = 0; i < cs.length; i++) {
        var shapeNode = cs[i]
        if (new RDFQueryUtil(this.context.$shapes).isInstanceOf(shapeNode, T('rdfs:Class')) ||
                  this.context.$shapes.query().match(shapeNode, 'sh:targetClass', null).hasSolution() ||
                  this.context.$shapes.query().match(shapeNode, 'sh:targetNode', null).hasSolution() ||
                  this.context.$shapes.query().match(shapeNode, 'sh:targetSubjectsOf', null).hasSolution() ||
                  this.context.$shapes.query().match(shapeNode, 'sh:targetObjectsOf', null).hasSolution() ||
                  this.context.$shapes.query().match(shapeNode, 'sh:target', null).hasSolution()) {
          this.targetShapes.push(this.getShape(shapeNode))
        }
      }
    }

    return this.targetShapes
  }

  async loadJSLibraries () {
    var that = this
    var libraries = this.context.$shapes.query()
      .match('?library', 'sh:jsLibraryURL', '?library').getNodeArray('?library')
    for (var i = 0; i < libraries.length; i++) {
      libraries[i] = libraries[i].value
    }
    await fetchLibraries(libraries, this.context, that.context.functionsRegistry)
  }
}

class RDFQueryUtil {
  constructor ($source) {
    this.source = $source
  }

  getInstancesOf ($class) {
    var set = new NodeSet()
    var classes = this.getSubClassesOf($class)
    classes.add($class)
    var car = classes.toArray()
    for (var i = 0; i < car.length; i++) {
      set.addAll(RDFQuery(this.source).match('?instance', 'rdf:type', car[i]).getNodeArray('?instance'))
    }
    return set
  }

  getObject ($subject, $predicate) {
    if (!$subject) {
      throw new Error('Missing subject')
    }
    if (!$predicate) {
      throw new Error('Missing predicate')
    }
    return RDFQuery(this.source).match($subject, $predicate, '?object').getNode('?object')
  }

  getSubClassesOf ($class) {
    var set = new NodeSet()
    this.walkSubjects(set, $class, T('rdfs:subClassOf'))
    return set
  }

  isInstanceOf ($instance, $class) {
    var classes = this.getSubClassesOf($class)
    var types = $data.query().match($instance, 'rdf:type', '?type')
    for (var n = types.nextSolution(); n; n = types.nextSolution()) {
      if (n.type.equals($class) || classes.contains(n.type)) {
        types.close()
        return true
      }
    }
    return false
  }

  rdfListToArray ($rdfList) {
    if ($rdfList.elements) {
      return $rdfList.elements
    } else {
      var array = []
      while (!T('rdf:nil').equals($rdfList)) {
        array.push(this.getObject($rdfList, T('rdf:first')))
        $rdfList = this.getObject($rdfList, T('rdf:rest'))
      }
      return array
    }
  }

  walkObjects ($results, $subject, $predicate) {
    var it = this.source.find($subject, $predicate, null)
    for (var n = it.next(); n; n = it.next()) {
      if (!$results.contains(n.object)) {
        $results.add(n.object)
        this.walkObjects($results, n.object, $predicate)
      }
    }
  }

  walkSubjects ($results, $object, $predicate) {
    var it = this.source.find(null, $predicate, $object)
    for (var n = it.next(); n; n = it.next()) {
      if (!$results.contains(n.subject)) {
        $results.add(n.subject)
        this.walkSubjects($results, n.subject, $predicate)
      }
    }
  }
}

class Constraint {
  constructor (shape, component, paramValue, rdfShapesGraph) {
    this.shape = shape
    this.component = component
    this.paramValue = paramValue
    var parameterValues = {}
    var params = component.getParameters()
    for (var i = 0; i < params.length; i++) {
      var param = params[i]
      var value = paramValue || rdfShapesGraph.query().match(shape.shapeNode, param, '?value').getNode('?value')
      if (value) {
        var localName = RDFQuery.getLocalName(param.value)
        parameterValues[localName] = value
      }
    }
    this.parameterValues = parameterValues
  }

  getParameterValue (paramName) {
    return this.parameterValues[paramName]
  }
}

// class ConstraintComponent
// TODO: Make it a `class` once I figure out how to fix the `eval` part
var ConstraintComponent = function (node, context) {
  this.context = context
  this.node = node
  var parameters = []
  var parameterNodes = []
  var requiredParameters = []
  var optionals = {}
  var that = this
  this.context.$shapes.query()
    .match(node, 'sh:parameter', '?parameter')
    .match('?parameter', 'sh:path', '?path').forEach(function (sol) {
      parameters.push(sol.path)
      parameterNodes.push(sol.parameter)
      if (that.context.$shapes.query().match(sol.parameter, 'sh:optional', 'true').hasSolution()) {
        optionals[sol.path.value] = true
      } else {
        requiredParameters.push(sol.path)
      }
    })
  this.optionals = optionals
  this.parameters = parameters
  this.parameterNodes = parameterNodes
  this.requiredParameters = requiredParameters
  this.nodeValidationFunction = this.findValidationFunction(T('sh:nodeValidator'))
  if (!this.nodeValidationFunction) {
    this.nodeValidationFunction = this.findValidationFunction(T('sh:validator'))
    this.nodeValidationFunctionGeneric = true
  }
  this.propertyValidationFunction = this.findValidationFunction(T('sh:propertyValidator'))
  if (!this.propertyValidationFunction) {
    this.propertyValidationFunction = this.findValidationFunction(T('sh:validator'))
    this.propertyValidationFunctionGeneric = true
  }
}

ConstraintComponent.prototype.findValidationFunction = function (predicate) {
  var functionName = this.context.$shapes.query()
    .match(this.node, predicate, '?validator')
    .match('?validator', 'rdf:type', 'sh:JSValidator')
    .match('?validator', 'sh:jsFunctionName', '?functionName')
    .getNode('?functionName')
  var libraryNode = this.context.$shapes.query()
    .match(this.node, predicate, '?validator')
    .match('?validator', 'rdf:type', 'sh:JSValidator')
    .match('?validator', 'sh:jsLibrary', '?library')
    .getNode('?library')

  var libraries = []
  while (libraryNode != null) {
    var libraryUrl = this.context.$shapes.query().match(libraryNode, 'sh:jsLibraryURL', '?libraryUrl').getNode('?libraryUrl')
    if (libraryUrl == null) {
      break
    } else {
      libraries.unshift(libraryUrl.value)
    }
    libraryNode = this.context.$shapes.query().match(libraryNode, 'sh:jsLibrary', '?library').getNode('?library')
  }

  if (functionName) {
    var script = 'var makeFindInScript = function($data, $shapes, SHACL, TermFactory) {\n' +
        ' this.$data = $data; this.$shapes = $shapes; this.SHACL = SHACL; this.TermFactory = TermFactory;\n'
    for (var i = 0; i < libraries.length; i++) { script = script + this.context.functionsRegistry[libraries[i]] }
    script = script + '\n'
    script = script + '  return function(name) { return eval(name) }\n}'
    eval(script) // eslint-disable-line no-eval
    /* eslint-disable no-undef */
    var findInScript = makeFindInScript(this.context.$data, this.context.$shapes, this.context, TermFactory)
    /* eslint-enable no-undef */
    return new ValidationFunction(functionName.value, this.parameters, findInScript)
  } else {
    return null
  }
}

ConstraintComponent.prototype.getParameters = function () {
  return this.parameters
}

ConstraintComponent.prototype.isComplete = function (shapeNode) {
  for (var i = 0; i < this.parameters.length; i++) {
    var parameter = this.parameters[i]
    if (!this.isOptional(parameter.value)) {
      if (!this.context.$shapes.query().match(shapeNode, parameter, null).hasSolution()) {
        return false
      }
    }
  }
  return true
}

ConstraintComponent.prototype.isOptional = function (parameterURI) {
  return this.optionals[parameterURI]
}

class Shape {
  constructor (context, shapeNode) {
    this.context = context
    this.severity = context.$shapes.query().match(shapeNode, 'sh:severity', '?severity').getNode('?severity')
    if (!this.severity) {
      this.severity = T('sh:Violation')
    }

    this.deactivated = context.$shapes.query().match(shapeNode, 'sh:deactivated', 'true').hasSolution()
    this.path = context.$shapes.query().match(shapeNode, 'sh:path', '?path').getNode('?path')
    this.shapeNode = shapeNode
    this.constraints = []

    var handled = new NodeSet()
    var self = this
    var that = this
    context.$shapes.query().match(shapeNode, '?predicate', '?object').forEach(function (sol) {
      var component = that.context.shapesGraph.getComponentWithParameter(sol.predicate)
      if (component && !handled.contains(component.node)) {
        var params = component.getParameters()
        if (params.length === 1) {
          self.constraints.push(new Constraint(self, component, sol.object, context.$shapes))
        } else if (component.isComplete(shapeNode)) {
          self.constraints.push(new Constraint(self, component, undefined, context.$shapes))
          handled.add(component.node)
        }
      }
    })
  }

  getConstraints () {
    return this.constraints
  }

  getTargetNodes (rdfDataGraph) {
    var results = new NodeSet()

    if (new RDFQueryUtil(this.context.$shapes).isInstanceOf(this.shapeNode, T('rdfs:Class'))) {
      results.addAll(new RDFQueryUtil(rdfDataGraph).getInstancesOf(this.shapeNode).toArray())
    }

    this.context.$shapes.query()
      .match(this.shapeNode, 'sh:targetClass', '?targetClass').forEachNode('?targetClass', function (targetClass) {
        results.addAll(new RDFQueryUtil(rdfDataGraph).getInstancesOf(targetClass).toArray())
      })

    results.addAll(this.context.$shapes.query()
      .match(this.shapeNode, 'sh:targetNode', '?targetNode').getNodeArray('?targetNode'))

    this.context.$shapes.query()
      .match(this.shapeNode, 'sh:targetSubjectsOf', '?subjectsOf')
      .forEachNode('?subjectsOf', function (predicate) {
        results.addAll(rdfDataGraph.query().match('?subject', predicate, null).getNodeArray('?subject'))
      })

    this.context.$shapes.query()
      .match(this.shapeNode, 'sh:targetObjectsOf', '?objectsOf')
      .forEachNode('?objectsOf', function (predicate) {
        results.addAll(rdfDataGraph.query().match(null, predicate, '?object').getNodeArray('?object'))
      })

    return results.toArray()
  }

  getValueNodes (focusNode, rdfDataGraph) {
    if (this.path) {
      return rdfDataGraph.query().path(focusNode, toRDFQueryPath(this.context.$shapes, this.path), '?object').getNodeArray('?object')
    } else {
      return [focusNode]
    }
  }

  isPropertyShape () {
    return this.path != null
  }
}

function toRDFQueryPath ($shapes, shPath) {
  if (shPath.termType === 'Collection') {
    var paths = new RDFQueryUtil($shapes).rdfListToArray(shPath)
    var result = []
    for (var i = 0; i < paths.length; i++) {
      result.push(toRDFQueryPath($shapes, paths[i]))
    }
    return result
  }
  if (shPath.termType === 'NamedNode') {
    return shPath
  } else if (shPath.termType === 'BlankNode') {
    var util = new RDFQueryUtil($shapes)
    if (util.getObject(shPath, 'rdf:first')) {
      const paths = util.rdfListToArray(shPath)
      const result = []
      for (let i = 0; i < paths.length; i++) {
        result.push(toRDFQueryPath($shapes, paths[i]))
      }
      return result
    }
    var alternativePath = new RDFQuery($shapes).getObject(shPath, 'sh:alternativePath')
    if (alternativePath) {
      const paths = util.rdfListToArray(alternativePath)
      const result = []
      for (let i = 0; i < paths.length; i++) {
        result.push(toRDFQueryPath($shapes, paths[i]))
      }
      return { or: result }
    }
    var zeroOrMorePath = util.getObject(shPath, 'sh:zeroOrMorePath')
    if (zeroOrMorePath) {
      return { zeroOrMore: toRDFQueryPath($shapes, zeroOrMorePath) }
    }
    var oneOrMorePath = util.getObject(shPath, 'sh:oneOrMorePath')
    if (oneOrMorePath) {
      return { oneOrMore: toRDFQueryPath($shapes, oneOrMorePath) }
    }
    var zeroOrOnePath = util.getObject(shPath, 'sh:zeroOrOnePath')
    if (zeroOrOnePath) {
      return { zeroOrOne: toRDFQueryPath($shapes, zeroOrOnePath) }
    }
    var inversePath = util.getObject(shPath, 'sh:inversePath')
    if (inversePath) {
      return { inverse: toRDFQueryPath($shapes, inversePath) }
    }
  }
  throw new Error('Unsupported SHACL path ' + shPath)
  // TODO: implement conforming to AbstractQuery.path syntax
  // return shPath
}

async function fetchLibraries (libraries, context, acc) {
  if (libraries.length === 0) {
    return acc
  } else {
    var nextLibrary = libraries.shift()
    if (context.functionsRegistry[nextLibrary] != null) {
      return fetchLibraries(libraries, context, acc)
    } else {
      return new Promise((resolve, reject) => {
        var response = ''
        require('http').get(nextLibrary, (res) => {
          res.on('data', (b) => {
            response = response + b.toString()
          })

          res.on('error', (e) => {
            reject(e)
          })

          res.on('end', function () {
            acc[nextLibrary] = response
            resolve(fetchLibraries(libraries, context, acc))
          })
        })
      })
    }
  }
}

module.exports = ShapesGraph
