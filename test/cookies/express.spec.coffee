chai = require 'chai'
sinon = require 'sinon'
sinonChai = require 'sinon-chai'
expect = chai.expect
chai.use(sinonChai)

http = require 'http'
domain = require 'domain'
express = require 'express'
cookieParser = require 'cookie-parser'
request = require 'supertest'
handler = require '../../lib/cookies/express'

describe 'cookies/express', ->
  beforeEach ->
    @sandbox = sinon.sandbox.create()

  afterEach ->
    @sandbox.restore()

  beforeEach ->
    process.env.NODE_DEBUG ||= ''
    @sandbox.stub process.env, 'NODE_DEBUG', 'init'
    @app = express()
    @app.use cookieParser()
    
    @debug = ''

    @middleware = (req, res, next) =>
      @debug = process.env.NODE_DEBUG
      next()
    @errorMiddleware = (req, res, next) =>
      @debug = process.env.NODE_DEBUG
      next new Error(500)

  describe 'with cookie', ->
    describe 'normal case', ->
      beforeEach ->
        @app.use handler('test')
        @app.use @middleware
        @server = http.createServer @app

      it 'switches NODE_DEBUG', (done) ->
        request(@server)
        .get '/'
        .set 'Cookie', 'test=foo'
        .end (err, res) =>
          return done err if err
          expect(@debug).to.be.eq 'foo'
          expect(process.env.NODE_DEBUG).to.be.eq 'init'
          done(err)

    describe 'exception', ->
      beforeEach ->
        @app.use handler('test')
        @app.use @errorMiddleware
        @server = http.createServer @app

      it 'switches NODE_DEBUG', (done) ->
        request(@server)
        .get '/'
        .set 'Cookie', 'test=foo'
        .end (err, res) =>
          return done err if err
          expect(@debug).to.be.eq 'foo'
          expect(process.env.NODE_DEBUG).to.be.eq 'init'
          done(err)

    describe 'secure option', ->
      beforeEach ->
        @app.use handler('test', secure: true, password: 'bar')
        @app.use @middleware
        @server = http.createServer @app

      it 'switches NODE_DEBUG', (done) ->
        request(@server)
        .get '/'
        .set 'Cookie', 'test=2ZiAnuJ7MWmj8Clr4m835g=='
        .end (err, res) =>
          return done err if err
          expect(@debug).to.be.eq 'foo'
          expect(process.env.NODE_DEBUG).to.be.eq 'init'
          done(err)

  describe 'without cookie', ->
    describe 'normal case', ->
      beforeEach ->
        @app.use handler('test')
        @app.use @middleware
        @server = http.createServer @app

      it 'switches NODE_DEBUG', (done) ->
        request(@server)
        .get '/'
        .end (err, res) =>
          return done err if err
          expect(@debug).to.be.eq 'init'
          expect(process.env.NODE_DEBUG).to.be.eq 'init'
          done(err)

    describe 'exception', ->
      beforeEach ->
        @app.use handler('test')
        @app.use @errorMiddleware
        @server = http.createServer @app

      it 'switches NODE_DEBUG', (done) ->
        request(@server)
        .get '/'
        .end (err, res) =>
          return done err if err
          expect(@debug).to.be.eq 'init'
          expect(process.env.NODE_DEBUG).to.be.eq 'init'
          done(err)

