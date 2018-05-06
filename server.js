require('babel-register')({
  presets: ['react', 'es2015']
});

var express = require('express');
const path = require('path');
var app = express();
var React = require('react');
var ReactDOMServer = require('react-dom/server');


import { renderToString } from "react-dom/server"
import Foo from './src/components/Foo';
import Html from './src/helpers/Html';


// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('dist'));
// app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  res.send(renderToString(
    <Html>
      <Foo />
    </Html>
  ));
});



var PORT = 3000;
app.listen(PORT, function() {
  console.log('http://localhost:' + PORT);
});
