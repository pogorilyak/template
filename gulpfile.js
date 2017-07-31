'use strict';

var gulp = require('gulp');

// js layout
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var watch  = require('gulp-watch');

// scss layout
var sass = require('gulp-sass');

// postcss layout
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var cssnano      = require('gulp-cssnano');

var paths = {
    css:  ['public/css/**/*.css'],
    js:   ['public/js/includes/**/*.js', 'public/js/includes/**/*.min.js'],
    scss: ['public/scss/**/*.scss']
};

gulp.task('scss', function () {
    return gulp.src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('css', function () {
    return gulp.src(paths.css)
        // .pipe(cssnano())
        .pipe(postcss([ autoprefixer({ browsers: ['ie >= 10', 'last 4 versions', '> 1%'] }) ]))
        .pipe(gulp.dest('public/css'));
});

// gulp.task('js', function () {
//     return gulp.src(paths.js)
//         .pipe(concat('main.js'))
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'))
//         .pipe(uglify())
//         .pipe(gulp.dest('public/js'));
// });

gulp.task('default', function () {
    gulp.watch(paths.scss, ['scss']);
    gulp.watch(paths.css, ['css']);
    // gulp.watch(paths.js, ['js']);
});