import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { loadUserFriendsIds, loadUserFriendsData, searchFriends, loadFullUserFriendsIds } from '../../redux/modules/friends';
import authenticated from '../../helpers/authenticated';
import FriendAvatar from '../../components/Friends/FriendAvatar';
import FriendsSearch from '../../components/Friends/FriendsSearch';
import FriendsSuggestions from '../../components/Friends/FriendsSuggestions';
import IntervalRender from '../../components/AdditionalComponents/IntervalRender';

const SEARCH_DELAY_TIME = 500;

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    if (getState().auth && getState().auth.registeredUser && getState().auth.registeredUser.userToken) {
      const userId = getState().auth.registeredUser.userToken.user_id;
      const userToken = getState().auth.registeredUser.userToken.token;
      const promises = [];

      promises.push(dispatch(loadUserFriendsIds(userId)).then((response) => {
        const friendsIds = response.data.map(friend => friend.friend_id);
        return dispatch(loadUserFriendsData(friendsIds)).then(() => {});
      }));

      promises.push(dispatch(loadFullUserFriendsIds(userToken)));

      return Promise.all(promises).then(() => {});
    }
    return true;
  }
}])
@authenticated
@connect(state => ({
  friends: state.friends.friends,
  friendsSearchIds: state.friends.searchIds,
  fullFriendsIds: state.friends.fullFriendsIds,
  auth: state.auth
}))
export default class Friends extends Component {
  static propTypes = {
    friends: PropTypes.array,
    friendsSearchIds: PropTypes.array,
    fullFriendsIds: PropTypes.array,
    auth: PropTypes.object
  };

  static defaultProps = {
    friends: [],
    friendsSearchIds: [],
    fullFriendsIds: [],
    auth: {}
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      displayedIndexes: [],
      searchValue: null
    };
  }

  componentDidMount() {
    this.customFunc();
  }

  componentWillReceiveProps(nextProps) {
    const { fullFriendsIds } = this.props;
    const { fullFriendsIds: nextFullFriendsIds } = nextProps;

    if (fullFriendsIds.length !== nextFullFriendsIds.length) {
      this.loadFullFriendsData(nextProps);
    }
  }

  loadFullFriendsData(props) {
    const { dispatch } = this.context.store;
    const { auth } = props;

    const userId = auth && auth.registeredUser && auth.registeredUser.userToken
      && auth.registeredUser.userToken.user_id;

    dispatch(loadUserFriendsIds(userId)).then((response) => {
      const friendsIds = response.data.map(friend => friend.friend_id);
      return dispatch(loadUserFriendsData(friendsIds)).then(() => {});
    });
  }

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

  customFunc() {
    this.times = 0;
    this.interval = setInterval(() => {
      if (this.times === 20) {
        clearInterval(this.interval);
      } else if (!this.state.displayedIndexes.includes(this.times)) {
        const currentItems = this.state.displayedIndexes;
        currentItems.push(this.times);
        this.setState({ displayedIndexes: currentItems });
        this.times += 1;
      }
    }, 200);
  }

  handleFriendsSearch(event) {
    this.event = event;
    this.setState({ searchValue: event.target.value });

    clearInterval(this.timeout);
    this.timeout = setTimeout(() => {
      const { dispatch } = this.context.store;
      const { auth } = this.props;

      const userToken = auth && auth.registeredUser && auth.registeredUser.userToken
        && auth.registeredUser.userToken.token;
      const userId = auth && auth.registeredUser && auth.registeredUser.userToken
        && auth.registeredUser.userToken.user_id;

      if (!this.state.searchValue) {
        dispatch(loadUserFriendsIds(userId)).then((response) => {
          const friendsIds = response.data.map(friend => friend.friend_id);
          return dispatch(loadUserFriendsData(friendsIds)).then(() => {
            this.setState({ displayedIndexes: [] }, this.customFunc());
          });
        });
      }

      if (userToken) {
        dispatch(searchFriends(this.state.searchValue, userToken)).then((response) => {
          const idsList = response.data.idsList.map(item => item.id);
          dispatch(loadUserFriendsData(idsList)).then(() => {
            this.setState({ displayedIndexes: [] }, this.customFunc());
          });
        });
      }
    }, SEARCH_DELAY_TIME, event);
  }

  renderFriendsList() {
    const { auth } = this.props;
    const sortedFriendsList = this.returnSortedFriendsList();
    // return (
    //   sortedFriendsList && sortedFriendsList.length ? sortedFriendsList.map((friend, index) =>
    //     (<FriendAvatar
    //       friend={friend}
    //       token={auth.token}
    //       displayed={this.state.displayedIndexes.includes(index) || this.state.displayedIndexes[0] === 'all'}
    //     />)) : ''
    // );
    return (
      sortedFriendsList && sortedFriendsList.length ? (
        <IntervalRender
          renderInterval={1000}
          containerClassName="friends-list"
          childrenClassName="friend-avatar-container"
          transitionStyle={{
            initial: {
              opacity: 0,
              transition: '1s'
            },
            transitioned: {
              opacity: 1
            }
          }}
        >
          {sortedFriendsList.map(friend =>
            <FriendAvatar
              friend={friend}
              token={auth.token}
              displayed={true}
            />
          )}
        </IntervalRender>
      ) : ''
    );
  }

  render() {
    require('./Friends.scss');
    return [
      <div className="content">
        <div className="friends-container route-container">
          <FriendsSearch onChange={event => this.handleFriendsSearch(event)} />
          <React.Fragment>
            {this.renderFriendsList()}
          </React.Fragment>
        </div>
      </div>,
      <div className="right-content">
        <FriendsSuggestions />
      </div>
    ];
  }
}
