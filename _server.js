const express = require('express');
const app = express();
const React = require('react');
import { renderToString } from "react-dom/server"

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

import routes from './src/routes';

app.use(express.static('dist'));
app.use(express.static('public'));

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

  webpackIsomorphicTools.refresh();

  loadOnServer({ store, location, routes, helpers })
    .then(() => {
      const context = {}

      const appHTML = renderToString(
        <Html store={store}>
          <Provider store={store} key="provider">
            <StaticRouter location={location} context={context}>
              <ReduxAsyncConnect routes={routes} helpers={helpers} filter={item => !item.deferred} />
            </StaticRouter>
          </Provider>
        </Html>
      );

      res.send(appHTML);
    })
});

const PORT = 3000;
app.listen(PORT, function() {
  console.log('http://localhost:' + PORT);
});
