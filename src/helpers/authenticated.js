/* eslint-disable */
import React, { Component } from 'react';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const authenticated = WrappedComponent => class extends Component {
  render() {
    const token = cookies.get('token');
    const user = cookies.get('user');
    if (!token || !user) {
      this.props.history.push('/sign');
    }
    return <WrappedComponent />;
  }
};
/* eslint-enable */

export default authenticated;
