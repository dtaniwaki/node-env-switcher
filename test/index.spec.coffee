chai = require 'chai'
sinon = require 'sinon'
sinonChai = require 'sinon-chai'
expect = chai.expect
chai.use(sinonChai)

index = require '../lib/index'

describe 'index', ->
  beforeEach ->
    @sandbox = sinon.sandbox.create()

  afterEach ->
    @sandbox.restore()

  it 'returns objects', ->
    expect(typeof index.cookies).to.be.eq 'object'
