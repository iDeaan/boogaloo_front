import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUserFriendsIds, loadUserFriendsData, searchFriends } from "../../redux/modules/friends";
import {asyncConnect} from "redux-connect";
import authenticated from "../../helpers/authenticated";
import FriendAvatar from "../../components/Friends/FriendAvatar";
import FriendsSearch from "../../components/Friends/FriendsSearch";

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    if (getState().auth && getState().auth.registeredUser && getState().auth.registeredUser.userToken) {
      const userId = getState().auth.registeredUser.userToken.user_id;
      const promises = [];

      promises.push(dispatch(loadUserFriendsIds(userId)).then((response) => {
        const friendsIds = response.data.map(friend => friend.friend_id);
        return dispatch(loadUserFriendsData(friendsIds)).then((response) => console.log('response', response));
      }));

      return Promise.all(promises).then(() => {
      });
    }
  }
}])
@authenticated
@connect(
  state => ({
    friends: state.friends.friends,
    friendsSearchIds: state.friends.searchIds,
    auth: state.auth
  })
)
export default class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginSelected: true
    }
  }

  static propTypes = {
    friends: PropTypes.array,
    friendsSearchIds: PropTypes.array,
    auth: PropTypes.object,
  };

  static defaultProps = {
    friends: [],
    friendsSearchIds: [],
    auth: {},
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  returnSortedFriendsList() {
    const { friends, friendsSearchIds } = this.props;

    if (friendsSearchIds && friendsSearchIds.idsList) {
      const sortedIds = friendsSearchIds.idsList;
      const friendsWithOrders = friends.map(friend =>
        ({ ...friend, ...sortedIds.find(item => item.id === friend.id) }));

      return friendsWithOrders.sort((first, second) => first.order - second.order);
    }

    return friends;
  }

  handleFriendsSearch(event) {
    const { dispatch } = this.context.store;
    const { auth } = this.props;

    const userToken = auth && auth.registeredUser && auth.registeredUser.userToken
      && auth.registeredUser.userToken.token;
    const userId = auth && auth.registeredUser && auth.registeredUser.userToken
      && auth.registeredUser.userToken.user_id;

    if (!event.target.value) {
      dispatch(loadUserFriendsIds(userId)).then((response) => {
        const friendsIds = response.data.map(friend => friend.friend_id);
        return dispatch(loadUserFriendsData(friendsIds)).then((response) => console.log('response', response));
      });
    }

    if (userToken) {
      dispatch(searchFriends(event.target.value, userToken)).then((response) => {
        const idsList = response.data.idsList.map(item => item.id);
        dispatch(loadUserFriendsData(idsList));
      });
    }
  }

  render() {
    const sortedFriendsList = this.returnSortedFriendsList();
    require('./Friends.scss');
    return (
      <div className={`friends-container route-container`}>
        <FriendsSearch onChange={(event) => this.handleFriendsSearch(event)} />
        <div className="friends-list">
          {sortedFriendsList && sortedFriendsList.length ? sortedFriendsList.map(friend =>
            <FriendAvatar friend={friend} />
          ) : ''}
        </div>
      </div>
    );
  }
}
