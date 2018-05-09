// require.extensions['.scss'] = () => {
//   return;
// };
// require.extensions['.css'] = () => {
//   return;
// };
// require('babel-register')({
//   presets: ["es2015", "react", "stage-0"]
// });

var express = require('express');
const path = require('path');
var app = express();
var React = require('react');
var ReactDOMServer = require('react-dom/server');


import { renderToString } from "react-dom/server"
import Foo from './src/components/Foo';
import Html from './src/helpers/Html';


import routes from './src/routes';
// @TODO: move to src


import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createMemoryHistory from 'history/createMemoryHistory'
import { routerMiddleware } from 'react-router-redux'

import reducer from './src/redux/modules/reducer';




// import { createStore } from 'redux'
// import { Provider } from 'react-redux'
// // import { browserHistory } from 'react-router-dom'
// import { createBrowserHistory } from 'history';
// import { syncHistoryWithStore } from 'react-router-redux'
//
// import reducer from './src/redux/modules/reducer';
//
// const store = createStore(reducer);
// const history = syncHistoryWithStore(createBrowserHistory(), store);

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('dist'));
app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));
app.get('*', function(req, res) {

  const history = createMemoryHistory();
  const middleware = routerMiddleware(history);
  const store = createStore(reducer, applyMiddleware(middleware));

  console.log('store', store);

  webpackIsomorphicTools.refresh();
  res.send(renderToString(
    <Html store={store}>
      <Provider store={store}>
        {routes(true, req, history)}
      </Provider>
    </Html>
  ));
});



var PORT = 3000;
app.listen(PORT, function() {
  console.log('http://localhost:' + PORT);
});
