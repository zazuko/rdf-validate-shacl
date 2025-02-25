const globalObject = typeof window !== 'undefined' ? window : global

class ValidationFunction {
  /**
   * @param {import('../index.js').default} context
   * @param {string} functionName
   * @param {import('./validation-engine.js').ValidationFunction} func
   */
  constructor(context, functionName, func) {
    this.context = context
    this.funcName = functionName
    this.func = func
  }

  /**
   * @param {import('@rdfjs/types').Term} focusNode
   * @param {import('@rdfjs/types').Term} valueNode
   * @param {import('./shapes-graph.js').Constraint} constraint
   * @returns {ReturnType<import('./validation-engine.js').ValidationFunction>}
   */
  execute(focusNode, valueNode, constraint) {
    return this.func.apply(globalObject, [this.context, focusNode, valueNode, constraint])
  }
}

export default ValidationFunction
