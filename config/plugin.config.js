const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const paths = require('./path.config');

// Generates an `index.html` file with the <script> injected.
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  inject: true,
  template: paths.appHtml,
});
const prodHtmlWebpackPlugin = new HtmlWebpackPlugin({
  inject: true,
  template: paths.appHtml,
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  },
});

// This is necessary to emit hot updates (CSS and Fast Refresh):
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

// Watcher doesn't work well if you mistype casing in a path so we use
// a plugin that prints an error when you attempt to do this.
// See https://github.com/facebook/create-react-app/issues/240
const caseSensitivePathsPlugin = new CaseSensitivePathsPlugin();

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: 'static/css/[name].[contenthash:8].css',
  chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
});

// Generate an asset manifest file with the following content:
// - "files" key: Mapping of all asset filenames to their corresponding
//   output file so that tools can pick it up without having to parse
//   `index.html`
// - "entrypoints" key: Array of files which are included in `index.html`,
//   can be used to reconstruct the HTML if necessary
const manifestPlugin = new ManifestPlugin({
  fileName: 'asset-manifest.json',
  publicPath: paths.publicUrlOrPath,
  generate: (seed, files, entrypoints) => {
    const manifestFiles = files.reduce((manifest, file) => {
      manifest[file.name] = file.path;
      return manifest;
    }, seed);
    const entrypointFiles = entrypoints.main.filter(
      (fileName) => !fileName.endsWith('.map'),
    );

    return {
      files: manifestFiles,
      entrypoints: entrypointFiles,
    };
  },
});

// Generate a service worker script that will precache, and keep up to date,
// the HTML & assets that are part of the webpack build.
const workboxWebpackPlugin = new WorkboxWebpackPlugin.InjectManifest({
  swSrc: paths.swSrc,
  dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
  exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
});

const eSLintPlugin = new ESLintPlugin({
  context: paths.appSrc,
  extensions: ['.js', '.jsx'],
  lintDirtyModulesOnly: true,
});

// The order matters: plugins are bound to the compiler and applied in the order specified.
const getPlugins = (isEnvDevelopment, isEnvProduction) =>
  [
    isEnvProduction ? prodHtmlWebpackPlugin : htmlWebpackPlugin,
    isEnvDevelopment && hotModuleReplacementPlugin,
    isEnvDevelopment && caseSensitivePathsPlugin,
    isEnvProduction && miniCssExtractPlugin,
    manifestPlugin,
    isEnvProduction &&
      fs.existsSync(paths.swSrc) &&
      workboxWebpackPlugin,
    eSLintPlugin,
  ].filter(Boolean);

module.exports = getPlugins;
