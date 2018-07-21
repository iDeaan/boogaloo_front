import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '../AdditionalComponents/Button';
import { deleteFriend } from '../../helpers/functions';
import {
  selectChat
} from "../../redux/modules/chats";
import AnimatedDots from '../AdditionalComponents/AnimatedDots';
import { userPrintingMessageInChatStart, userPrintingMessageInChatStop } from "../../helpers/sockets";

class ChatItem extends Component {
  static  propTypes = {
    chat: PropTypes.object,
    chatUsers: PropTypes.array,
    userTypingMessage: PropTypes.string,
    selectedChat: PropTypes.Number
  };

  static defaultProps = {
    chat: {},
    chatUsers: [],
    userTypingMessage: '',
    selectedChat: 0
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
    const { chat, chatUsers, userTypingMessage, selectedChat } = this.props;

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
            {userTypingMessage
              ? (
                <span className="user-typing-message">
                  <i className="fa fa-pencil" />набирає повідомлення <AnimatedDots />
                </span>
              )
              : ''
            }
          </div>
        </div>
      );
    }
  }
}

export default class ChatsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userChatPrinting: []
    };

    userPrintingMessageInChatStart((data) => this.userPrintingMessageStart(data));
    userPrintingMessageInChatStop((data) => this.userPrintingMessageStop(data));
  }

  static propTypes = {
    chatsList: PropTypes.array,
    currentUserId: PropTypes.number,
    selectedChat: PropTypes.number,
    chatsUsers: PropTypes.array
  };

  static defaultProps = {
    chatsList: [],
    currentUserId: [],
    selectedChat: 0,
    chatsUsers: []
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  userPrintingMessageStart(data) {
    const { currentUserId } = this.props;
    const { userChatPrinting } = this.state;

    const isPrintingCheckedAlredy = userChatPrinting.find((item) => (item.chatId === data.chatId));
    if (!isPrintingCheckedAlredy && (data.userId !== currentUserId)) {
      const resultPrintingArray = [...userChatPrinting, data];
      this.setState({ userChatPrinting: resultPrintingArray });
    }
  }

  userPrintingMessageStop(data) {
    const { userChatPrinting } = this.state;

    const resultPrintingArray = userChatPrinting.filter((item) => item.chatId !== data.chatId);
    this.setState({ userChatPrinting: resultPrintingArray });
  }

  render() {
    const { chatsList, chatsUsers, selectedChat } = this.props;
    const { userChatPrinting } = this.state;

    require('./ChatsList.scss');
    return (
      <div className="chats-list-container chats-list">
        {chatsList && chatsList.length
          ? chatsList.sort((first, second) => moment.utc(second.last_message_time).diff(moment.utc(first.last_message_time))).map((chat) => {
              const chatUsersIds = chat.users.map((user) => user.user_id);
              const currentChatUsers = chatsUsers.filter((user) => chatUsersIds.includes(user.id));
              const currentChatUserPrinting = userChatPrinting.find((item) => item.chatId === chat.id);
              return (
                <ChatItem
                  selectedChat={selectedChat}
                  chat={chat} chatUsers={currentChatUsers}
                  userTypingMessage={currentChatUserPrinting && currentChatUserPrinting.userInformation
                    ? currentChatUserPrinting.userInformation : ''}
                />
              )
            })
          : ''}
      </div>
    );
  }

}
