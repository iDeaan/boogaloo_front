import React from 'react';
import App from './containers/App/App';
import Foo from './components/Foo';
import Bar from './components/Bar';

import { StaticRouter } from 'react-router'
import {
    BrowserRouter as Router,
    Route,
    browserHistory
} from 'react-router-dom';

export default (isServer = false, req) => {
  if (isServer) {
    return (
      <StaticRouter history={browserHistory} location={req.url}>
        <App>
          <Route path='/foo' component={Foo} />
          <Route path='/bar' component={Bar} />
        </App>
      </StaticRouter>
    );
  }
  return (
    <Router history={browserHistory}>
      <App>
        <Route path='/foo' component={Foo} />
        <Route path='/bar' component={Bar} />
      </App>
    </Router>
  );
};
