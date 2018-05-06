import React from 'react';
import ReactDOM from 'react-dom';
// import App from './containers/App/App';
// import Bar from './components/Bar';
import Foo from './components/Foo';
import Html from './helpers/Html';
// import Home from './components/Home';

// import { createStore, combineReducers } from 'redux'
// import { Provider } from 'react-redux'
import {
    BrowserRouter as Router,
    Route,
    browserHistory
} from 'react-router-dom';
// import { Router, Route, browserHistory } from 'react-router'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

// const store = createStore(
//   combineReducers({
//     // ...reducers,
//     routing: routerReducer
//   })
// )

// const history = syncHistoryWithStore(browserHistory, store)

/* eslint-disable */
// ReactDOM.render(
//   <Router history={browserHistory}>
//     <App>
//       <Route path='/foo' component={Foo} />
//       <Route path='/bar' component={Bar} />
//     </App>
//   </Router>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <Foo />,
  document.getElementById('root')
);
/* eslint-enable */
