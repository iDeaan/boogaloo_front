import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import Button from '../AdditionalComponents/Button';
import { deleteFriend } from '../../helpers/functions';
import {
  sendNewMessage
} from "../../redux/modules/chats";

const renderTextArea = ({input, meta: { touched, error, warning }}) => (
  <textarea {...input} placeholder="Введіть повідомлення" className="data-input" />
);

@reduxForm({
  form: 'MessageInputForm'
})
export default class MessageInput extends Component {
  static  propTypes = {
    handleSubmit: PropTypes.func,
    blockHeight: PropTypes.number,
    chatId: PropTypes.number,
    token: PropTypes.string
  };

  static defaultProps = {
    blockHeight: 0,
    chatId: 0,
    token: ''
  };

  static contextTypes = {
    store: PropTypes.object
  };

  handleSubmit(values) {
    const { token, chatId } = this.props;
    const { dispatch } = this.context.store;

    values.chat_id = chatId;

    dispatch(sendNewMessage(token, values)).then((response) => console.log('response', response));
  }

  render() {
    const { handleSubmit, blockHeight } = this.props;
    return (
      <div className="text-input-container" style={{ height: `${blockHeight}px` }}>
        <form
          onSubmit={handleSubmit((values) => this.handleSubmit(values))}
          className="login-form"
        >
          <Field
            name="message"
            component={renderTextArea}
          />
          <div className="submit-button">
            <Button
              iconRight="fa-paper-plane" text="Відправити"
              submitButton
            />
          </div>
        </form>
      </div>
    );
  }
}
