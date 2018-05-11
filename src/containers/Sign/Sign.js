import React, { Component } from 'react';
import { signIn } from "../../redux/modules/auth";
import { asyncConnect } from "redux-connect";
import LoginForm from '../../../src/components/Sign/LoginForm';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    if (!getState().auth.signed) {
      promises.push(dispatch(signIn()));
    }

    return Promise.all(promises).then(() => {});
  }
}])
export default class Sign extends Component {
  render() {
    require('./Sign.scss');
    return (
      <div className="sign-container route-container">
        <div className="sign-blurred">
          <div className="sign-header">
            Boogaloo
          </div>
          <div className="sign-content">
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}
