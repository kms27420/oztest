const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./path.config');

const IMAGE_INLINE_SIZE_LIMIT = 10000;

// "url" loader works like "file" loader except that it embeds assets
// smaller than specified limit in bytes as data URLs to avoid requests.
// A missing `test` is equivalent to a match.
const inlineMediaLoader = {
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  loader: 'url-loader',
  options: {
    limit: IMAGE_INLINE_SIZE_LIMIT,
    name: 'static/media/[name].[hash:8].[ext]',
  },
};

// Process application JS with Babel.
// The preset includes JSX, and some ESnext features.
const srcJSLoader = (isEnvProduction) => ({
  test: /\.(js|mjs|jsx)$/,
  include: paths.appSrc,
  loader: 'babel-loader',
  options: {
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables caching results in ./node_modules/.cache/babel-loader/
    // directory for faster rebuilds.
    cacheDirectory: true,
    // See #6846 for context on why cacheCompression is disabled
    cacheCompression: false,
    compact: isEnvProduction,
  },
});

// Process any JS outside of the app with Babel.
// Unlike the application JS, we only compile the standard ES features.
const libJSLoader = (isEnvDevelopment) => ({
  test: /\.(js|mjs)$/,
  exclude: /@babel(?:\/|\\{1,2})runtime/,
  loader: 'babel-loader',
  options: {
    configFile: false,
    compact: false,
    cacheDirectory: true,
    // See #6846 for context on why cacheCompression is disabled
    cacheCompression: false,

    // Babel sourcemaps are needed for debugging into node_modules
    // code.  Without the options below, debuggers like VSCode
    // show incorrect code and set breakpoints on the wrong lines.
    sourceMaps: isEnvDevelopment,
    inputSourceMap: isEnvDevelopment,
  },
});

// "postcss" loader applies autoprefixer to our CSS.
// "css" loader resolves paths in CSS and adds assets as dependencies.
// "style" loader turns CSS into JS modules that inject <style> tags.
// In production, we use MiniCSSExtractPlugin to extract that CSS
// to a file, but in development "style" loader enables hot editing
// of CSS.
const cssLoader = (isEnvDevelopment, isEnvProduction) => ({
  test: /\.css$/,
  use: [
    isEnvDevelopment && 'style-loader',
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        sourceMap: isEnvDevelopment,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: isEnvDevelopment,
      },
    },
  ].filter(Boolean),
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true,
});

// "file" loader makes sure those assets get served by WebpackDevServer.
// When you `import` an asset, you get its (virtual) filename.
// In production, they would get copied to the `build` folder.
// This loader doesn't use a "test" so it will catch all modules
// that fall through the other loaders.
const fileLoader = {
  loader: 'file-loader',
  // Exclude `js` files to keep "css" loader working as it injects
  // its runtime that would otherwise be processed through "file" loader.
  // Also exclude `html` and `json` extensions so they get processed
  // by webpacks internal loaders.
  exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
  options: {
    name: 'static/media/[name].[hash:8].[ext]',
  },
};

const getLoader = (isEnvDevelopment, isEnvProduction) => [
  inlineMediaLoader,
  srcJSLoader(isEnvProduction),
  libJSLoader(isEnvDevelopment),
  cssLoader(isEnvDevelopment, isEnvProduction),
  fileLoader,
  // ** STOP ** Are you adding a new loader?
  // Make sure to add the new loader(s) before the "file" loader.
];

module.exports = getLoader;
