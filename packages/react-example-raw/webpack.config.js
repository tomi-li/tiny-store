process.env.BABEL_ENV = process.env.BABEL_ENV || 'production';
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'web',
  mode: process.env.NODE_ENV,
  optimization: {
    // 为了更好的调试体验， 可以直接关闭代码压缩定位源代码 debugging
    // minimize: false
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@': path.resolve(__dirname),
    },
    modules: ['node_modules']
  },
};
