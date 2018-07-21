import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  userPrintingMessageStart,
  userPrintingMessageStop
} from '../../helpers/sockets';

@connect(state => ({
  selectedChat: state.chats.selectedChat,
  userData: state.auth.data
}))
export default class InputTextArea extends Component {
  static propTypes = {
    selectedChat: PropTypes.object,
    userData: PropTypes.object,
    input: PropTypes.object
  };

  static defaultProps = {
    selectedChat: {},
    userData: {},
    input: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      printingMessage: false
    };
  }

  handleKeyPress() {
    const { selectedChat, userData } = this.props;
    const { printingMessage } = this.state;

    const userInformation = `${userData[0].name} ${userData[0].surname}`;

    if (printingMessage === false) {
      this.setState({ printingMessage: true });
      userPrintingMessageStart(selectedChat, userInformation, userData[0].id);
    }

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.setState({ printingMessage: false });
      userPrintingMessageStop(selectedChat, userInformation, userData[0].id);
    }, 1000);
  }

  render() {
    const { input } = this.props;
    return (
      <textarea
        {...input}
        placeholder="Введіть повідомлення"
        className="data-input"
        id="input-text-area"
        onKeyPress={() => this.handleKeyPress()}
      />
    );
  }
}
