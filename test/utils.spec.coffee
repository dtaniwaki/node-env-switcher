chai = require 'chai'
sinon = require 'sinon'
sinonChai = require 'sinon-chai'
expect = chai.expect
chai.use(sinonChai)

utils = require '../lib/utils'

describe 'utils', ->
  beforeEach ->
    @sandbox = sinon.sandbox.create()

  afterEach ->
    @sandbox.restore()

  describe '#encode64Cipher', ->
    it 'encodes strings', ->
      expect(utils.encode64Cipher('abcdefg', 'aiueo')).to.be.eq 'CPYcTUbq0TwKuQT1pnI2xA=='

  describe '#decode64Cipher', ->
    it 'decodes strings', ->
      expect(utils.decode64Cipher('CPYcTUbq0TwKuQT1pnI2xA==', 'aiueo')).to.be.eq 'abcdefg'

    describe 'invalid string', ->
      it 'decodes strings', ->
        expect(utils.decode64Cipher('aaa', 'aiueo')).to.be.eq ''
