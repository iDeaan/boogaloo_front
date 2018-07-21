import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import InputText from '../FormFields/InputText';
import Button from '../AdditionalComponents/Button';
import validateFields from '../../helpers/validateFields';
import { registerNewUser } from '../../redux/modules/auth';

const validate = (values) => {
  const validateObject = {
    requiredFields: ['name', 'surname', 'email', 'login', 'password', 'passwordRepeat'],
    alphaFields: ['name', 'surname'],
    alphaNumberFields: ['login', 'password'],
    emailFields: ['email'],
    matchFields: [{ firstItem: 'password', secondItem: 'passwordRepeat' }],
    minLengthFields: [{ title: 'password', length: '5' }]
  };
  return validateFields(validateObject, values);
};

@reduxForm({
  form: 'RegisterForm',
  validate
})
export default class RegisterForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    onBackButtonClick: PropTypes.func
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleSubmit(values) {
    const { dispatch } = this.context.store;
    const { onBackButtonClick } = this.props;

    dispatch(registerNewUser(values)).then(() => {
      onBackButtonClick();
      // DISPLAY NOTIFICATION;
    }).catch((err) => {
      console.log('catch', err);
    });
  }

  render() {
    const { handleSubmit, onBackButtonClick } = this.props;

    require('./RegisterForm.scss');
    return (
      <div className="register-form-container">
        <form
          onSubmit={handleSubmit(values => this.handleSubmit(values))}
          className="register-form"
        >
          <Field
            name="name"
            type="text"
            label="Ім'я"
            icon="fa-user-circle"
            component={InputText}
          />
          <Field
            name="surname"
            type="text"
            label="Прізвищен"
            icon="fa-user-circle"
            component={InputText}
          />
          <Field
            name="email"
            type="text"
            label="Email"
            icon="fa-at"
            component={InputText}
          />
          <Field
            name="login"
            type="text"
            label="Логін"
            icon="fa-user"
            component={InputText}
          />
          <Field
            name="password"
            type="password"
            label="Пароль"
            icon="fa-key"
            component={InputText}
          />
          <Field
            name="passwordRepeat"
            type="password"
            label="Повторрення паролю"
            icon="fa-lock"
            component={InputText}
          />
          <div className="register-form-actions">
            <Button
              text="Створити акаунт"
              submitButton
            />
          </div>
        </form>
        <Button
          text="Назад"
          className="back-button"
          onClick={() => onBackButtonClick()}
        />
      </div>
    );
  }
}
