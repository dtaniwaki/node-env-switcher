'use strict'

require('babel-core/register')
var gulp = require('gulp')
var mocha = require('gulp-mocha')
var cover = require('gulp-coverage')
var coveralls = require('gulp-coveralls')
var eslint = require('gulp-eslint')
var clean = require('gulp-clean')
var gulpSequence = require('gulp-sequence')

gulp.task('clean', function () {
  gulp.src(['lib/**/*'], {read: false})
    .pipe(clean())
})

gulp.task('lint', function () {
  gulp.src(['./*.js', 'src/**/*.js', 'test/**/*.js'])
    .pipe(eslint({
      useEslintrc: true,
      fix: false
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('fix', function () {
  [
    ['./*.js', './'],
    ['src/**/*.js', 'src/'],
    ['test/**/*.js', 'test/']
  ].forEach(function (target) {
    return gulp.src(target[0])
      .pipe(eslint({
        useEslintrc: true,
        fix: true
      }))
      .pipe(gulp.dest(target[1]))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
  })
})

gulp.task('test', function () {
  gulp.src(['test/**/*.js'], {read: false})
    .pipe(mocha({
      reporter: 'spec',
      ui: 'bdd',
      timeout: 3000
    }))
})

gulp.task('coverage', ['rebuild'], function () {
  gulp.src(['test/**/*.js'], {read: false})
    .pipe(cover.instrument({
      pattern: ['lib/**/*.js'],
      debugDirectory: 'debug'
    }))
    .pipe(mocha())
    .pipe(cover.report({
      outFile: 'coverage.html',
      reporter: 'html'
    }))
})

gulp.task('coveralls', ['rebuild'], function () {
  gulp.src(['test/**/*.js'], {read: false})
    .pipe(cover.instrument({
      pattern: ['lib/**/*.js'],
      debugDirectory: 'debug'
    }))
    .pipe(mocha())
    .pipe(cover.gather())
    .pipe(cover.format({
      reporter: 'lcov'
    }))
    .pipe(coveralls())
})

gulp.task('default', gulpSequence('lint', 'test'))
