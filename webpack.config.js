module.exports = {
  entry: './src/azaaz.js',
  output: {
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/
      }
    ]
  }
};
