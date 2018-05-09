// require.extensions['.scss'] = () => {
//   return;
// };
// require.extensions['.css'] = () => {
//   return;
// };
// require('babel-register')({
//   presets: ["es2015", "react", "stage-0"]
// });

// import Header from "./src/components/App/Header";

var express = require('express');
const path = require('path');
var app = express();
var React = require('react');
var ReactDOMServer = require('react-dom/server');


import { renderToString } from "react-dom/server"
// import Foo from './src/components/Foo';
import Html from './src/helpers/Html';


// import routes from './src/routes';
// @TODO: move to src


import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createMemoryHistory from 'history/createMemoryHistory'
import { routerMiddleware } from 'react-router-redux'
import { parse as parseUrl } from 'url'

import { StaticRouter } from 'react-router'

import { match } from 'react-router'
import { ReduxAsyncConnect, loadOnServer, reducer as reduxAsyncConnect } from 'redux-connect'

import reducer from './src/redux/modules/reducer';

import clientMiddleware from './src/redux/middleware/clientMiddleware';
import ApiClient from './src/helpers/ApiClient';



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

import App from './src/containers/App/App';
import Foo from './src/components/Foo';
import Bar from './src/components/Bar';
import Header from './src/components/App/Header';

const routes = [{
  path: '/',
  component: App,
  routes: [
    {
      path: '/foo',
      exact: true,
      component: Foo,
    },
    {
      path: '/bar',
      exact: true,
      component: Bar,
    },
    {
      path: '/header',
      component: Header,
    }
  ]
}]

app.use(express.static('dist'));
app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));
app.get('*', function(req, res) {
  const client = new ApiClient(req);
  const history = createMemoryHistory();

  const url = req.originalUrl || req.url
  const location = parseUrl(url)

  const middleware = [
    clientMiddleware(client),
    routerMiddleware(history)
  ];
  const store = createStore(reducer, applyMiddleware(...middleware));

  const helpers = {};

  // const routesList = routes(true);

  // console.log('store', store);
  // console.log('routes', routes(true));

  console.log('routes', routes);
  console.log('store', store);

  loadOnServer({ store, location, routes, helpers })
    .then(() => {
      const context = {}



      const appHTML = renderToString(
        <Html store={store}>
          <Provider store={store} key="provider">
            <StaticRouter location={location} context={context}>
              <ReduxAsyncConnect routes={routes} helpers={helpers} />
            </StaticRouter>
          </Provider>
        </Html>
      );

      webpackIsomorphicTools.refresh();
      res.send(appHTML);
    })
});



var PORT = 3000;
app.listen(PORT, function() {
  console.log('http://localhost:' + PORT);
});
