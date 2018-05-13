import React, { Component } from 'react';
import { signIn } from "../../redux/modules/auth";
import { asyncConnect } from "redux-connect";
import LoginForm from '../../../src/components/Sign/LoginForm';
import RegisterForm from '../../../src/components/Sign/RegisterForm';

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
  constructor(props) {
    super(props);
    this.state = {
      isLoginSelected: true
    }
  }

  render() {
    const { isLoginSelected } = this.state;

    require('./Sign.scss');
    return (
      <div className={`sign-container route-container ${!isLoginSelected ? 'register-container' : ''}`}>
        <div className="sign-blurred">
          <div className="sign-header">
            Boogaloo
          </div>
          <div className="sign-content">
            {isLoginSelected
              ? <LoginForm onRegisterButtonClick={() => this.setState({ isLoginSelected: false })} />
              : <RegisterForm onBackButtonClick={() => this.setState({ isLoginSelected: true })}/>
            }
          </div>
        </div>
      </div>
    );
  }
}
