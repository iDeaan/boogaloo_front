import React, { Component } from 'react';
import {
  userPrintingMessageStart,
  userPrintingMessageStop
} from '../../helpers/sockets';
import {connect} from "react-redux";

@connect(
  state => ({
    selectedChat: state.chats.selectedChat,
    userData: state.auth.data
  })
)
export default class InputTextArea extends Component {
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
      userPrintingMessageStart(selectedChat, userInformation);
    }

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.setState({ printingMessage: false });
      userPrintingMessageStop(selectedChat, userInformation);
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
