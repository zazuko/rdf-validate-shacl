const globalObject = typeof window !== 'undefined' ? window : global

class ValidationFunction {
  constructor(context, functionName, func) {
    this.context = context
    this.funcName = functionName
    this.func = func
  }

  compile(constraint) {
    return new ValidationFunction(this.context, this.funcName, this.func.apply(globalObject, [this.context, constraint]))
  }

  execute(focusNode, valueNode) {
    return this.func.apply(globalObject, [this.context, focusNode, valueNode])
  }
}

export default ValidationFunction
