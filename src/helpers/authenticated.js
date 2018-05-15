import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
const cookies = new Cookies();

const authenticated = (WrappedComponent) => {
  return class extends Component {
    render() {
      const token = cookies.get('token');
      const user = cookies.get('user');
      if (!token || !user) {
        this.props.history.push("/sign");
      }
      return <WrappedComponent />
    }
  }
};

export default authenticated;
