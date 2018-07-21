/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Home extends Component {
  static propTypes = {
    userData: PropTypes.object
  };

  static defaultProps = {
    userData: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      clicked: 0
    };
  }

  render() {
    const { userData } = this.props;

    return (
      <div className="home-container route-container">
        HOME {userData && userData.name}
      </div>
    );
  }
}

/* eslint-enable */
