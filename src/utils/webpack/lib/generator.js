"use strict";

var _webpack = _interopRequireDefault(require("webpack"));

var _extractTextWebpackPlugin = _interopRequireDefault(require("extract-text-webpack-plugin"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _copyWebpackPlugin = _interopRequireDefault(require("copy-webpack-plugin"));

var _replaceBundleWebpackPlugin = _interopRequireDefault(require("replace-bundle-webpack-plugin"));

var _offlinePlugin = _interopRequireDefault(require("offline-plugin"));

var _path = _interopRequireDefault(require("path"));

var _v8LazyParseWebpackPlugin = _interopRequireDefault(require("v8-lazy-parse-webpack-plugin"));

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

module.exports = function () {
  var TARGET = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'web';
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';
  console.log("Generating config for", TARGET, root);
  var ENV = process.env.RC_NODE_ENV || process.env.NODE_ENV || 'development';
  var DEBUG = process.env.DEBUG || null;
  var VARIABLES = {
    'process': '(' + JSON.stringify({
      env: _extends({}, Object.keys(process.env).filter(function (key) {
        return key.startsWith('RC_');
      }).reduce(function (prev, key) {
        return _extends({}, prev, _defineProperty({}, key.replace('RC_', ''), process.env[key]));
      }, {}), {
        NODE_ENV: ENV,
        DEBUG: DEBUG
      })
    }) + ')'
  };
  var log = (0, _debug.default)("log:webpack:config:".concat(TARGET));
  log('ENV:', ENV);
  log('TARGET:', TARGET);
  log('DEBUG LEVEL:', DEBUG);
  log('VARIABLES', VARIABLES);
  var CSS_MAPS = (ENV !== 'production').toString();

  var OUTPUT_PATH = _path.default.resolve(root, 'dist');

  var SRC_PATH = _path.default.resolve(root, 'src');

  return {
    context: SRC_PATH,
    entry: {
      bundle: (ENV !== 'production' ? [global.runningWebpackThroughMiddleware ? 'webpack-hot-middleware/client' : 'webpack-dev-server/client'] : []).concat(['babel-polyfill']).concat(ENV === 'development' ? ['react-hot-loader/patch'] : []).concat(['./index'])
    },
    output: {
      path: OUTPUT_PATH,
      publicPath: '/',
      filename: '[name].js'
    },
    resolve: {
      mainFields: ['module', 'browser', 'main'],
      extensions: ['.jsx', '.js', '.json', '.sss'],
      modules: [SRC_PATH, 'node_modules'],
      alias: _extends({
        components: _path.default.resolve(root, 'src/components'),
        services: _path.default.resolve(root, 'src/services'),
        style: _path.default.resolve(root, 'src/style'),
        utils: _path.default.resolve(root, 'src/utils')
      }, ENV === 'production' && process.env.RC_USE_PREACT ? {
        react: 'preact-compat',
        'react-dom': 'preact-compat',
        'create-react-class': 'preact-compat/lib/create-react-class'
      } : {})
    },
    module: {
      rules: [{
        test: /\.(jsx|js)?$/,
        exclude: _path.default.resolve(root, 'src'),
        enforce: 'pre',
        use: [{
          loader: 'source-map-loader'
        }]
      }, {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      }, {
        test: /\.(css|sss)?$/,
        use: _extractTextWebpackPlugin.default.extract({
          fallback: [{
            loader: 'style-loader',
            options: ENV === 'production' ? {
              singleton: true
            } : {}
          }],
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: CSS_MAPS
            }
          }, {
            loader: 'postcss-loader',
            options: {
              config: {
                path: _path.default.resolve(__dirname, '../postcss.config.js')
              }
            }
          }]
        })
      }, {
        test: /\.(xml|html|txt|md)$/,
        use: 'raw-loader'
      }, {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        use: ENV === 'production' ? [{
          loader: 'file-loader',
          options: {
            name: '[path][name]_[hash:base64:5].[ext]'
          }
        }] : 'url-loader'
      }]
    },
    plugins: [new _webpack.default.NoEmitOnErrorsPlugin(), new _extractTextWebpackPlugin.default('style.css', {
      allChunks: true,
      disable: ENV !== 'production'
    }), new _webpack.default.DefinePlugin(VARIABLES), new _copyWebpackPlugin.default([// { from: "./assets", to: "./assets" },
      // { from: "./manifest.json", to: "./" },
      // { from: "./favicon.ico", to: "./" },
      // { from: "./icon.png", to: "./" },
      // { from: "./splash.png", to: "./" },
      // { from: "./_package.json", to: "./package.json" },
      // { from: "./build", to: "./build" },
    ]), new _htmlWebpackPlugin.default({
      template: './index.ejs'
    }), new _webpack.default.NamedModulesPlugin()].concat(ENV === 'production' ? [new _webpack.default.LoaderOptionsPlugin({
      minimize: true
    }), // new V8LazyParseWebpackPlugin(),
    new _webpack.default.optimize.UglifyJsPlugin({
      sourceMap: true,
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false
      },
      compressor: {
        global_defs: {
          TARGET: TARGET
        }
      }
    })] : [new _webpack.default.HotModuleReplacementPlugin(), new _webpack.default.NoEmitOnErrorsPlugin()]),
    stats: {
      colors: true
    },
    node: {
      global: true,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
      setImmediate: false
    },
    devtool: ENV === 'production' ? 'source-map' : 'inline-source-map',
    devServer: {
      port: process.env.PORT || 8000,
      publicPath: '/',
      contentBase: './src',
      historyApiFallback: true,
      open: true,
      hot: true
    },
    watch: ENV === 'development',
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 500
    },
    target: ['electron-main', 'web'].includes(TARGET) ? TARGET : 'web'
  };
};