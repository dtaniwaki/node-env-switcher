'use strict'

require('babel-core/register')
var gulp = require('gulp')
var babel = require('gulp-babel')
var sourcemaps = require('gulp-sourcemaps')
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
