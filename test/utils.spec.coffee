chai = require 'chai'
sinon = require 'sinon'
sinonChai = require 'sinon-chai'
expect = chai.expect
chai.use(sinonChai)

utils = require '../src/utils'

describe 'utils', ->
  beforeEach ->
    @sandbox = sinon.sandbox.create()

  afterEach ->
    @sandbox.restore()

  describe '#encodeBase64', ->
    it 'encodes strings', ->
      expect(utils.encodeBase64('abcdefg')).to.be.eq 'YWJjZGVmZw'

    describe 'chomp padding', ->
      it 'encodes strings', ->
        expect(utils.encodeBase64('aaa')).to.be.eq 'YWFh'

  describe '#decodeBase64', ->
    it 'decodes strings', ->
      expect(utils.decodeBase64('YWJjZGVmZw')).to.be.eq 'abcdefg'

    describe 'add padding', ->
      it 'decodes strings', ->
        expect(utils.decodeBase64('YWFh')).to.be.eq 'aaa'
