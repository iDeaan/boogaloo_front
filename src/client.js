import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

import routes from './routes';
import reducer from './redux/modules/reducer';


// const history = createBrowserHistory();
const middleware = routerMiddleware({});
const store = createStore(reducer, applyMiddleware(middleware));

/* eslint-disable */
ReactDOM.render(
  <Provider store={store}>
    {routes(false, null, history)}
  </Provider>,
  document.getElementById('root')
);
/* eslint-enable */
