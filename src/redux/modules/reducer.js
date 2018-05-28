import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect'
import { reducer as formReducer } from 'redux-form'

import counter from './counter';
import auth from './auth';
import friends from './friends';
import people from './people';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  counter,
  auth,
  friends,
  people,
  form: formReducer
});
