const commonPaths = require('./common-paths');
const webpack = require('webpack');

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractTextPlugin = new ExtractTextPlugin({
  filename: 'styles.[hash].css',
  allChunks: true
});

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  
  entry: {
    app: [`${commonPaths.appEntry}/index.js`]
  },

  output: {
    filename: '[name].[chunkhash].js'
  },
  
  module: {
    rules: [
    {
      test: /\.(css|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            discardDuplicates: true,
            importLoaders: 1,
            camelCase: true,
            sourceMap: false
          }
        },
        {
          loader: 'postcss-loader'
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
        ]
      })
    }
    ]
  },
  plugins: [
  new UglifyJSPlugin(),
  extractTextPlugin
  ]
};
