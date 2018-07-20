import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class AnimatedDots extends Component {
  render() {
    require('./AnimatedDots.scss');
    return (
      <div className="animated-dots-container">
        <div className="animated-dots">
          <span>.</span><span>.</span><span>.</span>
        </div>
      </div>
    );
  }
}
