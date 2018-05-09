import React, { Component } from 'react';
import { signIn } from "../../redux/modules/auth";
import { asyncConnect } from "redux-connect";

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    if (!getState().auth.signed) {
      promises.push(dispatch(signIn()));
    }

    return Promise.all(promises).then(() => {});
  }
}])
export default class Register extends Component {
  render() {
    require('./Register.scss');
    return (
      <div className="register-container route-container">
        REGISTRATION
      </div>
    );
  }
}
