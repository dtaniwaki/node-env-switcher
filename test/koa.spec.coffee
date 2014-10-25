chai = require 'chai'
sinon = require 'sinon'
sinonChai = require 'sinon-chai'
expect = chai.expect
chai.use(sinonChai)

http = require 'http'
koa = require 'koa'
request = require 'supertest'
handler = require '../lib/koa'

describe 'koa', ->
  beforeEach ->
    @sandbox = sinon.sandbox.create()

  afterEach ->
    @sandbox.restore()

  beforeEach ->
    process.env.NODE_DEBUG ||= ''
    @sandbox.stub process.env, 'NODE_DEBUG', 'init'
    @app = koa()
    @app.on 'error', (err) ->
      throw err unless err.status?
    
    @debug = ''

    @middleware = (next) =>
      @debug = process.env.NODE_DEBUG
      yield next
    @errorMiddleware = (next) =>
      @debug = process.env.NODE_DEBUG
      @throw 500
      yield next

  describe 'cookie', ->
    describe 'with cookie', ->
      describe 'normal case', ->
        beforeEach ->
          @app.use handler('test')
          @app.use @middleware
          @server = http.createServer @app.callback()

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
          @server = http.createServer @app.callback()

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
          @server = http.createServer @app.callback()

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
          @server = http.createServer @app.callback()

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
          @server = http.createServer @app.callback()

        it 'switches NODE_DEBUG', (done) ->
          request(@server)
          .get '/'
          .end (err, res) =>
            return done err if err
            expect(@debug).to.be.eq 'init'
            expect(process.env.NODE_DEBUG).to.be.eq 'init'
            done(err)

  describe 'query', ->
    describe 'with query', ->
      describe 'normal case', ->
        beforeEach ->
          @app.use handler('test', type: 'query')
          @app.use @middleware
          @server = http.createServer @app.callback()

        it 'switches NODE_DEBUG', (done) ->
          request(@server)
          .get '/?test=foo'
          .end (err, res) =>
            return done err if err
            expect(@debug).to.be.eq 'foo'
            expect(process.env.NODE_DEBUG).to.be.eq 'init'
            done(err)

      describe 'exception', ->
        beforeEach ->
          @app.use handler('test', type: 'query')
          @app.use @errorMiddleware
          @server = http.createServer @app.callback()

        it 'switches NODE_DEBUG', (done) ->
          request(@server)
          .get '/?test=foo'
          .end (err, res) =>
            return done err if err
            expect(@debug).to.be.eq 'foo'
            expect(process.env.NODE_DEBUG).to.be.eq 'init'
            done(err)

      describe 'secure option', ->
        beforeEach ->
          @app.use handler('test', secure: true, password: 'bar', type: 'query')
          @app.use @middleware
          @server = http.createServer @app.callback()

        it 'switches NODE_DEBUG', (done) ->
          request(@server)
          .get '/?test=2ZiAnuJ7MWmj8Clr4m835g=='
          .end (err, res) =>
            return done err if err
            expect(@debug).to.be.eq 'foo'
            expect(process.env.NODE_DEBUG).to.be.eq 'init'
            done(err)

      describe 'secure option', ->
        beforeEach ->
          @app.use handler('test', secure: true, password: 'bar', type: 'query')
          @app.use @middleware
          @server = http.createServer @app.callback()

        it 'switches NODE_DEBUG', (done) ->
          request(@server)
          .get '/?test=2ZiAnuJ7MWmj8Clr4m835g=='
          .end (err, res) =>
            return done err if err
            expect(@debug).to.be.eq 'foo'
            expect(process.env.NODE_DEBUG).to.be.eq 'init'
            done(err)

    describe 'without query', ->
      describe 'normal case', ->
        beforeEach ->
          @app.use handler('test', type: 'query')
          @app.use @middleware
          @server = http.createServer @app.callback()

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
          @app.use handler('test', type: 'query')
          @app.use @errorMiddleware
          @server = http.createServer @app.callback()

        it 'switches NODE_DEBUG', (done) ->
          request(@server)
          .get '/'
          .end (err, res) =>
            return done err if err
            expect(@debug).to.be.eq 'init'
            expect(process.env.NODE_DEBUG).to.be.eq 'init'
            done(err)
