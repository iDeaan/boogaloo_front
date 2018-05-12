import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Button extends Component {
  static propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string,
    buttonStyleType: PropTypes.string,
    submitButton: PropTypes.bool
  };

  static defaultProps = {
    text: '',
    icon: '',
    buttonStyleType: 'default-button',
    submitButton: false
  };

  render() {
    const { text, icon, buttonStyleType, submitButton } = this.props;

    const customProps = {};
    if (submitButton) {
      customProps.type = "submit"
    }

    require('./Button.scss');
    return (
      <button
        className={`button-container ${buttonStyleType}`}
        {...customProps}
      >
        <div className="text">
          {text}
        </div>
        {icon
          ? (
            <div className="button-icon">
              <i className={`fa ${icon}`} />
            </div>
          ) : ''
        }
      </button>
    );
  }
}
