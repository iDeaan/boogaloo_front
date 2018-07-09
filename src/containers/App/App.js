import React, { Component } from 'react';
import Header from '../../components/App/Header';
import Menu from '../../components/App/Menu';
import renderRoutes from 'react-router-config/renderRoutes'
import { checkIfTokenValid } from "../../redux/modules/auth";
import { loadNewFriends } from "../../redux/modules/friends";
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
    currentUserId: state.auth.currentUserId
  })
)
class App extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      clicked: 0,
      hovered: false
    };

    socket.on('adding_new_friend', (userData) => {
      console.log('adding_new_friend', userData);
      this.loadFriendsSuggestions();
    });
    socket.on('submitting_new_friend', (userData) => {
      console.log('submitting_new_friend', userData);
    });
    socket.on('rejecting_new_friend', (userData) => {
      console.log('rejecting_new_friend', userData);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUserId !== this.props.currentUserId) {
      socket.emit('connect_new_user', nextProps.currentUserId);
      this.loadFriendsSuggestions(nextProps.currentUserId);
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
    return (
      <div className="app-container">
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
