"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _gulpBabel = _interopRequireDefault(require("gulp-babel"));

var _gulpSourcemaps = _interopRequireDefault(require("gulp-sourcemaps"));

var _gulpWatch = _interopRequireDefault(require("gulp-watch"));

var _gulpCopy = _interopRequireDefault(require("gulp-copy"));

var _gulpDebug = _interopRequireDefault(require("gulp-debug"));

var _indexJs = _interopRequireDefault(require("index-js"));

var _gulpHeader = _interopRequireDefault(require("gulp-header"));

var _gulpPostcss = _interopRequireDefault(require("gulp-postcss"));

var _runSequence = _interopRequireDefault(require("run-sequence"));

var _fs = require("fs");

var _banner = _interopRequireDefault(require("./banner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bannerSymbol = '*';
var bannerSignature = "Automatically generated ".concat(bannerSymbol).concat(bannerSymbol, " DO NOT ALTER THE BANNER");
var banner = (0, _banner.default)(bannerSignature, bannerSymbol);
var packagesGlob = 'src/**/*.{js,jsx}';
var packagesTestsGlob = 'src/**/*.spec.{js,jsx}';
var stylesGlob = 'src/**/*.{css,sss}';
var babelGlob = [packagesGlob, "!".concat(packagesTestsGlob)];

_gulp.default.task('assets', function () {
  return _gulp.default.src('src/assets/*').pipe(_gulp.default.dest('lib/assets'));
});

_gulp.default.task('index', function () {
  return _gulp.default.src('src').pipe((0, _indexJs.default)()).pipe((0, _gulpDebug.default)({
    title: 'Index Files'
  })).pipe((0, _gulpHeader.default)(banner)).pipe(_gulp.default.dest('./'));
});

_gulp.default.task('postcss', function () {
  return _gulp.default.src(stylesGlob).pipe((0, _gulpDebug.default)({
    title: 'PostCSS Files'
  })).pipe((0, _gulpPostcss.default)()).pipe(_gulp.default.dest('lib'));
});

_gulp.default.task('babel', function () {
  return _gulp.default.src(babelGlob).pipe((0, _gulpDebug.default)({
    title: 'Babel Files'
  })).pipe(_gulpSourcemaps.default.init()).pipe((0, _gulpBabel.default)()).pipe(_gulpSourcemaps.default.write('.')).pipe(_gulp.default.dest('lib'));
});

_gulp.default.task('default', function (done) {
  var tasks = ['babel'];

  if ((0, _fs.existsSync)('./postcss.config.js')) {
    tasks.unshift('postcss');
  }

  if ((0, _fs.existsSync)('./src/assets')) {
    tasks.unshift('assets');
  }

  var files = ['./src/index.js', './src/index.jsx'];
  var availableFiles = files.filter(function (it) {
    return (0, _fs.existsSync)(it);
  });
  var indexExists = availableFiles.length > 0;

  if (!indexExists || indexExists && availableFiles.filter(function (it) {
    return (0, _fs.readFileSync)(it, 'utf-8').startsWith(banner);
  }).length > 0) {
    tasks.unshift('index');
  }

  _runSequence.default.apply(void 0, tasks.concat([function () {
    return done();
  }]));
});

_gulp.default.task('babel:watch', function () {
  return (0, _gulpWatch.default)(babelGlob, function () {
    return _gulp.default.run('default');
  });
});

_gulp.default.task('dev', ['default', 'babel:watch']);
//# sourceMappingURL=pkg.js.map
