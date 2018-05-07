var path = require('path');
var rootDir = path.resolve(__dirname);
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack-isomorphic-tools'))
//  .development(__DEVELOPMENT__)
  .server(rootDir, function() {
    require('./_server');
  });
