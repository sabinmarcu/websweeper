// @flow

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ReplacePlugin from 'replace-bundle-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import path from 'path';
import V8LazyParseWebpackPlugin from 'v8-lazy-parse-webpack-plugin';
import debug from 'debug';

module.exports = (TARGET: string = 'web', root: string = '.'): Object => {
    console.log("Generating config for", TARGET, root);
    const ENV = process.env.RC_NODE_ENV || process.env.NODE_ENV || 'development';
    const DEBUG = process.env.DEBUG || null;
    const VARIABLES = {
        'process': '(' + JSON.stringify({
            env: {
                ...(Object
                    .keys(process.env)
                    .filter((key: string): boolean => key.startsWith('RC_'))
                    .reduce((prev: Object, key: string): Object => ({
                        ...prev,
                        [key.replace('RC_', '')]: process.env[key],
                    }), {})),
                NODE_ENV: ENV,
                DEBUG,
            }
        }) + ')',
    }

    const log = debug(`log:webpack:config:${TARGET}`);

    log('ENV:', ENV);
    log('TARGET:', TARGET);
    log('DEBUG LEVEL:', DEBUG);
    log('VARIABLES', VARIABLES);

    const CSS_MAPS = (ENV !== 'production').toString();
    const OUTPUT_PATH = path.resolve(root, 'dist');
    const SRC_PATH = path.resolve(root, 'src');

    return {
        context: SRC_PATH,
        entry: {
            bundle: (ENV !== 'production'
                ? [global.runningWebpackThroughMiddleware ? 'webpack-hot-middleware/client' : 'webpack-dev-server/client']
                : []
            )
                .concat(['babel-polyfill'])
                .concat(ENV === 'development' ? ['react-hot-loader/patch'] : [])
                .concat(['./index']),
        },

        output: {
            path: OUTPUT_PATH,
            publicPath: '/',
            filename: '[name].js',
        },

        resolve: {
            mainFields: ['module', 'browser', 'main'],
            extensions: ['.jsx', '.js', '.json', '.sss'],
            modules: [
                SRC_PATH,
                'node_modules',
            ],
            alias: {
                components: path.resolve(root, 'src/components'),
                services: path.resolve(root, 'src/services'),
                style: path.resolve(root, 'src/style'),
                utils: path.resolve(root, 'src/utils'),
                ...(ENV === 'production' && process.env.RC_USE_PREACT ? {
                    react: 'preact-compat',
                    'react-dom': 'preact-compat',
                    'create-react-class': 'preact-compat/lib/create-react-class',
                } : {}),
            },
        },

        module: {
            rules: [
                {
                    test: /\.(jsx|js)?$/,
                    exclude: path.resolve(root, 'src'),
                    enforce: 'pre',
                    use: [{
                        loader: 'source-map-loader',
                    }],
                },
                {
                    test: /\.(jsx|js)?$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                    }],
                },
                {
                    test: /\.(css|sss)?$/,
                    use: ExtractTextPlugin.extract({
                        fallback: [{
                            loader: 'style-loader',
                            options: ENV === 'production' ? { singleton: true } : {},
                        }],
                        use: [{
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                sourceMap: CSS_MAPS,
                            },
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: path.resolve(__dirname, '../postcss.config.js'),
                                },
                            },
                        }],
                    }),
                },
                {
                    test: /\.(xml|html|txt|md)$/,
                    use: 'raw-loader',
                },
                {
                    test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
                    use: ENV === 'production' ? [{
                        loader: 'file-loader',
                        options: {
                            name: '[path][name]_[hash:base64:5].[ext]',
                        },
                    }] : 'url-loader',
                },
            ],
        },

        plugins: ([
            new webpack.NoEmitOnErrorsPlugin(),
            new ExtractTextPlugin('style.css', {
                allChunks: true,
                disable: ENV !== 'production',
            }),
            new webpack.DefinePlugin(VARIABLES),
            new CopyWebpackPlugin([
                // { from: "./assets", to: "./assets" },
                // { from: "./manifest.json", to: "./" },
                // { from: "./favicon.ico", to: "./" },
                // { from: "./icon.png", to: "./" },
                // { from: "./splash.png", to: "./" },
                // { from: "./_package.json", to: "./package.json" },
                // { from: "./build", to: "./build" },
            ]),
            new HtmlWebpackPlugin({
                template: './index.ejs',
            }),
            new webpack.NamedModulesPlugin(),
        ]).concat(ENV === 'production' ? [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
            }),
            // new V8LazyParseWebpackPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                output: {
                    comments: false,
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
                    negate_iife: false,
                },
                compressor: {
                    global_defs: {
                        TARGET,
                    },
                },
            }),
            //
            // new ReplacePlugin([{
            //     pattern: /throw\s+(new\s+)?[a-zA-Z]+Error\s*\(/g,
            //     replacement: (): string => 'return;(',
            // }]),

            // new OfflinePlugin({
            //     relativePaths: true,
            //     AppCache: {
            //         FALLBACK: {
            //             '/': '/index.html',
            //         },
            //     },
            //     ServiceWorker: {
            //         events: true,
            //         navigateFallbackURL: '/',
            //     },
            //     publicPath: '/',
            //     externals: [
            //         '/',
            //     ],
            // }),
        ] : [
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoEmitOnErrorsPlugin(),
            ]),

        stats: { colors: true },

        node: {
            global: true,
            process: false,
            Buffer: false,
            __filename: false,
            __dirname: false,
            setImmediate: false,
        },

        devtool: ENV === 'production' ? 'source-map' : 'inline-source-map',

        devServer: {
            port: process.env.PORT || 8000,
            publicPath: '/',
            contentBase: './src',
            historyApiFallback: true,
            open: true,
            hot: true,
        },

        watch: ENV === 'development',
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 300,
            poll: 500,
        },

        target: ['electron-main', 'web'].includes(TARGET) ? TARGET : 'web',
    };
};
