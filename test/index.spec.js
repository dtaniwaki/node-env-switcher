const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
let expect = chai.expect
chai.use(sinonChai)

const index = require('../lib/index')

describe('index', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('returns functions', function () {
    expect(typeof index.express).to.be.eq('function')
    expect(typeof index.koa).to.be.eq('function')
  })
})
