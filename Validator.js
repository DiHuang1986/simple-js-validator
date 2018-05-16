class Validator {
  constructor (target, TranslateService) {
    this._errors = new Collection()
    this._data = target

    this._translate = {
      _translate (value) {
        return value
      },
    }

    if (TranslateService && TranslateService.translate) {
      this._translate = TranslateService
    }
  }

  required (name) {
    let value = this._data[name]
    if (this._isNull(value)) {
      this._errors.put(name, this._translate.translate('attribute_is_required', {
        name,
      }))
    }
    return this
  }

  notBlank (name) {
    let value = this._data[name]
    if (this._isNull(value) || value.toString().trim() === '') {
      this._errors.put(name, this._translate.translate('attribute_can_not_blank', {
        name,
      }))
    }
    return this
  }

  isNumeric (name) {
    let value = this._data[name]
    if (!this._isNumeric(value)) {
      this._errors.put(name, this._translate.translate('attribute_is_not_valid_number', {
        name,
      }))
    }
    return this
  }

  largerThan (name, minValue) {
    let value = this._data[name]
    // min value not provided, means no min limit, always true
    if (this._isNull(minValue)) return this

    // not numeric, return
    if (!this._isNumeric(value)) {
      return this.isNumeric(value, name)
    }

    let parsedMinValue = parseFloat(minValue)
    let parsedValue = parseFloat(value)

    // min value provided is not valid number, no min limit, always true
    if (isNaN(parsedMinValue)) {
      return this
    }

    if (parsedValue < parsedMinValue) {
      this._errors.put(name, this._translate.translate('attribute_is_less_than_min_value', {
        name,
        minValue: parsedMinValue,
      }))
    }

    return this
  }

  lessThan (name, maxValue) {
    let value = this._data[name]
    // max value not provided, means no max limit, always true
    if (this._isNull(maxValue)) return this

    // not numeric, return
    if (!this._isNumeric(value)) {
      return this.isNumeric(value, name)
    }

    let parsedMaxValue = parseFloat(maxValue)
    let parsedValue = parseFloat(value)

    // max value provided is not valid number, no max limit, always true
    if (isNaN(parsedMaxValue)) {
      return this
    }

    if (parsedValue > parsedMaxValue) {
      this._errors.put(name, this._translate.translate('attribute_is_larger_than_max_value', {
        name,
        maxValue: parsedMaxValue,
      }))
    }

    return this
  }

  _isNull (value) {
    return value === null || value === undefined
  }

  _isNumeric (value) {
    if (this._isNull(value)) return true

    let NUMERIC_PATTERN = /^(-|\+)?\d+(.\d*)?$/
    return NUMERIC_PATTERN.test(value)
  }

  errors () {
    return this._errors
  }
}

module.exports = Validator
