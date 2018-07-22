import React, { Component } from 'react';
import renderRoutes from 'react-router-config/renderRoutes';
import { asyncConnect } from 'redux-connect';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/App/Header';
import Menu from '../../components/App/Menu';
import NotificationsContainer from '../../components/Notifications/NotificationsContainer';
import { checkIfTokenValid, loadCurrentUser } from '../../redux/modules/auth';
import { loadNewFriends } from '../../redux/modules/friends';
import { showNotification } from '../../redux/modules/notifications';
import {
  loadChatsList,
  addNewMessages,
  editChatOrder,
  addNewChatToUser as setNewChatToUser
} from '../../redux/modules/chats';
import {
  addingNewFriend,
  submittingNewFriend,
  rejectingNewFriend,
  connectNewUser,
  newMessage,
  disconnectUser,
  addNewChatToUser
} from '../../helpers/sockets';

@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    const promises = [];

    const cookies = new Cookies();
    const token = cookies.get('token');
    const user = cookies.get('user');

    if (token && user) {
      promises.push(dispatch(checkIfTokenValid(token, user))
        .then(() => {
          dispatch(loadCurrentUser(token, user));
        })
        .catch(() => {
          cookies.remove('token');
          cookies.remove('user');
        }));
    }

    return Promise.all(promises).then(() => {});
  }
}])
@connect(state => ({
  currentUserId: state.auth.currentUserId,
  token: state.auth.token,
  chatsList: state.chats.chatsList,
  selectedChat: state.chats.selectedChat
}))
class App extends Component {
  static propTypes = {
    currentUserId: PropTypes.number,
    token: PropTypes.string,
    chatsList: PropTypes.array,
    selectedChat: PropTypes.number,
    route: PropTypes.object
  };

  static defaultProps = {
    currentUserId: 0,
    token: '',
    chatsList: [],
    selectedChat: 0,
    route: {}
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    addingNewFriend((userData) => {
      this.loadFriendsSuggestions();
      this.showAddingNewFriendNotification(userData);
    });
    submittingNewFriend(userData => this.showSubmittingNewFriendNotification(userData));
    rejectingNewFriend(userData => this.showSubmittingNewFriendNotification(userData, false));
    newMessage(message => this.handleNewMessageAdded(message));
    addNewChatToUser(chatId => this.handleNewChatAdded(chatId));
  }

  componentDidMount() {
    /* eslint-disable */
    if (window) {
      window.addEventListener('beforeunload', () => this.handleBeforeUnload());
    }
    /* eslint-enable */
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.context.store;

    if (nextProps.currentUserId !== this.props.currentUserId) {
      // console.log('nextProps', nextProps);
      // @TODO: SEND INFORMATION ABOUT CHATS LIST
      dispatch(loadChatsList(nextProps.token, nextProps.currentUserId));

      this.loadFriendsSuggestions(nextProps.currentUserId);
    }
    if ((nextProps.currentUserId !== this.props.currentUserId)
      || (nextProps.chatsList.length && nextProps.chatsList.length !== this.props.chatsList.length)) {
      connectNewUser(nextProps);
    }
  }

  showAddingNewFriendNotification(userData) {
    const { dispatch } = this.context.store;

    const notificationDOM = (
      <div className="notification-new-friend-container">
        <div className="title">Заявка в друзі</div>
        {userData && userData.user
          ? (
            <div className="content">
              <span>{userData.user.name} {userData.user.surname}</span> хоче добавити вас в список друзів.
            </div>
          ) : ''
        }
      </div>
    );

    const notification = {
      notificationDOM
    };

    dispatch(showNotification(notification));
  }

  showSubmittingNewFriendNotification(userData, success = true) {
    const { dispatch } = this.context.store;
    console.log('showSubmittingNewFriendNotification');
    const notificationDOM = (
      <div className="notification-new-friend-container">
        <div className="title">Заявка в друзі</div>
        {userData && userData.user
          ? (
            <div className="content">
              <span>{userData.user.name} {userData.user.surname}</span> {success ? 'прийняв' : 'відхилив'} Вашу заяку.
            </div>
          ) : ''
        }
      </div>
    );

    const notification = {
      notificationDOM
    };

    dispatch(showNotification(notification));
  }

  handleNewMessageAdded(message) {
    const { dispatch } = this.context.store;
    const { selectedChat, currentUserId } = this.props;

    if ((message.user_id !== currentUserId) && (selectedChat === message.chat_id)) {
      dispatch(addNewMessages(message));
    }
    dispatch(editChatOrder(message.chat_id, message.createdAt));
  }

  handleNewChatAdded(chatId) {
    const { dispatch } = this.context.store;
    console.log('handleNewChatAdded', chatId);
    dispatch(setNewChatToUser(chatId));
  }

  handleBeforeUnload() {
    const { currentUserId } = this.props;
    disconnectUser(currentUserId);
  }

  loadFriendsSuggestions(userId) {
    const { currentUserId } = this.props;
    const { dispatch } = this.context.store;
    dispatch(loadNewFriends(userId || currentUserId))
      .then(() => {})
      .catch(err => console.log('err', err));
  }

  render() {
    const { route } = this.props;

    require('./App.scss');
    return (
      <div className="app-container">
        <NotificationsContainer />
        <Header />
        <div className="app-content">
          <Menu />
          {renderRoutes(route.routes)}
        </div>
      </div>
    );
  }
}

export default withCookies(App);
