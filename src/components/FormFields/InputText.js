
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputText extends Component {
  static propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    label: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string
  };

  static defaultProps = {
    input: {},
    meta: {},
    label: {},
    icon: '',
    type: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      displayLoader: false
    };
  }

  handleKeyPress() {
    const { displayLoader } = this.state;

    if (displayLoader === false) {
      this.setState({ displayLoader: true });
    }

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.setState({ displayLoader: false });
    }, 500);
  }

  renderInputResult() {
    const { input, meta } = this.props;

    if (input.value || meta.submitFailed) {
      return (
        <div className={`input-validation-result ${meta.valid ? 'success' : 'fail'}`}>
          {meta.valid
            ? (
              <i className="fa fa-check" />
            ) : (
              <i className="fa fa-times" />
            )
          }
          {meta.error ?
            <div className="input-error">{meta.error}</div>
          : ''}
        </div>
      );
    }

    return '';
  }

  render() {
    const {
      input, label, icon, type
    } = this.props;
    const { displayLoader } = this.state;

    const { name } = input;

    require('./InputText.scss');
    return (
      <div className={`form-input text-input-item ${icon ? 'with-icon' : ''}`}>
        {icon
          ? (
            <div className="icon-placeholder">
              <i className={`fa ${icon}`} />
            </div>
          ) : ''
        }
        {displayLoader
          ? (
            <div className="input-loader">
              <i className="fa fa-spinner" />
            </div>
          ) : this.renderInputResult()
        }
        <input
          onChange={event => input.onChange(event.target.value)}
          type={type}
          name={name}
          placeholder={label}
          onKeyPress={() => this.handleKeyPress()}
        />
      </div>
    );
  }
}
