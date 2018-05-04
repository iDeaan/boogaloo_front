const webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
