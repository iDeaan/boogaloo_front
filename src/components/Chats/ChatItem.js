import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { selectChat } from '../../redux/modules/chats';
import AnimatedDots from '../AdditionalComponents/AnimatedDots';

export default class ChatItem extends Component {
  static propTypes = {
    chat: PropTypes.object,
    chatUsers: PropTypes.array,
    userTypingMessage: PropTypes.string,
    isOnline: PropTypes.string,
    selectedChat: PropTypes.number,
    notReadMessagesCount: PropTypes.number
  };

  static defaultProps = {
    chat: {},
    chatUsers: [],
    userTypingMessage: '',
    isOnline: false,
    selectedChat: 0,
    notReadMessagesCount: 0
  };

  static contextTypes = {
    store: PropTypes.object
  };

  handleChatClick() {
    const { dispatch } = this.context.store;
    const { chat } = this.props;

    dispatch(selectChat(chat.id));
  }

  render() {
    const {
      chat, chatUsers, userTypingMessage, selectedChat, isOnline, notReadMessagesCount
    } = this.props;

    if (chat.chat_type === 'private') {
      const currentChatUser = chatUsers[0];
      const currentUserImageAvatar = currentChatUser && currentChatUser.images
        && currentChatUser.images.find(image => image.image_type === 'avatar');
      return (
        <div
          className={`chat-item-container ${selectedChat === chat.id ? 'chat-selected' : ''}`}
          onClick={() => this.handleChatClick()}
        >
          {currentUserImageAvatar
            ? (
              <div className="avatar-image">
                {currentUserImageAvatar.absolute_href
                  ? <img src={currentUserImageAvatar.absolute_href} alt="avatar" />
                  : <img src={currentUserImageAvatar.href} alt="avatar" />
                }
              </div>
            )
            : (
              <div className="avatar-image">
                <img src="/img/no_image.png" alt="avatar" />
              </div>
            )
          }
          <div className="user-information">
            {currentChatUser
              ? (
                <span>
                  {currentChatUser.name} {currentChatUser.surname}
                  {isOnline ? <span className="online">⏺</span> : ''}
                  {notReadMessagesCount ? <span className="not-read-messages-count">{notReadMessagesCount}</span> : ''}
                </span>
              )
              : ''
            }
            {userTypingMessage
              ? (
                <span className="user-typing-message">
                  <i className="fa fa-pencil" />набирає повідомлення <AnimatedDots />
                </span>
              )
              : <div className="message">{chat.last_message}</div>
            }
          </div>
        </div>
      );
    }
    return (<div />);
  }
}
