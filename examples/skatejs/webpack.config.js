const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    'dist/index.js': './src/index.js'
  },
  output: {
    path: './',
    filename: '[name]',
    libraryTarget: 'umd',
    sourceMapFilename: '[file].map'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'css?camelCase&modules'
    }, {
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }]
  },
  plugins: [new webpack.optimize.UglifyJsPlugin({
    include: /\.js$/,
    minimize: true
  })]
};
