import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../AdditionalComponents/Button';
import { deleteFriend } from '../../helpers/functions';
import {
  deleteFriend as deleteFriendFromStore
} from "../../redux/modules/friends";

class ChatItem extends Component {
  static  propTypes = {
    chat: PropTypes.object,
    chatUsers: PropTypes.array
  };

  static defaultProps = {
    chat: {},
    chatUsers: []
  };

  render() {
    const { chat, chatUsers } = this.props;

    if (chat.chat_type === 'private') {
      const currentChatUser = chatUsers[0];
      const currentUserImageAvatar = currentChatUser && currentChatUser.images
        && currentChatUser.images.find(image => image.image_type === 'avatar');
      console.log('currentChatUser', currentChatUser)
      return (
        <div className="chat-item-container">
          {currentUserImageAvatar
            ? (
              <div className="avatar-image">
                {currentUserImageAvatar.absolute_href
                  ? <img src={currentUserImageAvatar.absolute_href} />
                  : <img src={currentUserImageAvatar.href} />
                }
              </div>
            )
            : (
              <div className="avatar-image">
                <img src="/img/no_image.png" />
              </div>
            )
          }
          <div className="user-information">
            {currentChatUser
              ? <span>{currentChatUser.name} {currentChatUser.surname}</span>
              : ''
            }
          </div>
        </div>
      );
    }
  }
}

export default class ChatsList extends Component {
  static propTypes = {
    chatsList: PropTypes.array,
    chatsUsers: PropTypes.array
  };

  static defaultProps = {
    chatsList: [],
    chatsUsers: []
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { chatsList, chatsUsers } = this.props;

    // console.log('chatsList', chatsList);
    console.log('chatsUsers', chatsUsers);

    require('./ChatsList.scss');
    return (
      <div className="chats-list-container chats-list">
        {chatsList && chatsList.length ? chatsList.map((chat) => {
          const chatUsersIds = chat.users.map((user) => user.user_id);
          const currentChatUsers = chatsUsers.filter((user) => chatUsersIds.includes(user.id));
          return (
            <ChatItem chat={chat} chatUsers={currentChatUsers} />
          )
        }) : ''}
      </div>
    );
  }

}
