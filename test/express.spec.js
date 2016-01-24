const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
let expect = chai.expect
chai.use(sinonChai)

const http = require('http')
const express = require('express')
const cookieParser = require('cookie-parser')
const request = require('supertest')
const handler = require('../src/express')

describe('express', function () {
  let actualEnv

  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  beforeEach(function () {
    process.env.NODE_DEBUG = process.env.NODE_DEBUG || ''
    this.sandbox.stub(process.env, 'NODE_DEBUG', 'init')
    this.app = express()
    this.app.use(cookieParser())

    actualEnv = ''

    this.middleware = function (req, res, next) {
      actualEnv = process.env.NODE_DEBUG
      next()
    }
    this.errorMiddleware = function (req, res, next) {
      actualEnv = process.env.NODE_DEBUG
      next(new Error(500))
    }
  })

  describe('with cookie', function () {
    describe('normal case', function () {
      beforeEach(function () {
        this.app.use(handler('test', {type: 'cookie'}))
        this.app.use(this.middleware)
        this.server = http.createServer(this.app)
      })

      it('switches NODE_DEBUG', function (done) {
        request(this.server)
        .get('/')
        .set('Cookie', 'test=foo')
        .end(function (err, res) {
          if (err) {
            return done(err)
          }
          expect(actualEnv).to.be.eq('foo')
          expect(process.env.NODE_DEBUG).to.be.eq('init')
          done(err)
        })
      })
    })

    describe('exception', function () {
      beforeEach(function () {
        this.app.use(handler('test', {type: 'cookie'}))
        this.app.use(this.errorMiddleware)
        this.server = http.createServer(this.app)
      })

      it('switches NODE_DEBUG', function (done) {
        request(this.server)
        .get('/')
        .set('Cookie', 'test=foo')
        .end(function (err, res) {
          if (err) {
            return done(err)
          }
          expect(actualEnv).to.be.eq('foo')
          expect(process.env.NODE_DEBUG).to.be.eq('init')
          done(err)
        })
      })
    })

    describe('secure option', function () {
      beforeEach(function () {
        this.app.use(handler('test', {secure: true, password: 'bar', type: 'cookie'}))
        this.app.use(this.middleware)
        this.server = http.createServer(this.app)
      })

      it('switches NODE_DEBUG', function (done) {
        request(this.server)
        .get('/')
        .set('Cookie', 'test=2ZiAnuJ7MWmj8Clr4m835g==')
        .end(function (err, res) {
          if (err) {
            return done(err)
          }
          expect(actualEnv).to.be.eq('foo')
          expect(process.env.NODE_DEBUG).to.be.eq('init')
          done(err)
        })
      })
    })
  })

  describe('without cookie', function () {
    describe('normal case', function () {
      beforeEach(function () {
        this.app.use(handler('test', {type: 'cookie'}))
        this.app.use(this.middleware)
        this.server = http.createServer(this.app)
      })

      it('switches NODE_DEBUG', function (done) {
        request(this.server)
        .get('/')
        .end(function (err, res) {
          if (err) {
            return done(err)
          }
          expect(actualEnv).to.be.eq('init')
          expect(process.env.NODE_DEBUG).to.be.eq('init')
          done(err)
        })
      })
    })

    describe('exception', function () {
      beforeEach(function () {
        this.app.use(handler('test', {type: 'cookie'}))
        this.app.use(this.errorMiddleware)
        this.server = http.createServer(this.app)
      })

      it('switches NODE_DEBUG', function (done) {
        request(this.server)
        .get('/')
        .end(function (err, res) {
          if (err) {
            return done(err)
          }
          expect(actualEnv).to.be.eq('init')
          expect(process.env.NODE_DEBUG).to.be.eq('init')
          done(err)
        })
      })
    })
  })

  describe('query', function () {
    describe('with query', function () {
      describe('normal case', function () {
        beforeEach(function () {
          this.app.use(handler('test', {type: 'query'}))
          this.app.use(this.middleware)
          this.server = http.createServer(this.app)
        })

        it('switches NODE_DEBUG', function (done) {
          request(this.server)
          .get('/?test=foo')
          .end(function (err, res) {
            if (err) {
              return done(err)
            }
            expect(actualEnv).to.be.eq('foo')
            expect(process.env.NODE_DEBUG).to.be.eq('init')
            done(err)
          })
        })
      })

      describe('exception', function () {
        beforeEach(function () {
          this.app.use(handler('test', {type: 'query'}))
          this.app.use(this.errorMiddleware)
          this.server = http.createServer(this.app)
        })

        it('switches NODE_DEBUG', function (done) {
          request(this.server)
          .get('/?test=foo')
          .end(function (err, res) {
            if (err) {
              return done(err)
            }
            expect(actualEnv).to.be.eq('foo')
            expect(process.env.NODE_DEBUG).to.be.eq('init')
            done(err)
          })
        })
      })

      describe('secure option', function () {
        beforeEach(function () {
          this.app.use(handler('test', {secure: true, password: 'bar', type: 'query'}))
          this.app.use(this.middleware)
          this.server = http.createServer(this.app)
        })

        it('switches NODE_DEBUG', function (done) {
          request(this.server)
          .get('/?test=2ZiAnuJ7MWmj8Clr4m835g==')
          .end(function (err, res) {
            if (err) {
              return done(err)
            }
            expect(actualEnv).to.be.eq('foo')
            expect(process.env.NODE_DEBUG).to.be.eq('init')
            done(err)
          })
        })
      })

      describe('secure option', function () {
        beforeEach(function () {
          this.app.use(handler('test', {secure: true, password: 'bar', type: 'query'}))
          this.app.use(this.middleware)
          this.server = http.createServer(this.app)
        })

        it('switches NODE_DEBUG', function (done) {
          request(this.server)
          .get('/?test=2ZiAnuJ7MWmj8Clr4m835g==')
          .end(function (err, res) {
            if (err) {
              return done(err)
            }
            expect(actualEnv).to.be.eq('foo')
            expect(process.env.NODE_DEBUG).to.be.eq('init')
            done(err)
          })
        })
      })
    })

    describe('without query', function () {
      describe('normal case', function () {
        beforeEach(function () {
          this.app.use(handler('test', {type: 'query'}))
          this.app.use(this.middleware)
          this.server = http.createServer(this.app)
        })

        it('switches NODE_DEBUG', function (done) {
          request(this.server)
          .get('/')
          .end(function (err, res) {
            if (err) {
              return done(err)
            }
            expect(actualEnv).to.be.eq('init')
            expect(process.env.NODE_DEBUG).to.be.eq('init')
            done(err)
          })
        })
      })

      describe('exception', function () {
        beforeEach(function () {
          this.app.use(handler('test', {type: 'query'}))
          this.app.use(this.errorMiddleware)
          this.server = http.createServer(this.app)
        })

        it('switches NODE_DEBUG', function (done) {
          request(this.server)
          .get('/')
          .end(function (err, res) {
            if (err) {
              return done(err)
            }
            expect(actualEnv).to.be.eq('init')
            expect(process.env.NODE_DEBUG).to.be.eq('init')
            done(err)
          })
        })
      })
    })
  })
})
