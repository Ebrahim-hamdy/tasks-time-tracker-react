const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
    analyzerMode: 'server'
});

module.exports = {
  plugins: [
    bundleAnalyzerPlugin
  ]
};
