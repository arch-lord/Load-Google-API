/* global __dirname, require, module */

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'load-google-api';

let plugins = [], outputFile;
let entry = [];

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  entry.push(__dirname + '/src/index.js');
  outputFile = libraryName + '.min.js';
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  entry.push(__dirname + '/src/index.js');
  entry.push('webpack/hot/dev-server');
  entry.push('webpack-dev-server/client?http://localhost:8080');
  outputFile = libraryName + '.js';
}

module.exports = [{
  externals: {
    jquery: 'jQuery'
  },
  entry: entry,
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /bower_components/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./src'), path.resolve(__dirname, 'node_modules')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
},
// Builds the test page
{
  entry: [
    __dirname + '/test/test.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
    path: __dirname + '/test',
    filename: 'index.js'
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /lib/
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}];
