const commonPaths = require('./common-paths');
const webpack = require('webpack');

const port = process.env.PORT || 3000;
const host = 'localhost';

module.exports = {
  mode: 'development',
  devtool: 'eval',
  
  entry: {
    app: `${commonPaths.appEntry}/index.jsx`
  },

  output: {
    filename: '[name].[hash].js'
  },
  
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],

  devServer: {
    host: host,
    port: port,
    historyApiFallback: true,
    hot: true,
    open: true,
    // Show errors and warnings in console
    quiet: false,
    // Hide the build info
    noInfo: false,
    // Tell the server where to serve static files from.
    contentBase: commonPaths.appAssets,
    // Reload the page, if static content changes.
    watchContentBase: true,
    // full-screen overlay in the browser for compiler errors or warnings
    overlay: {
      warnings: false,
      errors: true
    },
    after() {
      process.stdout.write(`dev server is running: http://${host}:${port}\n`);
    }
  }
};
