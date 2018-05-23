import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { PropTypes, instanceOf } from 'prop-types';
import { Cookies } from 'react-cookie';
import InputText from '../FormFields/InputText';
import Button from '../AdditionalComponents/Button';
import validateFields from '../../helpers/validateFields';
import { signIn } from "../../redux/modules/auth";

const validate = values => {
  const validateObject = {
    requiredFields: ['login', 'password'],
    alphaNumberFields: ['login', 'password']
  };
  return validateFields(validateObject, values);
};

const cookies = new Cookies();

@reduxForm({
  form: 'LoginForm',
  validate
})
export default class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    onRegisterButtonClick: PropTypes.func,
    cookies: instanceOf(Cookies).isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  handleSubmit(values) {
    const { dispatch } = this.context.store;
    const { router } = this.context;

    dispatch(signIn(values.login, values.password)).then((response) => {
      const { data } = response;
      const { token, user_id: userId } = data.token;

      cookies.set('token', token, { path: '/' });
      cookies.set('user', userId, { path: '/' });

      router.history.push('/');
    }).catch((err) => {
      console.log('catch', err);
    })
  }

  render() {
    const { handleSubmit, onRegisterButtonClick } = this.props;

    require('./LoginForm.scss');
    return (
      <div className="login-form-container">
        <form
          onSubmit={handleSubmit((values) => this.handleSubmit(values))}
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
          onClick={() => onRegisterButtonClick()}
        />
      </div>
    );
  }
}
