'use strict'

require('babel-core/register')
const gulp = require('gulp')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const mocha = require('gulp-mocha')
const cover = require('gulp-coverage')
const coveralls = require('gulp-coveralls')
const eslint = require('gulp-eslint')
const gulpSequence = require('gulp-sequence')
const clean = require('gulp-clean')

let lintTargets = [
  ['./*.js', './'],
  ['src/**/*.js', 'src/'],
  ['test/**/*.js', 'test/']
]

gulp.task('clean', function () {
  gulp.src(['lib/**/*'], {read: false})
    .pipe(clean())
})

gulp.task('lint', function (done) {
  Promise.all(lintTargets.map(function (target) {
    return gulp.src(target[0])
      .pipe(eslint({
        useEslintrc: true,
        fix: false
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
  })).then(function () {
    done()
  })
})

gulp.task('fix', function (done) {
  Promise.all(lintTargets.map(function (target) {
    return gulp.src(target[0])
      .pipe(eslint({
        useEslintrc: true,
        fix: true
      }))
      .pipe(gulp.dest(target[1]))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
  })).then(function () {
    done()
  })
})

gulp.task('compile', function () {
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

gulp.task('build', gulpSequence('lint', 'compile'))

gulp.task('rebuild', gulpSequence('clean', 'build'))

gulp.task('default', gulpSequence('rebuild', 'test'))
