const commonPaths = require('./common-paths');

const webpack = require('webpack');
const path = require("path");
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: 'public/index.html',
  favicon: 'public/assets/images/favicon.ico'
});

module.exports = {
  entry: {
    vendor: ['semantic-ui-react']
  },

  output: {
    path: commonPaths.outputPath,
    publicPath: '/'
  },

  module: {
    rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.(gif|png|jpg|svg)(\?.*$|$)/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            publicPath: 'public/assets'
          },
        },
      ],
    }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["node_modules"],
    alias: {
      Components: path.resolve(commonPaths.appEntry, "components"),
      Containers: path.resolve(commonPaths.appEntry, "screens"),
      Data: path.resolve(commonPaths.appEntry, "data")
    }
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true
        }
      }
    }
  },

  plugins: [
    htmlPlugin
  ]
};
