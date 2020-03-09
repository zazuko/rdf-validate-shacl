// rdfquery.js
// A simple RDF query library for JavaScript
//
// Contact: Holger Knublauch, TopQuadrant, Inc. (holger@topquadrant.com)
//
// The basic idea is that the function RDFQuery produces an initial
// Query object, which starts with a single "empty" solution.
// Each query object has a function nextSolution() producing an iteration
// of variable bindings ("volcano style").
// Each query object can be refined with subsequent calls to other
// functions, producing new queries.
// Invoking nextSolution on a query will pull solutions from its
// predecessors in a chain of query objects.
// The solution objects are plain JavaScript objects providing a
// mapping from variable names to RDF Term objects.
// Unless a query has been walked to exhaustion, .close() must be called.
//
// Finally, terminal functions such as .getNode() and .getArray() can be used
// to produce individual values.  All terminal functions close the query.
//
// RDF Term/Node objects are expected to follow the contracts from the
// RDF Representation Task Force's interface specification:
// https://github.com/rdfjs/representation-task-force/blob/master/interface-spec.md
//
// In order to bootstrap all this, graph objects need to implement a
// function .find(s, p, o) where each parameter is either an RDF term or null
// producing an iterator object with a .next() function that produces RDF triples
// (with attributes subject, predicate, object) or null when done.
//
// (Note I am not particularly a JavaScript guru so the modularization of this
// script may be improved to hide private members from public API etc).

/*
Example:

  const result = $data.query().
    match("owl:Class", "rdfs:label", "?label").
    match("?otherClass", "rdfs:label", "?label").
    filter(function(sol) { return !T("owl:Class").equals(sol.otherClass) }).
    getNode("?otherClass");

Equivalent SPARQL:
    SELECT ?otherClass
    WHERE {
      owl:Class rdfs:label ?label .
      ?otherClass rdfs:label ?label .
      FILTER (owl:Class != ?otherClass) .
    } LIMIT 1
*/
const DataFactory = require('./rdfquery/term-factory')
const { rdf } = require('./namespaces')

/**
 * Creates a query object for a given graph and optional initial solution.
 * The resulting object can be further refined using the functions on
 * AbstractQuery such as <code>match()</code> and <code>filter()</code>.
 * Functions such as <code>nextSolution()</code> can be used to get the actual results.
 * @param graph  the graph to query
 * @param initialSolution  the initial solutions or null for none
 * @returns a query object
 */
function RDFQuery (graph, initialSolution, options) {
  options = options || {}
  const factory = new DataFactory(options.factory || require('@rdfjs/dataset'))

  return new StartQuery(factory, graph, initialSolution || [])
}

class AbstractQuery {
  constructor (factory) {
    this.factory = factory
  }

  // ----------------------------------------------------------------------------
  // Query constructor functions, can be chained together
  // ----------------------------------------------------------------------------

  /**
   * Creates a new query that adds a binding for a given variable into
   * each solution produced by the input query.
   * @param varName  the name of the variable to bind, starting with "?"
   * @param bindFunction  a function that takes a solution object
   *                      and returns a node or null based on it.
   */
  bind (varName, bindFunction) {
    return new BindQuery(this.factory, this, varName, bindFunction)
  }

  /**
   * Creates a new query that filters the solutions produced by this.
   * @param filterFunction  a function that takes a solution object
   *                        and returns true iff that solution is valid
   */
  filter (filterFunction) {
    return new FilterQuery(this.factory, this, filterFunction)
  }

  /**
   * Creates a new query that only allows the first n solutions through.
   * @param limit  the maximum number of results to allow
   */
  limit (limit) {
    return new LimitQuery(this.factory, this, limit)
  }

  /**
   * Creates a new query doing a triple match.
   * In each subject, predicate, object position, the values can either be
   * an RDF term object or null (wildcard) or a string.
   * If it is a string it may either be a variable (starting with "?")
   * or the TTL representation of an RDF term using the T() function.
   * @param s  the match subject
   * @param p  the match predicate
   * @param o  the match object
   */
  match (s, p, o) {
    return new MatchQuery(this.factory, this, s, p, o)
  }

