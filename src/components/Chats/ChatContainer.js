import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  loadMessages
} from "../../redux/modules/chats";
import { connect } from "react-redux";
import Button from "../AdditionalComponents/Button";

const CHAT_INPUT_HEIGHT = 180;

@connect(
  state => ({
    selectedChat: state.chats.selectedChat,
    chatsUsers: state.chats.chatsUsers,
    chatsData: state.chats.chatsData,
    messages: state.chats.messages,
    token: state.auth.token,
    userData: state.auth.data,
    currentUserId: state.auth.currentUserId
  })
)
export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChatUsers: [],
      blockHeight: 0
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
    this.setBlockHeight();
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

  setBlockHeight() {
    if (document) {
      const element = document.getElementById('chat-content-container');
      if (element) {
        this.setState({ blockHeight: element.offsetHeight });
      }
    }
  }

  render() {
    const { messages, currentUserId, userData } = this.props;
    const { currentChatUsers, blockHeight } = this.state;

    return (
      <div className="chats-data chats-messages" id="chat-content-container">
        <div className="messages-list" style={{ height: `${blockHeight - CHAT_INPUT_HEIGHT}px` }}>
          {messages && messages.length ? messages.map((message, index) => {
            let isToShowUserInitials = true;
            if (index !== 0) {
              const prevMessage = messages[index - 1];
              if (message.user_id === prevMessage.user_id) {
                isToShowUserInitials = false;
              }
            }
            return (
              <Message
                currentUserId={currentUserId}
                currentChatUsers={currentChatUsers}
                message={message}
                currentUserData={userData && userData[0] ? userData[0] : null}
                isToShowUserInitials={isToShowUserInitials}
              />
            );
          }) : ''}
        </div>
        <div className="text-input-container" style={{ height: `${CHAT_INPUT_HEIGHT}px` }}>
          <textarea className="data-input" />
          <div className="submit-button">
            <Button iconRight="fa-paper-plane" text="Відправити" />
          </div>
        </div>
      </div>
    )
  }
}

class Message extends Component {
  static propTypes = {
    currentUserId: PropTypes.number,
    currentChatUsers: PropTypes.array,
    currentUserData: PropTypes.object,
    isToShowUserInitials: PropTypes.bool,
    message: PropTypes.object
  };

  static defaultProps = {
    currentUserId: 0,
    currentChatUsers: [],
    isToShowUserInitials: true,
    message: {}
  };

  render() {
    const { message, currentUserId, currentChatUsers, currentUserData, isToShowUserInitials } = this.props;

    let userAvatar = null;
    let currentUser = null;

    if (message.user_id !== currentUserId) {
      currentUser = currentChatUsers.find((user) => user.id === message.user_id);
    } else {
      currentUser = currentUserData;
    }

    userAvatar = currentUser && currentUser.images
      && currentUser.images.find(image => image.image_type === 'avatar');

    require('./ChatContainer.scss');

    if (!currentUser) {
      return (
        <div className={`message-item`}>
          Немає ніяких повідомлень
        </div>
      )
    }

    return (
      <div className={`message-item`}>
        <div className="left-part">
          {isToShowUserInitials
            ? (
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
            )
            : ''
          }
        </div>
        <div className="right-part">
          {isToShowUserInitials
            ? <div className="user-information">{currentUser.name} {currentUser.surname}</div>
            : ''
          }
          <div className="message">
            {message.message}
          </div>
        </div>
      </div>
    );
  }
}
