import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

import { ReduxAsyncConnect, loadOnServer, reducer as reduxAsyncConnect } from 'redux-connect'
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

// import routes from './routes';
import reducer from './redux/modules/reducer';

import clientMiddleware from '../src/redux/middleware/clientMiddleware';
import ApiClient from '../src/helpers/ApiClient';


const client = new ApiClient();
const middleware = [
  clientMiddleware(client),
  routerMiddleware() // DELETE EMPTY OBJECT
];

import App from './containers/App/App';
import Foo from './components/Foo';
import Bar from './components/Bar';
import Header from './components/App/Header';

const routes = [{
  path: '/',
  component: App,
  routes: [
    {
      path: '/foo',
      component: Foo,
    },
    {
      path: '/bar',
      component: Bar,
    },
    {
      path: '/header',
      component: Header,
    }
  ]
}]

const store = createStore(reducer,
  compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

/* eslint-disable */
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ReduxAsyncConnect routes={routes} filter={item => !item.deferred} helpers={{client}} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
/* eslint-enable */