  /**
   * Creates a new query that sorts all input solutions by the bindings
   * for a given variable.
   * @param varName  the name of the variable to sort by, starting with "?"
   */
  orderBy (varName) {
    return new OrderByQuery(this.factory, this, varName)
  }

  /**
   * Creates a new query doing a match where the predicate may be a RDF Path object.
   * Note: This is currently not using lazy evaluation and will always walk all matches.
   * Path syntax:
   * - PredicatePaths: NamedNode
   * - SequencePaths: [path1, path2]
   * - AlternativePaths: { or : [ path1, path2 ] }
   * - InversePaths: { inverse : path }   LIMITATION: Only supports NamedNodes for path here
   * - ZeroOrMorePaths: { zeroOrMore : path }
   * - OneOrMorePaths: { oneOrMore : path }
   * - ZeroOrOnePaths: { zeroOrOne : path }
   * @param s  the match subject or a variable name (string) - must have a value
   *           at execution time!
   * @param path  the match path object (e.g. a NamedNode for a simple predicate hop)
   * @param o  the match object or a variable name (string)
   */
  path (s, path, o) {
    if (path && path.value && path.termType === 'NamedNode') {
      return new MatchQuery(this.factory, this, s, path, o)
    } else {
      return new PathQuery(this.factory, this, s, path, o)
    }
  }

  // TODO: add other SPARQL-like query types
  //       - .distinct()
  //       - .union(otherQuery)

  // ----------------------------------------------------------------------------
  // Terminal functions - convenience functions to get values.
  // All these functions close the solution iterators.
  // ----------------------------------------------------------------------------

  /**
   * Adds all nodes produced by a given solution variable into a set.
   * The set must have an add(node) function.
   * @param varName  the name of the variable, starting with "?"
   * @param set  the set to add to
   */
  addAllNodes (varName, set) {
    const attrName = var2Attr(varName)
    for (let sol = this.nextSolution(); sol; sol = this.nextSolution()) {
      const node = sol[attrName]
      if (node) {
        set.add(node)
      }
    }
  }

  /**
   * Produces an array of triple objects where each triple object has properties
   * subject, predicate and object derived from the provided template values.
   * Each of these templates can be either a variable name (starting with '?'),
   * an RDF term string (such as "rdfs:label") or a JavaScript node object.
   * @param subject  the subject node
   * @param predicate  the predicate node
   * @param object  the object node
   */
  construct (subject, predicate, object) {
    const results = []
    for (let sol = this.nextSolution(); sol; sol = this.nextSolution()) {
      let s = null
      if (typeof subject === 'string') {
        if (subject.indexOf('?') === 0) {
          s = sol[var2Attr(subject)]
        } else {
          s = this.factory.term(subject)
        }
      } else {
        s = subject
      }
      let p = null
      if (typeof predicate === 'string') {
        if (predicate.indexOf('?') === 0) {
          p = sol[var2Attr(predicate)]
        } else {
          p = this.factory.term(predicate)
        }
      } else {
        p = predicate
      }

      let o = null
      if (typeof object === 'string') {
        if (object.indexOf('?') === 0) {
          o = sol[var2Attr(object)]
        } else {
          o = this.factory.term(object)
        }
      } else {
        o = object
      }

      if (s && p && o) {
        results.push({ subject: s, predicate: p, object: o })
      }
    }
    return results
  }

  /**
   * Executes a given function for each solution.
   * @param callback  a function that takes a solution as argument
   */
  forEach (callback) {
    for (let n = this.nextSolution(); n; n = this.nextSolution()) {
      callback(n)
    }
  }

  /**
   * Executes a given function for each node in a solution set.
   * @param varName  the name of a variable, starting with "?"
   * @param callback  a function that takes a node as argument
   */
  forEachNode (varName, callback) {
    const attrName = var2Attr(varName)
    for (let sol = this.nextSolution(); sol; sol = this.nextSolution()) {
      const node = sol[attrName]
      if (node) {
        callback(node)
      }
    }
  }

