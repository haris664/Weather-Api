const gulp = require('gulp');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel1 = require('gulp-babel');
const browserSync = require('browser-sync').create();

function html() {
  return gulp.src('src/index.html')
  .pipe(gulp.dest('dist'))
}

function minifyCss() {
  return gulp.src('src/css/*.css')
  .pipe(cleanCss())
  .pipe(gulp.dest('dist/css'));
}

function transpileJs() {
  return gulp.src('src/js/app.js')
  .pipe(babel1({
    presets: ['@babel/env']
  }))
  .pipe(gulp.dest('dist/js'))
}

function watch() {
  gulp.watch('src/js/app.js',transpileJs);
  gulp.watch('src/css/*.css',minifyCss);
  gulp.watch('src/index.html',html)
}

function sync() {
  return browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
}

exports.default = gulp.parallel(html,minifyCss,transpileJs,sync,watch);