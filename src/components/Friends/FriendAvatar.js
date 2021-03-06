import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../AdditionalComponents/Button';
import { deleteFriend, checkIfChatWithFriendExists } from '../../helpers/functions';
import { deleteFriend as deleteFriendFromStore } from '../../redux/modules/friends';
import { createNewChat, selectChat } from '../../redux/modules/chats';

export default class FriendAvatar extends Component {
  static propTypes = {
    friend: PropTypes.object,
    token: PropTypes.string
  };

  static defaultProps = {
    friend: {},
    token: ''
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  handleFriendDelete(people) {
    const { dispatch } = this.context.store;
    const { token } = this.props;

    deleteFriend(token, people.id).then(() => {
      dispatch(deleteFriendFromStore(people.id));
    });
  }

  handleWriteMessage(people) {
    const { dispatch } = this.context.store;
    const { history } = this.context.router;
    const { token } = this.props;

    checkIfChatWithFriendExists(token, people.id)
      .then((response) => {
        if (response && response.data && response.data.chat_id) {
          dispatch(selectChat(response.data.chat_id));
          history.push('/chats');
        }
      })
      .catch(() =>
        dispatch(createNewChat(token, people.id))
          .then((response) => {
            dispatch(selectChat(response.data.chat_id));
            history.push('/chats');
          }));
  }

  render() {
    const { friend } = this.props;

    const avatarImage = friend.images && friend.images.find(image => image.image_type === 'avatar');

    require('./FriendAvatar.scss');
    return (
      <div className="friend-avatar-container">
        <div className="friend-avatar">
          {avatarImage
            ? (
              <div className="friend-image">
                {avatarImage.absolute_href
                  ? <img src={avatarImage.absolute_href} alt="avatar" />
                  : <img src={avatarImage.href} alt="avatar" />
                }
              </div>
            )
            : (
              <div className="friend-image">
                <img src="/img/no_image.png" alt="avatar" />
              </div>
            )
          }
        </div>
        <div className="friend-initial">
          <div className="name">{friend.name}</div>
          <div className="surname">{friend.surname}</div>
        </div>
        <div className="friend-actions">
          <Button
            text="Написати повідомлення"
            className="register-button"
            onClick={() => this.handleWriteMessage(friend)}
          />
          <Button
            text="Видалити друга"
            className="register-button"
            onClick={() => this.handleFriendDelete(friend)}
          />
        </div>
      </div>
    );
  }
}
