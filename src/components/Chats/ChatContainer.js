import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadMessages,
  loadPreviousMessages,
  deleteMessages,
  deleteMessagesFromStore
} from '../../redux/modules/chats';
import {
  userPrintingMessageInChatStart,
  userPrintingMessageInChatStop,
  deletedMessage
} from '../../helpers/sockets';
import AnimatedDots from '../AdditionalComponents/AnimatedDots';
import MessageInput from './MessageInput';
import Message from './Message';

const CHAT_INPUT_HEIGHT = 180;

@connect(state => ({
  selectedChat: state.chats.selectedChat,
  chatsUsers: state.chats.chatsUsers,
  chatsData: state.chats.chatsData,
  messages: state.chats.messages,
  totalMessagesCount: state.chats.totalMessagesCount,
  token: state.auth.token,
  userData: state.auth.data,
  currentUserId: state.auth.currentUserId,
  usersNotReadMessages: state.usersNotReadMessages.usersNotReadMessages
}))
export default class ChatContainer extends Component {
  static propTypes = {
    selectedChat: PropTypes.number,
    totalMessagesCount: PropTypes.number,
    messages: PropTypes.array,
    token: PropTypes.string,
    userData: PropTypes.object,
    currentUserId: PropTypes.number,
    usersNotReadMessages: PropTypes.array
  };

  static defaultProps = {
    selectedChat: 0,
    totalMessagesCount: 0,
    messages: [],
    token: '',
    userData: {},
    currentUserId: 0,
    usersNotReadMessages: []
  };

  static contextTypes = {
    store: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      currentChatUsers: [],
      blockHeight: 0,
      userPrintingInformation: false,
      isToUseInstantScroll: true,
      currentOffset: 50,
      isToIgnoreScroll: false,
      selectedMessagesList: [],
      isEditingMessage: false
    };

