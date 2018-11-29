const gulp = require('gulp'),
      pug = require('gulp-pug'),
      stylus = require('gulp-stylus'),
      babel = require('gulp-babel'),
      imagemin = require('gulp-imagemin'),
      svgSymbols = require('gulp-svg-symbols'),
      runSequence = require('run-sequence'),
      browserSync = require('browser-sync').create(),
      path = require('./config').path,
      del = require('del');

const isProd = process.env.NODE_ENV === 'production';
const pathEnv = isProd ? './.env' : './.env.local';
const dotenv = require('dotenv').config({
    path: pathEnv
});
const vars = require('dotenv-expand')(dotenv).parsed;

gulp.task('clean', function(cb){
  return del([
    path.public + 'statics/css',
    path.public + 'statics/fonts',
    path.app + '**/*.html',
    path.public + 'statics/icons',
    path.public + 'statics/imgs',
    path.public + 'statics/js'
  ], { force: true }, cb);
})

gulp.task('html', function(){
  return gulp.src(path.src + 'html/*.pug')
    .pipe(pug({
      pretty: true,
      locals: vars
    }))
    .on('error', function(err){
      console.log(err.toString())
      this.emit('end');
    })
    .pipe(gulp.dest(path.app))
})

gulp.task('css', function(){
  return gulp.src(path.src + 'css/*.styl')
    .pipe(stylus())
    .on('error', function(err){
      console.log(err.toString())
      this.emit('end');
    })
    .pipe(gulp.dest(path.public + 'statics/css'))
})

gulp.task('js', function(){
  return gulp.src(path.src + 'js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .on('error', function(err){
      console.log(err.toString())
      this.emit('end');
    })
    .pipe(gulp.dest(path.public + 'statics/js'))
})

gulp.task('imgs', function(){
  return gulp.src(path.src + 'imgs/*')
    .pipe(imagemin())
    .pipe(gulp.dest(path.public + 'statics/imgs'))
})

gulp.task('icons', function(){
  return gulp.src(path.src + 'icons/*.svg')
    .pipe(svgSymbols())
    .pipe(gulp.dest(path.public + 'statics/icons'))
})

gulp.task('fonts', function(){
  return gulp.src(path.src + 'fonts/**/*')
    .pipe(gulp.dest(path.public + 'statics/fonts'))
})

gulp.task('serve', function(){
  browserSync.init({
    open: false,
    server: [
      path.app    ]
  })
  gulp.watch(path.src + 'css/*.styl', ['css', browserSync.reload])
  gulp.watch(path.src + 'fonts/*', ['fonts', browserSync.reload])
  gulp.watch(path.src + 'html/*.pug', ['html', browserSync.reload])
  gulp.watch(path.src + 'icons/*.svg', ['icons', browserSync.reload])
  gulp.watch(path.src + 'imgs/*', ['imgs', browserSync.reload])
  gulp.watch(path.src + 'js/*.js', ['js', browserSync.reload])
})



gulp.task('default', ['clean'], function(cb){
  runSequence('html', 'css', 'js', 'imgs', 'icons', 'fonts', cb)
})
