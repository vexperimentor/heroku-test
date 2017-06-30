var gulp = require('gulp'),
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var babel = require('gulp-babel');
var useref = require('gulp-useref');
// var gulpFilter = require('gulp-filter');
var gulpif = require('gulp-if');
var minifyCSS = require("gulp-minify-css");
var cssUseref = require('gulp-css-useref');
var replace = require('gulp-replace');
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');


var srcFolder = ['./**/*.*'],
dropFolder = 'drop';
gulp.task('copy', function(){
    return gulp.src(srcFolder,{base:"."})
        .pipe(gulp.dest(dropFolder));
});

gulp.task('log', function() {
  gutil.log('== My First Task ==')
});

gulp.task('default', ['copy', 'log']);

gulp.task('main', function () {
  gulp.src(['frontend/**/main/app.js', 
'frontend/**/main/*.js',
'frontend/**/main/dynos/*.js', 
'frontend/**/main/dynos/**/*.js', 
'frontend/**/main/editor/*.js', 
'frontend/**/main/editor/**/*.js', 
'frontend/**/main/view/*.js',
'frontend/**/main/report/*.js',
'frontend/**/main/gallery/*.js', 
'frontend/**/main/gallery/**/*.js', 
'frontend/**/main/profile/*.js',
'frontend/**/home/*.js', 
'frontend/**/login/*.js',
'frontend/**/main/contacts/*.js',
'frontend/**/main/assignments/*.js', 
'frontend/**/main/assignments/**/*.js',
'frontend/**/pagewise/*.js',
'frontend/**/main/stores/*.js', 
'frontend/**/main/stores/**/*.js', 
'frontend/**/service/**/*.js', 
'frontend/**/service/*.js',
'frontend/**/angular/f_parser.js',
'frontend/**/angular/f_validator.js',
'frontend/**/angular/tnr_parser.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('main-app.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
      .pipe(ngAnnotate())
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('frontend'))
})
//THIS WORKS!!! >>>>>>>>>>>>>>>>>>>>>>
// gulp.task('html', function () {
 
//     return gulp.src('frontend/index.html')
//     // .pipe(sourcemaps.init())
//     .pipe(useref({}, function(){return babel({presets: ['es2015']})}))
//     // .pipe(babel)({
//     //   presets: ['es2015']
//     // })
//     .pipe(gulpif('*.js', ngAnnotate()))
//     .pipe(gulpif('*.js', uglify()))
//     // .pipe(sourcemaps.write())
//     .pipe(gulp.dest('.'))
// });
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Delete the dist directory
gulp.task('clean', function() {
 return gulp.src('dist')
 .pipe(clean());
});

gulp.task('fix-paths', function() {
    gulp.src('frontend/dist/corecss.css')
        .pipe(replace('../', '/dist/'))
        .pipe(gulp.dest('dist'));
}); 

gulp.task('copy-assets', function () {
    return gulp.src('frontend/**/*.css')
        .pipe(cssUseref())
        .pipe(gulp.dest('dist'));
});

gulp.task('imagemin', function() {
 gulp.src(['dist/*.png','dist/**/*.png'])
 .pipe(imagemin())
 .pipe(gulp.dest('dist/imageees/'));
});


gulp.task('concat-min', function () {
    return gulp.src('frontend/index.html')
    .pipe(sourcemaps.init())
    .pipe(useref())
    .pipe(gulpif('main-app.js', babel({
      presets: ['es2015']
    })))   
    .pipe(gulpif('main-app.js', ngAnnotate()))
    .pipe(gulpif('main-app.js', uglify()))
    .pipe(gulpif('corecss.css', minifyCSS()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
});

gulp.task('build', function() {
  gulp.start('concat-min');
  gulp.start('copy-assets');
  gulp.start('fix-paths');
});