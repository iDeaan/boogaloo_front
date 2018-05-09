const path = require('path');
const rootDir = path.resolve(__dirname);
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack-isomorphic-tools'))
//  .development(__DEVELOPMENT__)
  .server(rootDir, function() {
    require('./src/server');
  });
