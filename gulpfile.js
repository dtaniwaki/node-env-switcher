'use strict'

require('babel-core/register')
const gulp = require('gulp')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const mocha = require('gulp-mocha')
const cover = require('gulp-coverage')
const coveralls = require('gulp-coveralls')
const eslint = require('gulp-eslint')
const runSequence = require('run-sequence')
const clean = require('gulp-clean')

let lintTargets = [
  ['./*.js', './'],
  ['src/**/*.js', 'src/'],
  ['test/**/*.js', 'test/']
]

gulp.task('clean', function (done) {
  gulp.src(['lib/**/*'], {read: false})
    .pipe(clean())
})

gulp.task('lint', function (done) {
  lintTargets.forEach(function (target) {
    gulp.src(target[0])
      .pipe(eslint({
        useEslintrc: true,
        fix: false
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
  })
})

gulp.task('fix', function (done) {
  lintTargets.forEach(function (target) {
    gulp.src(target[0])
      .pipe(eslint({
        useEslintrc: true,
        fix: true
      }))
      .pipe(gulp.dest(target[1]))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
  })
})

gulp.task('compile', function (done) {
  gulp.src(['src/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write('.', {
      addComment: true,
      sourceRoot: '/src'
    }))
    .pipe(gulp.dest('lib'))
})

gulp.task('test', function (done) {
  gulp.src(['test/**/*.js'], {read: false})
    .pipe(mocha({
      reporter: 'spec',
      ui: 'bdd',
      timeout: 3000
    }))
})

gulp.task('coverage', function (done) {
  gulp.src(['test/**/*.js'], {read: false})
    .pipe(cover.instrument, {
      pattern: ['lib/**/*.js'],
      debugDirectory: 'debug'
    })
    .pipe(mocha())
    .pipe(cover.report, {
      outFile: 'coverage.html',
      reporter: 'html'
    })
})

gulp.task('coveralls', function (done) {
  gulp.src(['test/**/*.js'], {read: false})
    .pipe(cover.instrument, {
      pattern: ['lib/**/*.js'],
      debugDirectory: 'debug'
    })
    .pipe(mocha())
    .pipe(cover.gather())
    .pipe(cover.format, {
      reporter: 'lcov'
    })
    .pipe(coveralls())
})

gulp.task('build', function (done) {
  runSequence('lint', 'compile', done)
})

gulp.task('rebuild', ['clean'], function (done) {
  runSequence('build', done)
})

gulp.task('default', function (done) {
  runSequence('rebuild', 'test', done)
})
