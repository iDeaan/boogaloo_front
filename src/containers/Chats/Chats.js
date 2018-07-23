import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadChatsData, loadChatsUsers, selectChat } from '../../redux/modules/chats';
import { loadUsersOnline } from '../../redux/modules/usersOnline';
import authenticated from '../../helpers/authenticated';
import ChatsList from '../../components/Chats/ChatsList';
import ChatContainer from '../../components/Chats/ChatContainer';

@authenticated
@connect(state => ({
  chats: state.chats,
  token: state.auth.token,
  currentUserId: state.auth.currentUserId
}))
export default class Chats extends Component {
  static propTypes = {
    chats: PropTypes.object,
    currentUserId: PropTypes.number
  };

  static defaultProps = {
    chats: [],
    currentUserId: 0
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.loadChatsDataAndUsers(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { chats } = this.props;
    const { chats: nextChats } = nextProps;

    const { chatsList } = chats;
    const { chatsList: nextChatsList } = nextChats;

    if (chatsList.length !== nextChatsList.length) {
      this.loadChatsDataAndUsers(nextProps);
    }
  }

  loadChatsDataAndUsers(props) {
    const { dispatch } = this.context.store;
    const { chats, token, currentUserId } = props;

    const { chatsList } = chats;
    dispatch(loadChatsData(token, chatsList.join(','))).then((response) => {
      const resultData = Array.isArray(response.data) ? response.data : [response.data];
      const usersIds = [];

      resultData.forEach((chat) => {
        chat.users.forEach((user) => {
          if (Number(user.user_id) !== Number(currentUserId)) {
            usersIds.push(user.user_id);
          }
        });
      });

      dispatch(loadChatsUsers(token, usersIds)).then(() => {
        dispatch(selectChat(chatsList[0]));
      });
      dispatch(loadUsersOnline(token, usersIds));
    });
  }

  render() {
    const { chats, currentUserId } = this.props;
    const { chatsData, chatsUsers, selectedChat } = chats;

    require('./Chats.scss');
    return [
      <div className="full-content">
        <div className="chats-container route-container">
          <ChatsList
            chatsList={chatsData}
            chatsUsers={chatsUsers}
            currentUserId={currentUserId}
            selectedChat={selectedChat}
          />
          <ChatContainer />
        </div>
      </div>
    ];
  }
}
