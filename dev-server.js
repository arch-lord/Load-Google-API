var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config.js');

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
  hot: true,
  contentBase: './test',
  filename: config[1].output.filename,
  publicPath: config[1].output.path,
  stats: {
    colors: true
  }
});

server.listen(8080, 'localhost', function () {});