  /**
   * Turns all result solutions into an array.
   * @return an array consisting of solution objects
   */
  getArray () {
    const results = []
    for (let n = this.nextSolution(); n != null; n = this.nextSolution()) {
      results.push(n)
    }
    return results
  }

  /**
   * Gets the number of (remaining) solutions.
   * @return the count
   */
  getCount () {
    return this.getArray().length // Quick and dirty implementation
  }

  /**
   * Gets the next solution and, if that exists, returns the binding for a
   * given variable from that solution.
   * @param varName  the name of the binding to get, starting with "?"
   * @return the value of the variable or null or undefined if it doesn't exist
   */
  getNode (varName) {
    const s = this.nextSolution()
    if (s) {
      this.close()
      return s[var2Attr(varName)]
    } else {
      return null
    }
  }

  /**
   * Turns all results into an array of bindings for a given variable.
   * @return an array consisting of RDF node objects
   */
  getNodeArray (varName) {
    const results = []
    const attr = var2Attr(varName)
    for (let n = this.nextSolution(); n != null; n = this.nextSolution()) {
      results.push(n[attr])
    }
    return results
  }

  /**
   * Turns all result bindings for a given variable into a set.
   * The set has functions .contains and .toArray.
   * @param varName  the name of the variable, starting with "?"
   * @return a set consisting of RDF node objects
   */
  getNodeSet (varName) {
    const results = new NodeSet()
    const attr = var2Attr(varName)
    for (let n = this.nextSolution(); n != null; n = this.nextSolution()) {
      results.add(n[attr])
    }
    return results
  }

  /**
   * Queries the underlying graph for the object of a subject/predicate combination,
   * where either subject or predicate can be a variable which is substituted with
   * a value from the next input solution.
   * Note that even if there are multiple solutions it will just return the "first"
   * one and since the order of triples in RDF is undefined this may lead to random results.
   * Unbound values produce errors.
   * @param subject  an RDF term or a variable (starting with "?") or a TTL representation
   * @param predicate  an RDF term or a variable (starting with "?") or a TTL representation
   * @return the object of the "first" triple matching the subject/predicate combination
   */
  getObject (subject, predicate) {
    const sol = this.nextSolution()
    if (sol) {
      this.close()
      let s
      if (typeof subject === 'string') {
        if (subject.indexOf('?') === 0) {
          s = sol[var2Attr(subject)]
        } else {
          s = this.factory.term(subject)
        }
      } else {
        s = subject
      }
      if (!s) {
        throw new Error('getObject() called with null subject')
      }
      let p
      if (typeof predicate === 'string') {
        if (predicate.indexOf('?') === 0) {
          p = sol[var2Attr(predicate)]
        } else {
          p = this.factory.term(predicate)
        }
      } else {
        p = predicate
      }
      if (!p) {
        throw new Error('getObject() called with null predicate')
      }

      const it = this.source.find(s, p, null)
      const triple = it.next()
      if (triple) {
        it.close()
        return triple.object
      }
    }
    return null
  }

  /**
   * Tests if there is any solution and closes the query.
   * @return true if there is another solution
   */
  hasSolution () {
    if (this.nextSolution()) {
      this.close()
      return true
    } else {
      return false
    }
  }
}

// ----------------------------------------------------------------------------
// Expression functions - may be used in filter and bind queries
// ----------------------------------------------------------------------------

/**
 * Creates a function that takes a solution and compares a given node with
 * the binding of a given variable from that solution.
 * @param varName  the name of the variable (starting with "?")
 * @param node  the node to compare with
 * @returns true if the solution's variable equals the node
 */
function exprEquals (varName, node) {
  return function (sol) {
    return node.equals(sol[var2Attr(varName)])
  }
}

/**
 * Creates a function that takes a solution and compares a given node with
 * the binding of a given variable from that solution.
 * @param varName  the name of the variable (starting with "?")
 * @param node  the node to compare with
 * @returns true if the solution's variable does not equal the node
 */
function exprNotEquals (varName, node) {
  return function (sol) {
    return !node.equals(sol[var2Attr(varName)])
  }
}

