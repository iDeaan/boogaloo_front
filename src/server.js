import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { renderToString } from 'react-dom/server';
import { routerMiddleware } from 'react-router-redux';
import { parse as parseUrl } from 'url';
import { StaticRouter } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { CookiesProvider } from 'react-cookie';
import createMemoryHistory from 'history/createMemoryHistory';

import Html from './helpers/Html';
import ApiClient from './helpers/ApiClient';

import reducer from './redux/modules/reducer';
import clientMiddleware from './redux/middleware/clientMiddleware';

import routes from './routes';

const express = require('express');

const app = express();
const React = require('react');

const cookiesMiddleware = require('universal-cookie-express');

app.use(express.static('dist'));
app.use(express.static('public'));
app.use(cookiesMiddleware());

app.get('*', (req, res) => {
  const client = new ApiClient(req);
  const history = createMemoryHistory();

  const url = req.originalUrl || req.url;
  const location = parseUrl(url);

  const middleware = [
    clientMiddleware(client),
    routerMiddleware(history)
  ];
  const store = createStore(reducer, applyMiddleware(...middleware));

  const helpers = {};

  webpackIsomorphicTools.refresh();

  loadOnServer({
    store, location, routes, helpers
  })
    .then(() => {
      const context = {};

      const appHTML = renderToString(<Html store={store}>
        <CookiesProvider cookies={req.universalCookies}>
          <Provider store={store} key="provider">
            <StaticRouter location={location} context={context}>
              <ReduxAsyncConnect routes={routes} helpers={helpers} filter={item => !item.deferred} />
            </StaticRouter>
          </Provider>
        </CookiesProvider>
      </Html>);

      res.send(appHTML);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
