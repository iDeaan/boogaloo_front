import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { submitNewFriend, rejectNewFriend } from '../../helpers/functions';
import { submitNewFriendById } from '../../redux/modules/friends';

export default class SuggestionItem extends Component {
  static propTypes = {
    suggestionItem: PropTypes.object,
    auth: PropTypes.object
  };

  static defaultProps = {
    suggestionItem: {},
    auth: {}
  };

  static contextTypes = {
    store: PropTypes.object
  };

  handleAcceptFriend() {
    const { dispatch } = this.context.store;
    const { suggestionItem, auth } = this.props;
    submitNewFriend(auth.token, suggestionItem.id)
      .then(() => dispatch(submitNewFriendById(suggestionItem.id)))
      .catch(err => console.log('err', err));
  }

  handleRejectFriend() {
    const { suggestionItem, auth } = this.props;
    rejectNewFriend(auth.token, suggestionItem.id)
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
