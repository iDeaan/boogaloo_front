import React, { Component } from 'react';
import { reduxForm, Field, change } from 'redux-form';
import PropTypes from 'prop-types';
import Button from '../AdditionalComponents/Button';
import InputTextArea from '../FormFields/InputTextArea';

@reduxForm({
  form: 'MessageEditForm'
})
export default class MessageInput extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    onCancelEditing: PropTypes.func,
    reset: PropTypes.func,
    messageValue: PropTypes.string
  };

  static defaultProps = {
    handleSubmit: () => {},
    onCancelEditing: () => {},
    reset: () => {},
    messageValue: '',
  };

  static contextTypes = {
    store: PropTypes.object
  };

  componentDidMount() {
    const { dispatch } = this.context.store;
    const { messageValue } = this.props;
    dispatch(change('MessageEditForm', 'message', messageValue));
  }

  handleSubmit(values) {
    console.log('submitValues', values);
  }

  handleKeyDown = (e, cb) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      cb();
    }
  };

  render() {
    const { handleSubmit, reset, onCancelEditing } = this.props;

    require('./MessageEdit.scss');
    return (
      <div
        className="editable-message-data edit-message-container"
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
        }}
      >
        <form
          onSubmit={handleSubmit(values => this.handleSubmit(values))}
          onKeyDown={(e) => { this.handleKeyDown(e, handleSubmit(values => this.handleSubmit(values))); }}
        >
          <Field
            name="message"
            component={InputTextArea}
            handleSubmit={handleSubmit}
          />
          <div className="message-actions">
            <Button
              text="Відмінити"
              className="reset-button"
              onClick={() => {
                reset();
                onCancelEditing();
              }}
            />
            <Button
              text="Зберегти"
              className="submit-button"
              submitButton
            />
          </div>
        </form>
      </div>
    );
  }
}
