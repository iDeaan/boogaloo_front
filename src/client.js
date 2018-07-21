import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import routes from './routes';
import reducer from './redux/modules/reducer';

import clientMiddleware from '../src/redux/middleware/clientMiddleware';
import ApiClient from '../src/helpers/ApiClient';

const client = new ApiClient();
const middleware = [
  clientMiddleware(client),
  routerMiddleware()
];

/* eslint-disable */
const store = createStore(
  reducer,
  compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <BrowserRouter>
        <ReduxAsyncConnect routes={routes} filter={item => !item.deferred} helpers={{ client }} />
      </BrowserRouter>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);
/* eslint-enable */
