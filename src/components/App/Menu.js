import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MenuItem extends PureComponent {
  static propTypes = {
    linkTo: PropTypes.string,
    text: PropTypes.string
  };

  static defaultProps = {
    linkTo: '',
    text: ''
  };

  render() {
    const { linkTo, text } = this.props;
    return (
      <Link className="menu-item" to={linkTo}>
        {text}
      </Link>
    )
  }
}

export default class Menu extends PureComponent {
  render() {
    require('./Menu.scss');
    return (
      <div className="app-menu menu-container">
        <MenuItem linkTo="/" text="Новини" />
        <MenuItem linkTo="/friends" text="Друзі" />
        <MenuItem linkTo="/messages" text="Повідомлення" />
        <MenuItem linkTo="/sign" text="Реєстрація" />
      </div>
    );
  }
}
