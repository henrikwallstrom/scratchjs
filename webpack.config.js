var webpack = require('webpack');

module.exports = {
    entry: './src/scratch.js',
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
                loader: 'babel-loader'
            }
  ]
    }
};
