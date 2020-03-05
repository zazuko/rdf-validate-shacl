// class ValidationFunction
const RDFQuery = require('./rdfquery')
const debug = require('debug')('validation-function')

const globalObject = typeof window !== 'undefined' ? window : global

class ValidationFunction {
  constructor (context, functionName, parameters, func) {
    this.context = context
    this.funcName = functionName
    this.func = func

    // Get list of argument of the function, see
    // https://davidwalsh.name/javascript-arguments
    const args = this.func.toString().match(/function\s.*?\(([^)]*)\)/)[1]
    const funcArgsRaw = args.split(',').map(function (arg) {
      return arg.replace(/\/\*.*\*\//, '').trim()
    }).filter(function (arg) {
      return arg
    })
    this.funcArgs = []
    this.parameters = []
    for (let i = 0; i < funcArgsRaw.length; i++) {
      let arg = funcArgsRaw[i]
      if (arg.indexOf('$') === 0) {
        arg = arg.substring(1)
      }
      this.funcArgs.push(arg)
      for (let j = 0; j < parameters.length; j++) {
        const parameter = parameters[j]
        const localName = RDFQuery.getLocalName(parameter.value)
        if (arg === localName) {
          this.parameters[i] = parameter
          break
        }
      }
    }
  }

  doExecute (args) {
    return this.func.apply(globalObject, args)
  }

  execute (focusNode, valueNode, constraint) {
    debug('Validating ' + this.funcName)
    const args = []

    for (let i = 0; i < this.funcArgs.length; i++) {
      const arg = this.funcArgs[i]
      const param = this.parameters[i]
      if (param) {
        const value = constraint.getParameterValue(arg)
        args.push(value)
      } else if (arg === 'focusNode') {
        args.push(focusNode)
      } else if (arg === 'value') {
        args.push(valueNode)
      } else if (arg === 'currentShape') {
        args.push(constraint.shape.shapeNode)
      } else if (arg === 'path') {
        args.push(constraint.shape.path)
      } else if (arg === 'shapesGraph') {
        args.push('DummyShapesGraph')
      } else if (arg === 'this') {
        args.push(focusNode)
      } else if (arg === 'context') {
        args.push(this.context)
      } else {
        throw new Error('Unexpected validator function argument ' + arg + ' for function ' + this.funcName)
      }
    }
    return this.doExecute(args)
  }
}

module.exports = ValidationFunction
