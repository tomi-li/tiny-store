const config = require('./webpack.config');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

config.mode = 'development';
config.entry = './index.js';
config.plugins = [
  ...config.plugins,
  new HtmlWebpackPlugin({
    filename: './index.html',
    template: './index.html',
    inject: true,
  }),
];

config.devServer = {
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  port: 9000
};

module.exports = config;
