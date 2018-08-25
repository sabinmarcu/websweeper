// @flow

const gulp = require('gulp');
const chug = require('gulp-chug');

gulp.task('default', () => {
    gulp.src([
        './src/utils/*/gulpfile.js',
        './src/*/*/gulpfile.js',
    ])
        .pipe(chug());
});
