class Collection {
  constructor () {
    this._data = []
  }

  // get all keys
  keys () {
    return _.map(this._data, item => item.key)
  }

  // put a value in with a key
  put (key, value) {
    let item = _.find(this._data, d => d.key === key)

    if (!item) {
      item = {
        key,
        _data: [],
      }
      this._data.push(item)
    }

    // duplicate value is not allowed
    if (item._data.indexOf(value) > -1) return

    item._data.push(value)
  }

  // given a key, fetch its content
  get (key) {
    let item = _.find(this._data, d => d.key === key)
    if (!item) {
      return []
    }

    return item._data
  }

  // used to check whether this collection is empty
  isEmpty () {
    return _.reduce(this._data, (result, item) => {
      result += item._data.length
      return result
    }, 0) === 0
  }

  // given a clean, remove it
  clear (key) {
    if (!key) {
      this._data = []
      return
    }
    _.remove(this._data, item => item.key === key)
  }

  // merge
  merge (other) {
    if (other.constructor.name !== 'Collection') {
      throw new Error('only collection can be merged')
    }

    let keys = other.keys()

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]
      let _data = other.get(key)
      if (!_data) continue

      for (let j = 0; j < _data.length; j++) {
        this.put(key, _data[j])
      }
    }
  }
}

module.exports = Collection
