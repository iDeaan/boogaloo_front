import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FriendsSearch extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {}
  };

  render() {
    const { onChange } = this.props;

    require('./FriendsSearch.scss');
    return (
      <div className="friends-search-container">
        <i className="fa fa-search" />
        <input
          type="text"
          name="friends_initials"
          placeholder="Пошук друзів"
          onChange={onChange}
        />
      </div>
    );
  }

}
