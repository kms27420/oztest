const path = require('path');
const { merge } = require('webpack-merge');
const getLoaders = require('./loader.config');
const getPlugins = require('./plugin.config');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    // The build folder.
    path: undefined,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    filename: 'static/js/bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].chunk.js',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: (info) =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  module: {
    strictExportPresence: true,
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      { oneOf: getLoaders(true, false) },
    ],
  },
  plugins: getPlugins(true, false),
  devServer: {
    contentBase: './dist',
    publicPath: '/',
    port: 3000,
    proxy: {
      context: ['/**', '!/favicon.ico'],
      target: 'http://localhost:8080',
    },
    hot: true,
  },
});
