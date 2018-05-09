import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

import routes from './routes';
import reducer from './redux/modules/reducer';

import clientMiddleware from '../src/redux/middleware/clientMiddleware';
import ApiClient from '../src/helpers/ApiClient';


const client = new ApiClient();
const middleware = [
  clientMiddleware(client),
  routerMiddleware({}) // DELETE EMPTY OBJECT
];

const store = createStore(reducer,
  compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

/* eslint-disable */
ReactDOM.render(
  <Provider store={store}>
    {routes(false, null, history)}
  </Provider>,
  document.getElementById('root')
);
/* eslint-enable */
