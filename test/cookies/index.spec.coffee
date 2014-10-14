chai = require 'chai'
sinon = require 'sinon'
sinonChai = require 'sinon-chai'
expect = chai.expect
chai.use(sinonChai)

cookies = require '../../lib/cookies'

describe 'index', ->
  beforeEach ->
    @sandbox = sinon.sandbox.create()

  afterEach ->
    @sandbox.restore()

  it 'has koa', ->
    expect(typeof cookies.koa).to.be.eq 'function'
