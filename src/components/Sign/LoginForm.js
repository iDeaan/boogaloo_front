import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import InputText from '../FormFields/InputText';
import Button from '../AdditionalComponents/Button';
import validateFields from '../../helpers/validateFields';

const validate = values => {
  const validateObject = {
    requiredFields: ['login', 'password'],
    alphaNumberFields: ['login', 'password']
  };
  return validateFields(validateObject, values);
};

@reduxForm({
  form: 'LoginForm',
  validate
})
export default class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func
  };

  render() {
    const { handleSubmit } = this.props;

    require('./LoginForm.scss');
    return (
      <div className="login-form-container">
        <form
          onSubmit={handleSubmit((a, b, c) => console.log('value', a, b, c))}
          className="login-form"
        >
          <Field
            name="login"
            type="text"
            label="Логін"
            icon={'fa-user'}
            component={InputText}
          />
          <Field
            name="password"
            type="password"
            label="Пароль"
            icon={'fa-lock'}
            component={InputText}
          />
          <div className="login-form-actions">
            <Button
              text={'Увійти'}
              iconRight={'fa-sign-in'}
              submitButton
            />
          </div>
        </form>
        <Button
          text="Створити акаунт"
          className="register-button"
        />
      </div>
    );
  }
}
