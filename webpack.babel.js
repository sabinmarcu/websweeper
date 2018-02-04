import fs from 'fs';
import path from 'path';
import debug from 'debug';

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, './package.json'), 'utf-8'));

const ENV = process.env.NODE_ENV || "development";
const logger = debug('log|build|minesweeper:box');

const SRC_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'lib');

export default {
  context: SRC_PATH,
  entry: {
    bundle: []
  }
}
