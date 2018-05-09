import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect'

import counter from './counter';
import auth from './auth';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  counter,
  auth
});
