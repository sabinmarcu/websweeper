"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _gulpBabel = _interopRequireDefault(require("gulp-babel"));

var _gulpWatch = _interopRequireDefault(require("gulp-watch"));

var _gulpDebug = _interopRequireDefault(require("gulp-debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var packagesGlob = 'packages/*/src/**/*.{js,jsx}';
var packagesTestsGlob = 'packages/*/src/**/*.spec.{js,jsx}';
var babelGlob = [packagesGlob, "!".concat(packagesTestsGlob)];

_gulp.default.task('babel', function () {
  return _gulp.default.src(babelGlob).pipe((0, _gulpDebug.default)()).pipe((0, _gulpBabel.default)()).pipe(_gulp.default.dest(function (file) {
    file.path = file.path.replace('src', 'lib'); // eslint-disable-line

    return file.base;
  }));
});

_gulp.default.task('babel:watch', function () {
  return (0, _gulpWatch.default)(babelGlob, function () {
    return _gulp.default.run('babel');
  });
});

_gulp.default.task('default', ['babel']);

_gulp.default.task('dev', ['babel', 'babel-watch']);