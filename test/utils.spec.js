const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
let expect = chai.expect
chai.use(sinonChai)

const utils = require('../lib/utils')

describe('utils', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  describe('#encode64Cipher', function () {
    it('encodes strings', function () {
      expect(utils.encode64Cipher('abcdefg', 'aiueo')).to.be.eq('CPYcTUbq0TwKuQT1pnI2xA==')
    })
  })

  describe('#decode64Cipher', function () {
    it('decodes strings', function () {
      expect(utils.decode64Cipher('CPYcTUbq0TwKuQT1pnI2xA==', 'aiueo')).to.be.eq('abcdefg')
    })

    describe('invalid string', function () {
      it('decodes strings', function () {
        expect(utils.decode64Cipher('aaa', 'aiueo')).to.be.eq('')
      })
    })
  })
})
