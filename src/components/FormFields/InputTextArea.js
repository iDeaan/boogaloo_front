import React, { Component } from 'react';

export default class InputTextArea extends Component {
  render() {
    const { input } = this.props;
    return (
      <textarea
        {...input}
        placeholder="Введіть повідомлення"
        className="data-input"
        id="input-text-area"
      />
    );
  }
}