    userPrintingMessageInChatStart(data => this.userPrintingMessageStart(data));
    userPrintingMessageInChatStop(data => this.userPrintingMessageStop(data));
    deletedMessage(data => this.deletedMessageHandle(data));
  }

  componentDidMount() {
    const { selectedChat, token } = this.props;
    if (selectedChat && token) {
      this.loadMessagesList(this.props);
      this.setCurrentChatUsers(this.props);
    }
    if (document) {
      const messagesListContainer = document.getElementById('messages-list-container');
      messagesListContainer.addEventListener('scroll', event => this.handleMessagesContainerScroll(event));
    }
    this.setBlockHeight();
    this.scrollToBottom();
  }

  componentWillReceiveProps(nextProps) {
    const { selectedChat, messages } = this.props;
    const { selectedChat: nextSelectedChat, messages: nextMessages } = nextProps;

    if (selectedChat !== nextSelectedChat) {
      this.setState({ isToUseInstantScroll: true });
      this.loadMessagesList(nextProps);
      this.setCurrentChatUsers(nextProps);
    }
    if (messages && messages.length && nextMessages.length && (messages.length !== nextMessages.length)) {
      this.setState({ isToUseInstantScroll: false });
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleMessagesContainerScroll(event) {
    const { isToIgnoreScroll } = this.state;
    const element = event.target;

    if (element.scrollHeight - element.scrollTop === element.offsetHeight && isToIgnoreScroll) {
      this.setState({ isToIgnoreScroll: false });
    }
  }

  handlePreviousMessagesLoad() {
    const { dispatch } = this.context.store;
    const { selectedChat, token } = this.props;
    const { currentOffset } = this.state;

    const newMessagesToLoadNumber = 20;

    this.state.isToIgnoreScroll = true;
    dispatch(loadPreviousMessages(token, selectedChat, newMessagesToLoadNumber, currentOffset)).then(() => {
      this.setState({ currentOffset: currentOffset + newMessagesToLoadNumber });
    });
  }


  setCurrentChatUsers(props) {
    const { chatsUsers, chatsData, selectedChat } = props;
    const currentChatObject = chatsData.find(chat => chat.id === selectedChat);

    const usersIds = [];
    if (currentChatObject && currentChatObject.users) {
      currentChatObject.users.forEach(user => usersIds.push(user.user_id));
    }

    const currentChatUsers = chatsUsers.filter(user => usersIds.includes(user.id));

    this.setState({ currentChatUsers });
  }

  setBlockHeight() {
    if (document) {
      const element = document.getElementById('chat-content-container');
      if (element) {
        this.setState({ blockHeight: element.offsetHeight });
      }
    }
  }

  loadMessagesList(props) {
    const { dispatch } = this.context.store;
    const { selectedChat, token } = props;

    dispatch(loadMessages(token, selectedChat));
  }

  scrollToBottom() {
    const { isToUseInstantScroll, isToIgnoreScroll } = this.state;
    if (!isToIgnoreScroll) {
      const scrollBehavior = isToUseInstantScroll ? 'instant' : 'smooth';
      this.messagesEnd.scrollIntoView({behavior: scrollBehavior});
    }
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

  deletedMessageHandle(messagesIds) {
    const { dispatch } = this.context.store;
    if (messagesIds && messagesIds.idsList) {
      const messagesIdsList = messagesIds.idsList.split(',').map(Number);
      dispatch(deleteMessagesFromStore(messagesIdsList));
    }
  }

  handleMessageClick(messageId) {
    const { selectedMessagesList, isEditingMessage } = this.state;
    if (selectedMessagesList.includes(messageId)) {
      const newSelectedMessagesList = selectedMessagesList.filter(item => item !== messageId);
      this.setState({
        selectedMessagesList: newSelectedMessagesList,
        isEditingMessage: newSelectedMessagesList.length === 0 ? false : isEditingMessage
      });
    } else {
      const newSelectedMessagesList = [...selectedMessagesList, messageId];
      this.setState({
        selectedMessagesList: newSelectedMessagesList,
        isEditingMessage: newSelectedMessagesList.length > 1 ? false : isEditingMessage
      });
    }
  }

  handleMessageEdit() {
    const { selectedMessagesList } = this.state;

    if (selectedMessagesList.length === 1) {
      this.setState({ isEditingMessage: true });
    }
  }

  handleMessageDelete() {
    const { dispatch } = this.context.store;
    const { token, selectedChat } = this.props;
    const { selectedMessagesList } = this.state;

    dispatch(deleteMessages(token, selectedChat, selectedMessagesList)).then(() => {
      this.setState({ selectedMessagesList: [] });
    });
  }

  handleMessageCancelEditing() {
    this.setState({ isEditingMessage: false });
  }

  render() {
    const {
      messages, currentUserId, userData, token, selectedChat, usersNotReadMessages, totalMessagesCount
    } = this.props;
    const {
      currentChatUsers, blockHeight, userPrintingInformation, currentOffset, selectedMessagesList, isEditingMessage
    } = this.state;

    const editableMessageId = selectedMessagesList && selectedMessagesList.length && selectedMessagesList[0];
    const currentChatNotReadMessages = usersNotReadMessages.find(item => item.chatId === selectedChat);

    const messageListHeight = blockHeight - CHAT_INPUT_HEIGHT - 50;
    require('./ChatContainer.scss');
    return (
      <div className="chats-data chats-messages" id="chat-content-container">
        <div className={`messages-actions-list ${selectedMessagesList.length ? 'displayed' : ''}`}>
          {selectedMessagesList.length === 1
            ? (
              <div
                className="action-button edit-button"
                onClick={() => this.handleMessageEdit()}
              >
                <i className="fa fa-edit" />
                <div className="text">Редагувати</div>
              </div>
            ) : ''
          }
          {selectedMessagesList.length
            ? (
              <div
                className="action-button delete-button"
                onClick={() => this.handleMessageDelete()}
              >
                <i className="fa fa-trash" />
                <div className="text">Видалити</div>
              </div>
            ) : ''
          }
        </div>
        <div
          className="messages-list"
          style={{ height: `${messageListHeight}px` }}
          id="messages-list-container"
        >
          {currentOffset < totalMessagesCount
            ? (
              <div className="load-more-messages-button-container">
                <div
                  className="load-more-messages-button"
                  onClick={() => this.handlePreviousMessagesLoad()}
                >
                  <i className="fa fa-angle-up" />
                  Завантажити старіші повідомлення
                </div>
              </div>
            )
            : ''
          }
          {messages && messages.length
            ? (
              messages
                .sort((first, second) => first.id - second.id)
                .map((message, index) => {
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
                      isNotRead={currentChatNotReadMessages && currentChatNotReadMessages.idsList.includes(message.id)}
                      onClick={(value) => this.handleMessageClick(value)}
                      isSelected={selectedMessagesList.includes(message.id)}
                      isEditable={isEditingMessage && editableMessageId === message.id}
                      onCancelEditing={() => this.handleMessageCancelEditing()}
                    />
                  );
                })
            )
            : ''
          }
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
        <MessageInput
          blockHeight={CHAT_INPUT_HEIGHT}
          token={token}
          chatId={selectedChat}
          usersNotReadMessages={currentChatNotReadMessages}
        />
      </div>
    );
  }
}
