// @flow

import gulp from 'gulp';
import babel from 'gulp-babel';
import watch from 'gulp-watch';
import debug from 'gulp-debug';

const packagesGlob = 'packages/*/src/**/*.{js,jsx}';
const packagesTestsGlob = 'packages/*/src/**/*.spec.{js,jsx}';

const babelGlob = [packagesGlob, `!${packagesTestsGlob}`];

gulp.task('babel', () =>
    gulp.src(babelGlob)
        .pipe(debug())
        .pipe(babel())
        .pipe(gulp.dest((file: { base: string, path: string }): string => {
            file.path = file.path.replace('src', 'lib'); // eslint-disable-line
            return file.base;
        })));

gulp.task('babel:watch', () =>
    watch(babelGlob, () => gulp.run('babel')));

gulp.task('default', ['babel']);
gulp.task('dev', ['babel', 'babel-watch']);
