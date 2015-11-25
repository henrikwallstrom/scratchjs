var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'scratch.js',
    libraryTarget: 'umd'
  },

  plugins: [
    //new webpack.optimize.UglifyJsPlugin(),
    //new webpack.optimize.OccurenceOrderPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }

      }
    ]
  }
};