// ----------------------------------------------------------------------------
// END OF PUBLIC API ----------------------------------------------------------
// ----------------------------------------------------------------------------

// Takes all input solutions but adds a value for a given variable so that
// the value is computed by a given function based on the current solution.
// It is illegal to use a variable that already has a value from the input.
class BindQuery extends AbstractQuery {
  constructor (factory, input, varName, bindFunction) {
    super(factory)

    this.attr = var2Attr(varName)
    this.source = input.source
    this.input = input
    this.bindFunction = bindFunction
  }

  close () {
    this.input.close()
  }

  // Pulls the next result from the input Query and passes it into
  // the given bind function to add a new node
  nextSolution () {
    const result = this.input.nextSolution()
    if (result == null) {
      return null
    } else {
      const newNode = this.bindFunction(result)
      if (newNode) {
        result[this.attr] = newNode
      }
      return result
    }
  }
}

// Filters the incoming solutions, only letting through those where
// filterFunction(solution) returns true
class FilterQuery extends AbstractQuery {
  constructor (factory, input, filterFunction) {
    super(factory)

    this.source = input.source
    this.input = input
    this.filterFunction = filterFunction
  }

  close () {
    this.input.close()
  }

  // Pulls the next result from the input Query and passes it into
  // the given filter function
  nextSolution () {
    for (;;) {
      const result = this.input.nextSolution()
      if (result == null) {
        return null
      } else if (this.filterFunction(result) === true) {
        return result
      }
    }
  }
}

// Only allows the first n values of the input query through
class LimitQuery extends AbstractQuery {
  constructor (factory, input, limit) {
    super(factory)

    this.source = input.source
    this.input = input
    this.limit = limit
  }

  close () {
    this.input.close()
  }

  // Pulls the next result from the input Query unless the number
  // of previous calls has exceeded the given limit
  nextSolution () {
    if (this.limit > 0) {
      this.limit--
      return this.input.nextSolution()
    } else {
      this.input.close()
      return null
    }
  }
}

// Joins the solutions from the input Query with triple matches against
// the current input graph.
class MatchQuery extends AbstractQuery {
  constructor (factory, input, s, p, o) {
    super(factory)

    this.source = input.source
    this.input = input
    if (typeof s === 'string') {
      if (s.indexOf('?') === 0) {
        this.sv = var2Attr(s)
      } else {
        this.s = this.factory.term(s)
      }
    } else {
      this.s = s
    }
    if (typeof p === 'string') {
      if (p.indexOf('?') === 0) {
        this.pv = var2Attr(p)
      } else {
        this.p = this.factory.term(p)
      }
    } else {
      this.p = p
    }
    if (typeof o === 'string') {
      if (o.indexOf('?') === 0) {
        this.ov = var2Attr(o)
      } else {
        this.o = this.factory.term(o)
      }
    } else {
      this.o = o
    }
  }

  close () {
    this.input.close()
    if (this.ownIterator) {
      this.ownIterator.close()
    }
  }

  // This pulls the first solution from the input Query and uses it to
  // create an "ownIterator" which applies the input solution to those
  // specified by s, p, o.
  // Once this "ownIterator" has been exhausted, it moves to the next
  // solution from the input Query, and so on.
  // At each step, it produces the union of the input solutions plus the
  // own solutions.
  nextSolution () {
    const oit = this.ownIterator
    if (oit) {
      const n = oit.next()
      if (n != null) {
        const result = createSolution(this.inputSolution)
        if (this.sv) {
          result[this.sv] = n.subject
        }
        if (this.pv) {
          result[this.pv] = n.predicate
        }
        if (this.ov) {
          result[this.ov] = n.object
        }
        return result
      } else {
        delete this.ownIterator // Mark as exhausted
      }
    }

    // Pull from input
    this.inputSolution = this.input.nextSolution()
    if (this.inputSolution) {
      const sm = this.sv ? this.inputSolution[this.sv] : this.s
      const pm = this.pv ? this.inputSolution[this.pv] : this.p
      const om = this.ov ? this.inputSolution[this.ov] : this.o
      this.ownIterator = this.source.find(sm, pm, om)
      return this.nextSolution()
    } else {
      return null
    }
  }
}

