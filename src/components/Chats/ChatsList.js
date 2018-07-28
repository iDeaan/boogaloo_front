import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  userPrintingMessageInChatStart,
  userPrintingMessageInChatStop,
  newUserOnline,
  newUserOffline
} from '../../helpers/sockets';
import { setUsersOnlineIds } from '../../redux/modules/usersOnline';
import ChatItem from './ChatItem';

@connect(state => ({
  usersOnlineIds: state.usersOnline.usersOnlineIds
}))
export default class ChatsList extends Component {
  static propTypes = {
    chatsList: PropTypes.array,
    usersOnlineIds: PropTypes.array,
    currentUserId: PropTypes.number,
    selectedChat: PropTypes.number,
    chatsUsers: PropTypes.array
  };

  static defaultProps = {
    chatsList: [],
    usersOnlineIds: [],
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
    newUserOnline(userId => this.newUserConnecting(userId));
    newUserOffline(userId => this.newUserDisconnecting(userId));
  }

  newUserConnecting(userId) {
    const { dispatch } = this.context.store;
    const { usersOnlineIds } = this.props;

    dispatch(setUsersOnlineIds([...usersOnlineIds, userId]));
  }

  newUserDisconnecting(userId) {
    const { dispatch } = this.context.store;
    const { usersOnlineIds } = this.props;

    const newUsersIdsList = usersOnlineIds.filter(item => item !== userId);

    dispatch(setUsersOnlineIds(newUsersIdsList));
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
    const {
      chatsList, chatsUsers, selectedChat, usersOnlineIds
    } = this.props;
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

                let isOnline = false;
                if (chat.chat_type === 'private' && currentChatUsers && currentChatUsers[0]) {
                  isOnline = usersOnlineIds.includes(currentChatUsers[0].id);
                }
                return (
                  <ChatItem
                    selectedChat={selectedChat}
                    chat={chat}
                    chatUsers={currentChatUsers}
                    userTypingMessage={currentChatUserPrinting && currentChatUserPrinting.userInformation
                      ? currentChatUserPrinting.userInformation : ''}
                    isOnline={isOnline}
                  />
                );
              })
          )
          : ''}
      </div>
    );
  }
}
