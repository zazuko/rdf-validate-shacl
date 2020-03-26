const globalObject = typeof window !== 'undefined' ? window : global

class ValidationFunction {
  constructor (context, functionName, func) {
    this.context = context
    this.funcName = functionName
    this.func = func
  }

  execute (focusNode, valueNode, constraint) {
    return this.func.apply(globalObject, [this.context, focusNode, valueNode, constraint])
  }
}

module.exports = ValidationFunction
