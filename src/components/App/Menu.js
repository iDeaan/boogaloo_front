import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuItem from './MenuItem';

@connect(state => ({
  friendSuggestCount: state.friends.friendSuggestCount,
  usersNotReadMessagesTotal: state.usersNotReadMessages.usersNotReadMessagesTotal
}))
export default class Menu extends Component {
  static propTypes = {
    friendSuggestCount: PropTypes.number,
    usersNotReadMessagesTotal: PropTypes.number
  };

  static defaultProps = {
    friendSuggestCount: 0,
    usersNotReadMessagesTotal: 0
  };

  render() {
    const { friendSuggestCount, usersNotReadMessagesTotal } = this.props;
    require('./Menu.scss');
    return (
      <div className="app-menu menu-container">
        <MenuItem linkTo="/profile" text="Моя сторінка" />
        <MenuItem linkTo="/" text="Новини" />
        <MenuItem linkTo="/friends" text="Друзі" count={friendSuggestCount} />
        <MenuItem linkTo="/chats" text="Повідомлення" count={usersNotReadMessagesTotal} />
        <MenuItem linkTo="/sign" text="Реєстрація" />
        <br /><br />
        <MenuItem linkTo="/people" text="Люди" />
      </div>
    );
  }
}
