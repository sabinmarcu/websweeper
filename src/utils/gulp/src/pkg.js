// @flow

import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import watch from 'gulp-watch';
import debug from 'gulp-debug';
import index from 'index-js';
import header from 'gulp-header';
import postcss from 'gulp-postcss';
import sequence from 'run-sequence';

import { existsSync, readFileSync } from 'fs';

import makeBanner from './banner';

const bannerSymbol = '*';
const bannerSignature = `Automatically generated ${bannerSymbol}${bannerSymbol} DO NOT ALTER THE BANNER`;
const banner = makeBanner(bannerSignature, bannerSymbol);

const packagesGlob = 'src/**/*.{js,jsx}';
const packagesTestsGlob = 'src/**/*.spec.{js,jsx}';

const stylesGlob = 'src/**/*.{css,sss}';

const babelGlob = [packagesGlob, `!${packagesTestsGlob}`];

gulp.task('index', () =>
    gulp.src('src')
        .pipe(index())
        .pipe(debug({ title: 'Index Files' }))
        .pipe(header(banner))
        .pipe(gulp.dest('./')));

gulp.task('postcss', () =>
    gulp.src(stylesGlob)
        .pipe(debug({ title: 'PostCSS Files' }))
        .pipe(postcss())
        .pipe(gulp.dest('lib')));

gulp.task('babel', () =>
    gulp.src(babelGlob)
        .pipe(debug({ title: 'Babel Files' }))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('lib')));

gulp.task('default', (done: Function) => {
    const tasks = ['babel'];
    if (existsSync('./postcss.config.js')) {
        tasks.unshift('postcss');
    }

    const files = ['./src/index.js', './src/index.jsx'];
    const availableFiles = files.filter((it: string): boolean => existsSync(it));
    const indexExists = availableFiles.length > 0;
    if (!indexExists ||
        (indexExists && availableFiles.filter(
            (it: string): boolean => readFileSync(it, 'utf-8').startsWith(banner),
        ).length > 0)
    ) {
        tasks.unshift('index');
    }

    sequence(...tasks, () => done());
});

gulp.task('babel:watch', () =>
    watch(babelGlob, () => gulp.run('default')));

gulp.task('dev', ['default', 'babel:watch']);
