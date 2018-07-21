import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUsers, submitNewFriend, rejectNewFriend } from '../../helpers/functions';

class SuggestionItem extends Component {
  static propTypes = {
    suggestionItem: PropTypes.object,
    auth: PropTypes.object
  };

  static defaultProps = {
    suggestionItem: {},
    auth: {}
  };

  handleAcceptFriend() {
    const { suggestionItem, auth } = this.props;
    submitNewFriend(auth.token, suggestionItem.id)
      .then(() => console.log('success'))
      .catch(err => console.log('err', err));
  }

  handleRejectFriend() {
    const { suggestionItem, auth } = this.props;
    rejectNewFriend(auth.token, suggestionItem.id)
      .then(() => console.log('success'))
      .catch(err => console.log('err', err));
  }

  render() {
    const { suggestionItem } = this.props;
    const avatar = suggestionItem && suggestionItem.images
      ? suggestionItem.images.find(image => image.image_type === 'avatar')
      : null;
    return (
      <div className="friend-suggestion-item">
        <div className="left-part">
          {avatar
            ? <img src={avatar.absolute_href} alt="avatar" />
            : <img src="/img/no_image.png" alt="avatar" />
          }
        </div>
        <div className="right-part">
          <div className="user-initials">
            {suggestionItem.name} {suggestionItem.surname}
          </div>
          <div className="user-actions">
            <div
              className="accept-button"
              onClick={() => this.handleAcceptFriend()}
            >
              Прийняти запит
            </div>
            <div
              className="decline-button"
              onClick={() => this.handleRejectFriend()}
            >
              Відхилити
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
