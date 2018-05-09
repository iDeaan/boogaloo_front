import React, { Component } from 'react';

const authenticated = (WrappedComponent) => {
  return class extends Component {
    render() {
      this.props.history.push("/sign");
      return <WrappedComponent />
    }
  }
};

export default authenticated;
