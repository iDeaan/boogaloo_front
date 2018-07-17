import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadUserFriendsIds, loadUserFriendsData, searchFriends, loadFullUserFriendsIds
} from "../../redux/modules/friends";
import {
  loadChatsData, loadChatsUsers
} from "../../redux/modules/chats";
import {asyncConnect} from "redux-connect";
import authenticated from "../../helpers/authenticated";
import FriendAvatar from "../../components/Friends/FriendAvatar";
import FriendsSearch from "../../components/Friends/FriendsSearch";
import FriendsSuggestions from "../../components/Friends/FriendsSuggestions";

const SEARCH_DELAY_TIME = 500;

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    // if (getState().chats && getState().chats.chatsList) {
    //   const userToken = getState().auth.registeredUser.userToken.token;
    //   const chatsListIds = getState().chats.chatsList;
    //   console.log('fsdfsd', chatsListIds)
    //   const promises = [];
    //
    //   promises.push(dispatch(loadChatsData(userToken, chatsListIds.join(','))).then((response) => {}));
    //
    //   return Promise.all(promises).then(() => {});
    // }
  }
}])
@authenticated
@connect(
  state => ({
    chats: state.chats,
    token: state.auth.token,
    currentUserId: state.auth.currentUserId,
  })
)
export default class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoginSelected: true,
      // displayedIndexes: [],
      // searchValue: null,
      // times: 0
    }
  }

  static propTypes = {
    // friends: PropTypes.array,
    // friendsSearchIds: PropTypes.array,
    // auth: PropTypes.object,
  };

  static defaultProps = {
    // friends: [],
    // friendsSearchIds: [],
    // auth: {},
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

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
    console.log('chatsList', chatsList)
    dispatch(loadChatsData(token, chatsList.join(','))).then((response) => {
      const resultData = Array.isArray(response.data) ? response.data : [response.data];
      let usersIds = [];

      resultData.forEach((chat) => {
        chat.users.forEach((user) => {
          if (Number(user.user_id) !== Number(currentUserId)) {
            usersIds.push(user.user_id);
          }
        });
      });

      dispatch(loadChatsUsers(token, usersIds));
    });
  }

  render() {
    require('./Chats.scss');
    return [
      <div className="full-content">
        <div className={`chats-container route-container`}>
          <div className="chats-list">
            FIENERERE
          </div>
          <div className="chats-data">
            chats data
          </div>
        </div>
      </div>
    ];
  }
}
