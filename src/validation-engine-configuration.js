
class ValidationEngineConfiguration {
  constructor () {
    // By default validate all errors
    this.validationErrorBatch = -1
  }

  setValidationErrorBatch (validationErrorBatch) {
    this.validationErrorBatch = validationErrorBatch
    return this
  }

  getValidationErrorBatch () {
    return this.validationErrorBatch
  }
}

module.exports = ValidationEngineConfiguration
