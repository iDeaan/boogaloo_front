import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";


class MenuItem extends PureComponent {
  static propTypes = {
    linkTo: PropTypes.string,
    text: PropTypes.string,
    count: PropTypes.number
  };

  static defaultProps = {
    linkTo: '',
    text: ''
  };

  render() {
    const { linkTo, text, count } = this.props;
    return (
      <Link className="menu-item" to={linkTo}>
        <span className="text">{text}</span>
        {count && count > 0
          ? <span className="number">{count}</span>
          : ''
        }
      </Link>
    )
  }
}

@connect(
  state => ({
    friendSuggestCount: state.friends.friendSuggestCount
  })
)
export default class Menu extends Component {
  static propTypes = {
    friendSuggestCount: PropTypes.number
  };

  static defaultProps = {
    friendSuggestCount: 0
  };

  render() {
    const { friendSuggestCount } = this.props;
    require('./Menu.scss');
    return (
      <div className="app-menu menu-container">
        <MenuItem linkTo="/profile" text="Моя сторінка" />
        <MenuItem linkTo="/" text="Новини" />
        <MenuItem linkTo="/friends" text="Друзі" count={friendSuggestCount} />
        <MenuItem linkTo="/chats" text="Повідомлення" />
        <MenuItem linkTo="/sign" text="Реєстрація" />
        <br /><br />
        <MenuItem linkTo="/people" text="Люди" />
      </div>
    );
  }
}
