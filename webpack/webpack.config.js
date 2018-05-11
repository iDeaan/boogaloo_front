const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
  target: "web",
  entry: [
    './src/client.js',
    // 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
  ],
  devtool: "inline-source-map",
  output: {
    filename: 'build.js'
  },
  // hot: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: "babel-loader",
            query: { compact: false }
          },
          {
            loader: "eslint-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'isomorphic-style-loader',
          },
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    webpackIsomorphicToolsPlugin.development(),
    new StyleLintPlugin(),
    new LiveReloadPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require('./dlls/vendor.json')
    })
  ]
};
