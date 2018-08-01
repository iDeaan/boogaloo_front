import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import Button from '../AdditionalComponents/Button';
import { sendNewMessage, editChatOrder } from '../../redux/modules/chats';
import InputTextArea from '../FormFields/InputTextArea';
import { clearChatNotReadMessage } from '../../redux/modules/usersNotReadMessages';

@reduxForm({
  form: 'MessageInputForm'
})
export default class MessageInput extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    reset: PropTypes.func,
    blockHeight: PropTypes.number,
    usersNotReadMessages: PropTypes.array,
    chatId: PropTypes.number,
    token: PropTypes.string
  };

  static defaultProps = {
    handleSubmit: () => {},
    reset: () => {},
    blockHeight: 0,
    usersNotReadMessages: [],
    chatId: 0,
    token: ''
  };

  static contextTypes = {
    store: PropTypes.object
  };

  handleSubmit(values) {
    const { token, chatId, reset } = this.props;
    const { dispatch } = this.context.store;

    const newMessage = values;
    newMessage.chat_id = chatId;

    dispatch(sendNewMessage(token, newMessage)).then((response) => {
      const messageData = Array.isArray(response) ? response.data[0] : response.data;
      dispatch(editChatOrder(messageData.chat_id, messageData.createdAt));
      reset();
    });
  }

  handleKeyDown = (e, cb) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      cb();
    }
  };

  handleFocus() {
    const { dispatch } = this.context.store;
    const { token, chatId, usersNotReadMessages } = this.props;

    if (usersNotReadMessages.messagesCount) {
      const lastItemId = usersNotReadMessages.idsList[usersNotReadMessages.messagesCount - 1];
      dispatch(clearChatNotReadMessage(token, chatId, lastItemId));
    }
  }

  render() {
    const { handleSubmit, blockHeight } = this.props;

    return (
      <div className="text-input-container" style={{ height: `${blockHeight}px` }}>
        <form
          onSubmit={handleSubmit(values => this.handleSubmit(values))}
          onKeyDown={(e) => { this.handleKeyDown(e, handleSubmit(values => this.handleSubmit(values))); }}
          onFocus={() => this.handleFocus()}
          className="login-form"
        >
          <Field
            name="message"
            component={InputTextArea}
            handleSubmit={handleSubmit}
          />
          <div className="submit-button">
            <Button
              iconRight="fa-paper-plane"
              text="Відправити"
              submitButton
            />
          </div>
        </form>
      </div>
    );
  }
}
