import React from 'react';
import App from './containers/App/App';
import Foo from './components/Foo';
import Bar from './components/Bar';

import { StaticRouter } from 'react-router'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';


export default (isServer = false, req, history) => {
  if (isServer) {
    return (
      <App>
        <Route path='/foo' component={Foo} />
        <Route path='/bar' component={Bar} />
      </App>
    );
  }
  return (
    <Router history={history}>
      <App>
        <Route path='/foo' component={Foo} />
        <Route path='/bar' component={Bar} />
      </App>
    </Router>
  );
};
