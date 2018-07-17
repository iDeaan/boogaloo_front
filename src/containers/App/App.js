import React, { Component } from 'react';
import Header from '../../components/App/Header';
import Menu from '../../components/App/Menu';
import NotificationsContainer from '../../components/Notifications/NotificationsContainer';
import renderRoutes from 'react-router-config/renderRoutes'
import { checkIfTokenValid } from "../../redux/modules/auth";
import { loadNewFriends } from "../../redux/modules/friends";
import { showNotification } from "../../redux/modules/notifications";
import { loadChatsList } from "../../redux/modules/chats";
import {asyncConnect} from "redux-connect";
import { withCookies, Cookies } from 'react-cookie';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import io from "socket.io-client";

const cookies = new Cookies();

const socket = io('http://localhost:3030');



@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    const cookies = new Cookies();
    const token = cookies.get('token');
    const user = cookies.get('user');

    if (token && user) {
      promises.push(dispatch(checkIfTokenValid(token, user))
        .then(() => {})
        .catch(() => {
          cookies.remove('token');
          cookies.remove('user');
        }));
    }

    return Promise.all(promises).then(() => {});
  }
}])
@connect(
  state => ({
    currentUserId: state.auth.currentUserId,
    token: state.auth.token,
    chatsList: state.chats.chatsList
  })
)
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: 0,
      hovered: false
    };

    socket.on('adding_new_friend', (userData) => {
      this.loadFriendsSuggestions();
      this.showAddingNewFriendNotification(userData);
    });
    socket.on('submitting_new_friend', (userData) => {
      this.showSubmittingNewFriendNotification(userData);
    });
    socket.on('rejecting_new_friend', (userData) => {
      this.showSubmittingNewFriendNotification(userData, false);
    });
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

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

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.context.store;

    if (nextProps.currentUserId !== this.props.currentUserId) {
      // console.log('nextProps', nextProps);
      // @TODO: SEND INFORMATION ABOUT CHATS LIST
      dispatch(loadChatsList(nextProps.token, nextProps.currentUserId));

      this.loadFriendsSuggestions(nextProps.currentUserId);
    }
    if (nextProps.chatsList.length && nextProps.chatsList.length !== this.props.chatsList.length) {
      socket.emit('connect_new_user', {
        userId: nextProps.currentUserId,
        chats: nextProps.chatsList
      });
    }
  }

  componentDidMount() {
    if (window) {
      window.addEventListener('beforeunload', () => this.handleBeforeUnload());
    }
  }

  handleBeforeUnload() {
    const { currentUserId } = this.props;
    socket.emit('disconnect_user', currentUserId);
  }

  loadFriendsSuggestions(userId) {
    const { currentUserId } = this.props;
    const { dispatch } = this.context.store;
    dispatch(loadNewFriends(userId || currentUserId))
      .then((response) => {})
      .catch((err) => console.log('err', err));
  }

  handleClick() {
    const { clicked } = this.state;
    this.setState({ clicked: clicked + 1 });
  }

  handleMouseEnter() {
    const { hovered } = this.state;
    this.setState({ hovered: true });
  }

  handleMouseLeave() {
    const { hovered } = this.state;
    this.setState({ hovered: false });
  }

  render() {
    require('./App.scss');
    const { route } = this.props;
    const { dispatch } = this.context.store;

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
