'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('scss', function () {
return gulp.src('./static/scss/**/*.scss')
.pipe(sass().on('error', sass.logError))
.pipe(gulp.dest('./static'));
});

gulp.task('watch', function () {
gulp.watch('./static/scss/**/*.scss', ['sass']);
});