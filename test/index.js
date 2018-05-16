const {Validator} = require('../index')


const assert = require('assert')

describe('Validator', () => {
  describe('required', () => {
    it('should has errors if required value not present', function() {
      assert.equal(new Validator({a: null}).required('a').errors().get('a').length, 1)
      assert.equal(new Validator({a: undefined}).required('a').errors().get('a').length, 1)
    })

    it('should has no error if required value present', function() {
      assert.ok(new Validator({a: 0}).required('a').errors().isEmpty())
      assert.ok(new Validator({a: -1}).required('a').errors().isEmpty())
      assert.ok(new Validator({a: 1}).required('a').errors().isEmpty())
      assert.ok(new Validator({a: true}).required('a').errors().isEmpty())
      assert.ok(new Validator({a: false}).required('a').errors().isEmpty())
      assert.ok(new Validator({a: ''}).required('a').errors().isEmpty())
      assert.ok(new Validator({a: ' '}).required('a').errors().isEmpty())
    })
  })

  describe('isNumeric', () => {
    it('should has no error if value is valid number', function() {
      assert.ok(new Validator({a: null}).isNumeric('a').errors().isEmpty())
      assert.ok(new Validator({a: undefined}).isNumeric('a').errors().isEmpty())

      assert.ok(new Validator({a: 0}).isNumeric('a').errors().isEmpty())
      assert.ok(new Validator({a: 1}).isNumeric('a').errors().isEmpty())
      assert.ok(new Validator({a: '0'}).isNumeric('a').errors().isEmpty())
      assert.ok(new Validator({a: '1'}).isNumeric('a').errors().isEmpty())

      assert.ok(new Validator({a: 0.1212}).isNumeric('a').errors().isEmpty())
      assert.ok(new Validator({a: 1.2121}).isNumeric('a').errors().isEmpty())
      assert.ok(new Validator({a: '0.1212'}).isNumeric('a').errors().isEmpty())
      assert.ok(new Validator({a: '1.2121'}).isNumeric('a').errors().isEmpty())

      assert.ok(new Validator({a: -0}).isNumeric('a').errors().isEmpty())
      assert.ok(new Validator({a: -1}).isNumeric('a').errors().isEmpty())
      assert.ok(new Validator({a: '-0'}).isNumeric('a').errors().isEmpty())
      assert.ok(new Validator({a: '-1'}).isNumeric('a').errors().isEmpty())

      assert.ok(new Validator({a: -0.1212}).isNumeric('a').errors().isEmpty())
      assert.ok(new Validator({a: -2.1212}).isNumeric('a').errors().isEmpty())
      assert.ok(new Validator({a: '-0.1212'}).isNumeric('a').errors().isEmpty())
      assert.ok(new Validator({a: '-2.1212'}).isNumeric('a').errors().isEmpty())
    })

    it('should has errors if value is not valid number', function() {
      assert.ok(!new Validator({a: ''}).isNumeric('a').errors().isEmpty())
      assert.ok(!new Validator({a: '   '}).isNumeric('a').errors().isEmpty())

      assert.ok(!new Validator({a: 'a'}).isNumeric('a').errors().isEmpty())
      assert.ok(!new Validator({a: '0.0.0'}).isNumeric('a').errors().isEmpty())
      assert.ok(!new Validator({a: '212asd'}).isNumeric('a').errors().isEmpty())
      assert.ok(!new Validator({a: 'asdas123'}).isNumeric('a').errors().isEmpty())
    })
  })

  describe('largerThan', () => {

    it('should has errors if value is not valid number', () => {
      assert.equal(1, new Validator({a: ''}).largerThan('a', 0).errors().get('a').length)
      assert.equal(1, new Validator({a: '  '}).largerThan('a', 0).errors().get('a').length)
      assert.ok(!new Validator({a: 'a'}).largerThan('a', 0).errors().isEmpty())
      assert.ok(!new Validator({a: '0.0.0'}).largerThan('a', 0).errors().isEmpty())
      assert.ok(!new Validator({a: '212asd'}).largerThan('a', 0).errors().isEmpty())
      assert.ok(!new Validator({a: 'asdas123'}).largerThan('a', 0).errors().isEmpty())
    })

    it('should has no errors if min value is not valid number', () => {
      assert.equal(0, new Validator({a: 1}).largerThan('a', null).errors().get('a').length)
      assert.equal(0, new Validator({a: 1}).largerThan('a', undefined).errors().get('a').length)
      assert.equal(0, new Validator({a: 1}).largerThan('a', 'asd12').errors().get('a').length)
      assert.equal(0, new Validator({a: 1}).largerThan('a', '').errors().get('a').length)
    })

    it('should has errors if value not larger than min value', () => {
      assert.equal(1, new Validator({a: '-1'}).largerThan('a', 0).errors().get('a').length)
      assert.equal(1, new Validator({a: '-1'}).largerThan('a', 0).errors().get('a').length)
      assert.equal(1, new Validator({a: '-121'}).largerThan('a', 0).errors().get('a').length)
      assert.equal(1, new Validator({a: '32'}).largerThan('a', 100).errors().get('a').length)

      assert.equal(1, new Validator({a: '-1'}).largerThan('a', '0').errors().get('a').length)
      assert.equal(1, new Validator({a: '-1'}).largerThan('a', '0').errors().get('a').length)
      assert.equal(1, new Validator({a: '-121'}).largerThan('a', '0').errors().get('a').length)
      assert.equal(1, new Validator({a: '32'}).largerThan('a', '100').errors().get('a').length)

      assert.equal(1, new Validator({a: -1}).largerThan('a', 0).errors().get('a').length)
      assert.equal(1, new Validator({a: -1}).largerThan('a', 0).errors().get('a').length)
      assert.equal(1, new Validator({a: -121}).largerThan('a', 0).errors().get('a').length)
      assert.equal(1, new Validator({a: 32}).largerThan('a', 100).errors().get('a').length)

      assert.equal(1, new Validator({a: -1}).largerThan('a', '0').errors().get('a').length)
      assert.equal(1, new Validator({a: -1}).largerThan('a', '0').errors().get('a').length)
      assert.equal(1, new Validator({a: -121}).largerThan('a', '0').errors().get('a').length)
      assert.equal(1, new Validator({a: 32}).largerThan('a', '100').errors().get('a').length)

    })

    it('should has no errors if value larger than min value', () => {
      assert.equal(0, new Validator({a: 1}).largerThan('a', 0).errors().get('a').length)
      assert.equal(0, new Validator({a: 0}).largerThan('a', -1).errors().get('a').length)
      assert.equal(0, new Validator({a: 1}).largerThan('a', -1).errors().get('a').length)

      assert.equal(0, new Validator({a: 1}).largerThan('a', '0').errors().get('a').length)
      assert.equal(0, new Validator({a: 0}).largerThan('a', '-1').errors().get('a').length)
      assert.equal(0, new Validator({a: 1}).largerThan('a', '-1').errors().get('a').length)

      assert.equal(0, new Validator({a: '1'}).largerThan('a', 0).errors().get('a').length)
      assert.equal(0, new Validator({a: '0'}).largerThan('a', -1).errors().get('a').length)
      assert.equal(0, new Validator({a: '1'}).largerThan('a', -1).errors().get('a').length)

      assert.equal(0, new Validator({a: '1'}).largerThan('a', '0').errors().get('a').length)
      assert.equal(0, new Validator({a: '0'}).largerThan('a', '-1').errors().get('a').length)
      assert.equal(0, new Validator({a: '1'}).largerThan('a', '-1').errors().get('a').length)
    })

  })
})
