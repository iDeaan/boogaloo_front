import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  loadMessages
} from "../../redux/modules/chats";
import { connect } from "react-redux";

@connect(
  state => ({
    selectedChat: state.chats.selectedChat,
    chatsUsers: state.chats.chatsUsers,
    chatsData: state.chats.chatsData,
    messages: state.chats.messages,
    token: state.auth.token,
    currentUserId: state.auth.currentUserId
  })
)
export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChatUsers: []
    }
  }

  static  propTypes = {
    chat: PropTypes.object,
    messages: PropTypes.array,
    chatsUsers: PropTypes.array
  };

  static defaultProps = {
    chat: {},
    chatUsers: [],
    messages: [],
    chatsUsers: []
  };

  static contextTypes = {
    store: PropTypes.object
  };

  componentDidMount() {
    const { selectedChat, token } = this.props;
    if (selectedChat && token) {
      this.loadMessagesList(this.props);
      this.setCurrentChatUsers(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedChat } = this.props;
    const { selectedChat: nextSelectedChat } = nextProps;

    if (selectedChat !== nextSelectedChat) {
      this.loadMessagesList(nextProps);
      this.setCurrentChatUsers(nextProps);
    }
  }

  loadMessagesList(props) {
    const { dispatch } = this.context.store;
    const { selectedChat, token } = props;

    dispatch(loadMessages(token, selectedChat)).then((response) => {})
  }

  setCurrentChatUsers(props) {
    const { chatsUsers, chatsData, selectedChat } = props;
    const currentChatObject = chatsData.find((chat) => chat.id === selectedChat);

    let usersIds = [];
    if (currentChatObject && currentChatObject.users) {
      currentChatObject.users.forEach((user) => usersIds.push(user.user_id));
    }

    const currentChatUsers = chatsUsers.filter((user) => usersIds.includes(user.id));

    this.setState({ currentChatUsers: currentChatUsers });
  }

  render() {
    const { messages, currentUserId } = this.props;
    const { currentChatUsers } = this.state;

    return (
      <div className="chats-data chats-messages">
        <div className="messages-list">
          {messages && messages.length ? messages.map(message =>
            <Message
              currentUserId={currentUserId}
              currentChatUsers={currentChatUsers}
              message={message}
            />
          ) : ''}
        </div>
        <div className="text-input">
          <input />
        </div>
      </div>
    )
  }
}

class Message extends Component {
  static propTypes = {
    currentUserId: PropTypes.number,
    currentChatUsers: PropTypes.array,
    message: PropTypes.object
  };

  static defaultProps = {
    currentUserId: 0,
    currentChatUsers: [],
    message: {}
  };

  render() {
    const { message, currentUserId, currentChatUsers } = this.props;

    let userAvatar = null;
    let currentUser = null;

    if (message.user_id !== currentUserId) {
      currentUser = currentChatUsers.find((user) => user.id === message.user_id);
      userAvatar = currentUser && currentUser.images
        && currentUser.images.find(image => image.image_type === 'avatar');
    }

    require('./ChatContainer.scss');
    return (
      <div className={`message-item ${message.user_id === currentUserId ? 'own-message' : ''}`}>
        {currentUser
          ? <div className="user-information">{currentUser.name} {currentUser.surname}</div>
          : ''
        }
        <div className="user-avatar">
          {userAvatar
            ? (
              <div className="avatar-image">
                {userAvatar.absolute_href
                  ? <img src={userAvatar.absolute_href} />
                  : <img src={userAvatar.href} />
                }
              </div>
            )
            : (
              <div className="avatar-image">
                <img src="/img/no_image.png" />
              </div>
            )
          }
        </div>
        <div className="message">
          {message.message}
        </div>
      </div>
    );
  }
}
