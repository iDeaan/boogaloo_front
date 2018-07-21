import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { userPrintingMessageInChatStart, userPrintingMessageInChatStop } from '../../helpers/sockets';
import ChatItem from './ChatItem';

export default class ChatsList extends Component {
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

  constructor(props) {
    super(props);

    this.state = {
      userChatPrinting: []
    };

    userPrintingMessageInChatStart(data => this.userPrintingMessageStart(data));
    userPrintingMessageInChatStop(data => this.userPrintingMessageStop(data));
  }

  userPrintingMessageStart(data) {
    const { currentUserId } = this.props;
    const { userChatPrinting } = this.state;

    const isPrintingCheckedAlredy = userChatPrinting.find(item => (item.chatId === data.chatId));
    if (!isPrintingCheckedAlredy && (data.userId !== currentUserId)) {
      const resultPrintingArray = [...userChatPrinting, data];
      this.setState({ userChatPrinting: resultPrintingArray });
    }
  }

  userPrintingMessageStop(data) {
    const { userChatPrinting } = this.state;

    const resultPrintingArray = userChatPrinting.filter(item => item.chatId !== data.chatId);
    this.setState({ userChatPrinting: resultPrintingArray });
  }

  render() {
    const { chatsList, chatsUsers, selectedChat } = this.props;
    const { userChatPrinting } = this.state;

    require('./ChatsList.scss');
    return (
      <div className="chats-list-container chats-list">
        {chatsList && chatsList.length
          ? (
            chatsList
              .sort((first, second) => moment.utc(second.last_message_time).diff(moment.utc(first.last_message_time)))
              .map((chat) => {
                const chatUsersIds = chat.users.map(user => user.user_id);
                const currentChatUsers = chatsUsers.filter(user => chatUsersIds.includes(user.id));
                const currentChatUserPrinting = userChatPrinting.find(item => item.chatId === chat.id);
                return (
                  <ChatItem
                    selectedChat={selectedChat}
                    chat={chat}
                    chatUsers={currentChatUsers}
                    userTypingMessage={currentChatUserPrinting && currentChatUserPrinting.userInformation
                      ? currentChatUserPrinting.userInformation : ''}
                  />
                );
              })
          )
          : ''}
      </div>
    );
  }
}
