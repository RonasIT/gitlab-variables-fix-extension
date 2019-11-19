var gulp = require('gulp');
var uglify = require('gulp-uglify-es').default;
var gutil = require('gulp-util');
var using = require('gulp-using');

gulp.task('uglify', function () {
  return gulp.src(['src/js/popup.js', 'src/js/background.js', 'src/js/common.js'])
    .pipe(using())
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('dist/js'));
});