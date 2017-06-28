const gulp = require('gulp');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const path = require('path');
const cheerio = require('gulp-cheerio');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const appPath = require('./dist/public/dist/build/rev-manifest.json');

gulp.task('html-templates', () => {
  gulp.src('./views/*.ejs')
  .pipe(ejs({
    title: 'webpack template',
    jsPath: `${appPath.app.js}`,
    cssPath: `${appPath.app.css}`,
  }))
  .pipe(rename({
    extname: '.html',
  }))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('favicon', () => {
  return gulp
  .src('./resources/favicon/*.**')
  .pipe(gulp.dest('./dist/public/dist/favicon/'));
});

gulp.task('svg-make', () => {
  return gulp
  .src('./resources/svg-assets/*.svg')
  .pipe(svgmin((file) => {
    const prefix = path.basename(file.relative, path.extname(file.relative));
    return {
      plugins: [{
        cleanupIDs: {
          prefix: `${prefix}-`,
          minify: true,
        },
      }],
    };
  }))
  .pipe(cheerio({
    run($) {
      $('[fill]').removeAttr('fill');
    },
  }))
  .pipe(rename({ prefix: 'icon-' }))
  .pipe(svgstore())
  .pipe(gulp.dest('./views/partials/'));
});
