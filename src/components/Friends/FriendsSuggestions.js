import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUsers } from '../../helpers/functions';
import SuggestionItem from './SuggestionItem';

@connect(state => ({
  friendSuggestionIds: state.friends.friendSuggestionIds,
  auth: state.auth
}))
export default class FriendsSuggestions extends Component {
  static propTypes = {
    auth: PropTypes.object
  };

  static defaultProps = {
    auth: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      suggestionsList: []
    };
  }

  componentDidMount() {
    this.loadUsersSuggestions(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadUsersSuggestions(nextProps);
  }

  loadUsersSuggestions(props) {
    const usersIds = props.friendSuggestionIds.map(suggestion => suggestion.friend_id);
    loadUsers(usersIds).then((response) => {
      this.setState({ suggestionsList: response.data });
    });
  }

  render() {
    const { suggestionsList } = this.state;
    const { auth } = this.props;
    require('./FriendsSuggestions.scss');
    return (
      <div className="friends-suggestion-container">
        {suggestionsList && suggestionsList.length
          ? suggestionsList.map(suggestion =>
            <SuggestionItem suggestionItem={suggestion} auth={auth} />)
          : ''
        }
      </div>
    );
  }
}