// Sorts all solutions from the input stream by a given variable
class OrderByQuery extends AbstractQuery {
  constructor (factory, input, varName) {
    super(factory)

    this.input = input
    this.source = input.source
    this.attrName = var2Attr(varName)
  }

  close () {
    this.input.close()
  }

  nextSolution () {
    if (!this.solutions) {
      this.solutions = this.input.getArray()
      const attrName = this.attrName
      this.solutions.sort(function (s1, s2) {
        return compareTerms(s1[attrName], s2[attrName])
      })
      this.index = 0
    }
    if (this.index < this.solutions.length) {
      return this.solutions[this.index++]
    } else {
      return null
    }
  }
}

// Expects subject and path to be bound and produces all bindings
// for the object variable or matches that by evaluating the given path
class PathQuery extends AbstractQuery {
  constructor (factory, input, subject, path, object) {
    super(factory)

    this.input = input
    this.source = input.source
    if (typeof subject === 'string' && subject.indexOf('?') === 0) {
      this.subjectAttr = var2Attr(subject)
    } else {
      this.subject = subject
    }
    if (path == null) {
      throw new Error('Path cannot be unbound')
    }
    if (typeof path === 'string') {
      this.path_ = this.factory.term(path)
    } else {
      this.path_ = path
    }
    if (typeof object === 'string' && object.indexOf('?') === 0) {
      this.objectAttr = var2Attr(object)
    } else {
      this.object = object
    }
  }

  close () {
    this.input.close()
  }

  nextSolution () {
    const r = this.pathResults
    if (r) {
      const n = r[this.pathIndex++]
      const result = createSolution(this.inputSolution)
      if (this.objectAttr) {
        result[this.objectAttr] = n
      }
      if (this.pathIndex === r.length) {
        delete this.pathResults // Mark as exhausted
      }
      return result
    }

    // Pull from input
    this.inputSolution = this.input.nextSolution()
    if (this.inputSolution) {
      const sm = this.subjectAttr ? this.inputSolution[this.subjectAttr] : this.subject
      if (sm == null) {
        throw new Error('Path cannot have unbound subject')
      }
      const om = this.objectAttr ? this.inputSolution[this.objectAttr] : this.object
      const pathResultsSet = new NodeSet()
      addPathValues(this.source, sm, this.path_, pathResultsSet)
      this.pathResults = pathResultsSet.toArray()
      if (this.pathResults.length === 0) {
        delete this.pathResults
      } else if (om) {
        delete this.pathResults
        if (pathResultsSet.contains(om)) {
          return this.inputSolution
        }
      } else {
        this.pathIndex = 0
      }
      return this.nextSolution()
    } else {
      return null
    }
  }
}

// This simply produces a single result: the initial solution
class StartQuery extends AbstractQuery {
  constructor (factory, source, initialSolution) {
    super(factory)

    this.source = source
    if (initialSolution && initialSolution.length > 0) {
      this.solution = initialSolution
    } else {
      this.solution = [{}]
    }
  }

  close () {
  }

  nextSolution () {
    if (this.solution) {
      if (this.solution.length > 0) {
        return this.solution.shift()
      } else {
        delete this.solution
      }
    }
  }
}

// Helper functions

function createSolution (base) {
  const result = {}
  for (const attr in base) {
    if (Object.prototype.hasOwnProperty.call(base, attr)) {
      result[attr] = base[attr]
    }
  }
  return result
}

function compareTerms (t1, t2) {
  if (!t1) {
    return !t2 ? 0 : 1
  } else if (!t2) {
    return -1
  }
  const bt = t1.termType.localeCompare(t2.termType)
  if (bt !== 0) {
    return bt
  } else {
    // TODO: Does not handle numeric or date comparison
    const bv = t1.value.localeCompare(t2.value)
    if (bv !== 0) {
      return bv
    } else {
      if (t1.termType === 'Literal') {
        const bd = t1.datatype.value.localeCompare(t2.datatype.value)
        if (bd !== 0) {
          return bd
        } else if (rdf.langString.equals(t1.datatype)) {
          return t1.language.localeCompare(t2.language)
        } else {
          return 0
        }
      } else {
        return 0
      }
    }
  }
}

