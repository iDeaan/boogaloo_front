import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadChatsData, loadChatsUsers, selectChat
} from "../../redux/modules/chats";
import {asyncConnect} from "redux-connect";
import authenticated from "../../helpers/authenticated";
import ChatsList from "../../components/Chats/ChatsList";
import ChatContainer from "../../components/Chats/ChatContainer";

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
      let usersIds = [];

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
    });
  }

  render() {
    const { chats, currentUserId } = this.props;
    const { chatsData, chatsUsers } = chats;

    require('./Chats.scss');
    return [
      <div className="full-content">
        <div className={`chats-container route-container`}>
          <ChatsList chatsList={chatsData} chatsUsers={chatsUsers} currentUserId={currentUserId} />
          <ChatContainer />
        </div>
      </div>
    ];
  }
}
