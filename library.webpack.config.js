var path = require('path');
var webpack = require('webpack');
var projectRootPath = path.resolve(__dirname, '/');
console.log('__dirname', path.resolve(__dirname + '/dist/dlls/'));
module.exports = {
  // devtool: 'inline-source-map',

  output: {
    filename: 'vendor.dll.js',
    path: path.resolve(__dirname + '/dist/dlls/'),
    library: 'vendor'
  },

  entry: {
    vendor: [
      'babel-polyfill',
      'babel-runtime/core-js/array/from',
      'babel-runtime/core-js/get-iterator',
      'babel-runtime/core-js/is-iterable',
      'babel-runtime/core-js/json/stringify',
      'babel-runtime/core-js/number/is-integer',
      'babel-runtime/core-js/number/is-safe-integer',
      'babel-runtime/core-js/object/assign',
      'babel-runtime/core-js/object/create',
      'babel-runtime/core-js/object/define-property',
      'babel-runtime/core-js/object/get-own-property-descriptor',
      'babel-runtime/core-js/object/get-own-property-names',
      'babel-runtime/core-js/object/get-prototype-of',
      'babel-runtime/core-js/object/keys',
      'babel-runtime/core-js/object/set-prototype-of',
      'babel-runtime/core-js/promise',
      'babel-runtime/core-js/symbol',
      'babel-runtime/core-js/symbol/iterator',
      'babel-runtime/helpers/class-call-check',
      'babel-runtime/helpers/classCallCheck',
      'babel-runtime/helpers/create-class',
      'babel-runtime/helpers/createClass',
      'babel-runtime/helpers/defineProperty',
      'babel-runtime/helpers/extends',
      'babel-runtime/helpers/get',
      'babel-runtime/helpers/inherits',
      'babel-runtime/helpers/interop-require-default',
      'babel-runtime/helpers/interopRequireDefault',
      'babel-runtime/helpers/object-without-properties',
      'babel-runtime/helpers/objectWithoutProperties',
      'babel-runtime/helpers/possibleConstructorReturn',
      'babel-runtime/helpers/slicedToArray',
      'babel-runtime/helpers/to-consumable-array',
      'babel-runtime/helpers/toConsumableArray',
      'babel-runtime/helpers/typeof',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
    ]
  },

  plugins: [
    new webpack.DllPlugin({
      name: 'vendor',
      path: path.resolve(__dirname + '/dist/dlls/vendor.json')
    })
  ]
};