function getLocalName (uri) {
  // TODO: This is not the 100% correct local name algorithm
  let index = uri.lastIndexOf('#')
  if (index < 0) {
    index = uri.lastIndexOf('/')
  }
  if (index < 0) {
    throw new Error('Cannot get local name of ' + uri)
  }
  return uri.substring(index + 1)
}

// (a super-primitive implementation for now!)
class NodeSet {
  constructor () {
    this.values = []
  }

  add (node) {
    if (!this.contains(node)) {
      this.values.push(node)
    }
  }

  addAll (nodes) {
    for (let i = 0; i < nodes.length; i++) {
      this.add(nodes[i])
    }
  }

  contains (node) {
    for (let i = 0; i < this.values.length; i++) {
      if (this.values[i].equals(node)) {
        return true
      }
    }
    return false
  }

  forEach (callback) {
    for (let i = 0; i < this.values.length; i++) {
      callback(this.values[i])
    }
  }

  size () {
    return this.values.length
  }

  toArray () {
    return this.values
  }

  toString () {
    let str = 'NodeSet(' + this.size() + '): ['
    const arr = this.toArray()
    for (let i = 0; i < arr.length; i++) {
      if (i > 0) {
        str += ', '
      }
      str += arr[i]
    }
    return str + ']'
  }
}

function var2Attr (varName) {
  if (!varName.indexOf('?') === 0) {
    throw new Error('Variable name must start with ?')
  }
  if (varName.length === 1) {
    throw new Error('Variable name too short')
  }
  return varName.substring(1)
}

// Simple Path syntax implementation:
// Adds all matches for a given subject and path combination into a given NodeSet.
// This should really be doing lazy evaluation and only up to the point
// where the match object is found.
function addPathValues (graph, subject, path, set) {
  if (path.termType === 'NamedNode' && path.value) {
    set.addAll(RDFQuery(graph).match(subject, path, '?object').getNodeArray('?object'))
  } else if (Array.isArray(path)) {
    let s = new NodeSet()
    s.add(subject)
    for (let i = 0; i < path.length; i++) {
      const a = s.toArray()
      s = new NodeSet()
      for (let j = 0; j < a.length; j++) {
        addPathValues(graph, a[j], path[i], s)
      }
    }
    set.addAll(s.toArray())
  } else if (path.or) {
    for (let i = 0; i < path.or.length; i++) {
      addPathValues(graph, subject, path.or[i], set)
    }
  } else if (path.inverse) {
    if (path.inverse.termType === 'NamedNode') {
      set.addAll(RDFQuery(graph).match('?subject', path.inverse, subject).getNodeArray('?subject'))
    } else {
      throw new Error('Unsupported: Inverse paths only work for named nodes')
    }
  } else if (path.zeroOrOne) {
    addPathValues(graph, subject, path.zeroOrOne, set)
    set.add(subject)
  } else if (path.zeroOrMore) {
    walkPath(graph, subject, path.zeroOrMore, set, new NodeSet())
    set.add(subject)
  } else if (path.oneOrMore) {
    walkPath(graph, subject, path.oneOrMore, set, new NodeSet())
  } else {
    throw new Error('Unsupported path object: ' + path)
  }
}

function walkPath (graph, subject, path, set, visited) {
  visited.add(subject)
  const s = new NodeSet()
  addPathValues(graph, subject, path, s)
  const a = s.toArray()
  set.addAll(a)
  for (let i = 0; i < a.length; i++) {
    if (!visited.contains(a[i])) {
      walkPath(graph, a[i], path, set, visited)
    }
  }
}

RDFQuery.getLocalName = getLocalName
RDFQuery.compareTerms = compareTerms
RDFQuery.exprEquals = exprEquals
RDFQuery.exprNotEquals = exprNotEquals
RDFQuery.NodeSet = NodeSet

module.exports = RDFQuery
