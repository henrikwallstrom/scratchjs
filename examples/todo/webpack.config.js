var path = require('path');
var webpack = require('webpack');


module.exports = {
  entry: [
    //'babel-polyfill',
    "./app.js"
  ],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  resolve: {
		extensions: ['', '.js', '.jsx'],
    alias:{ 'scratchjs' : '../../src/'}
    ,
		modulesDirectories: [
			'./node_modules',
      '../../src'
		]
	},
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
//          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.less$/,
        loader: "style!css!autoprefixer!less"
      },
    ]
  }
};
