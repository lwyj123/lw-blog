'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        host: 'localhost', //地址，可不写，不写的话，默认localhost
        port: 3000, //端口号，可不写，默认8000
        root: './', //当前项目主目录
        livereload: true //自动刷新
    });
});
gulp.task('html', function() {
    gulp.src('./*.html')
        .pipe(connect.reload());
});
gulp.task('watch', function() {
    gulp.watch('./static/scss/**/*.scss', ['scss']);
    gulp.watch('./static/*.css', ['html']); //监控css文件
    gulp.watch('./js/*.js', ['html']); //监控js文件
    gulp.watch(['./*.html'], ['html']); //监控html文件
}); //执行gulp server开启服务器

gulp.task('server', ['connect', 'watch']);

gulp.task('scss', function () {
    return gulp.src('./static/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./static'));
});
