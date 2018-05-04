const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  target: "web",
  cache: true,
  entry: [
    './src/main.js',
    'webpack-hot-middleware/client?path=http://localhost:3030/__webpack_hmr'
  ],
  output: {
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [
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
    new StyleLintPlugin()
  ]
};
