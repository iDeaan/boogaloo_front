import React, { Component } from 'react';
import { signIn } from "../../redux/modules/auth";
import { asyncConnect } from "redux-connect";

export default class LoginForm extends Component {
  render() {
    return (
      <div className="login-form">
        <input type="text" placeholder="Login" />
        <input type="text" placeholder="Password" />
      </div>
    );
  }
}
