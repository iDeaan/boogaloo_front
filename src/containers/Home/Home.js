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
export default class Home extends Component {
  render() {
    return (
      <div className="home-container route-container">
        HOME
      </div>
    );
  }
}
