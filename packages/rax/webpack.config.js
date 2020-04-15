require('webpack');
const config = require('./webpack.base.config');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

config.devtool = 'source-map';
config.entry = './src/index.js';
config.output = {
  path: path.resolve('dist'),
  filename: 'bundle.js',
  library: 'TinyStore',
  libraryTarget: 'umd',
};

if (process.env.NODE_ENV === 'development') {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
