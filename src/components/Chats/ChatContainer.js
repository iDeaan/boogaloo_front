import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  loadMessages
} from "../../redux/modules/chats";
import { connect } from "react-redux";
import {
  userPrintingMessageInChatStart,
  userPrintingMessageInChatStop
} from '../../helpers/sockets';
import AnimatedDots from '../AdditionalComponents/AnimatedDots';
import Button from "../AdditionalComponents/Button";
import MessageInput from "./MessageInput";

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
      blockHeight: 0,
      userPrintingInformation: false
    }

    userPrintingMessageInChatStart((data) => this.userPrintingMessageStart(data));
    userPrintingMessageInChatStop((data) => this.userPrintingMessageStop(data));
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
    this.scrollToBottom();
  }

  componentWillReceiveProps(nextProps) {
    const { selectedChat } = this.props;
    const { selectedChat: nextSelectedChat } = nextProps;

    if (selectedChat !== nextSelectedChat) {
      this.loadMessagesList(nextProps);
      this.setCurrentChatUsers(nextProps);
    }
  }

  componentDidUpdate(){
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  userPrintingMessageStart(data) {
    const { selectedChat } = this.props;

    if (selectedChat === data.chatId) {
      this.setState({ userPrintingInformation: data.userInformation });
    }
  }

  userPrintingMessageStop(data) {
    const { selectedChat } = this.props;

    if (selectedChat === data.chatId) {
      this.setState({ userPrintingInformation: null });
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
    const { messages, currentUserId, userData, token, selectedChat } = this.props;
    const { currentChatUsers, blockHeight, userPrintingInformation } = this.state;
    const messageListHeight = blockHeight - CHAT_INPUT_HEIGHT - 50;
    return (
      <div className="chats-data chats-messages" id="chat-content-container">
        <div
          className="messages-list" style={{ height: `${messageListHeight}px` }}
          id="messages-list-container"
        >
          {messages && messages.length ? messages.sort((first, second) => first.id - second.id).map((message, index) => {
            let isToShowUserInitials = true;
            if (index !== 0) {
              const prevMessage = messages[index - 1];
              if (prevMessage && message && message.user_id === prevMessage.user_id) {
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
          <div id="messages-list" ref={(el) => { this.messagesEnd = el; }} />
        </div>
        <div className="user-typing-message-container">
          {userPrintingInformation
            ? (
              <span className="user-typing-message">
                <i className="fa fa-pencil" /> {userPrintingInformation} набирає повідомлення <AnimatedDots />
              </span>
            )
            : ''
          }
        </div>
        <MessageInput blockHeight={CHAT_INPUT_HEIGHT} token={token} chatId={selectedChat} />
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
