const config = require('../../config');

const FRIENDS_IDS_LOAD_START = 'boogaloo/friends/FRIENDS_IDS_LOAD_START';
const FRIENDS_IDS_LOAD_SUCCESS = 'boogaloo/friends/FRIENDS_IDS_LOAD_SUCCESS';
const FRIENDS_IDS_LOAD_FAIL = 'boogaloo/friends/FRIENDS_IDS_LOAD_FAIL';

const FRIENDS_LOAD_START = 'boogaloo/friends/FRIENDS_LOAD_START';
const FRIENDS_LOAD_SUCCESS = 'boogaloo/friends/FRIENDS_LOAD_SUCCESS';
const FRIENDS_LOAD_FAIL = 'boogaloo/friends/FRIENDS_LOAD_FAIL';

const FRIENDS_SEARCH_START = 'boogaloo/friends/FRIENDS_SEARCH_START';
const FRIENDS_SEARCH_SUCCESS = 'boogaloo/friends/FRIENDS_SEARCH_SUCCESS';
const FRIENDS_SEARCH_FAIL = 'boogaloo/friends/FRIENDS_SEARCH_FAIL';

const FULL_FRIENDS_IDS_LOAD_START = 'boogaloo/friends/FULL_FRIENDS_IDS_LOAD_START';
const FULL_FRIENDS_IDS_LOAD_SUCCESS = 'boogaloo/friends/FULL_FRIENDS_IDS_LOAD_SUCCESS';
const FULL_FRIENDS_IDS_LOAD_FAIL = 'boogaloo/friends/FULL_FRIENDS_IDS_LOAD_FAIL';

const NEW_FRIENDS_LOAD_START = 'boogaloo/friends/NEW_FRIENDS_LOAD_START';
const NEW_FRIENDS_LOAD_SUCCESS = 'boogaloo/friends/NEW_FRIENDS_LOAD_SUCCESS';
const NEW_FRIENDS_LOAD_FAIL = 'boogaloo/friends/NEW_FRIENDS_LOAD_FAIL';

const FRIEND_SUBSCRIPTION_DELETE_START = 'boogaloo/friends/FRIEND_SUBSCRIPTION_DELETE_START';
const FRIEND_SUBSCRIPTION_DELETE_SUCCESS = 'boogaloo/friends/FRIEND_SUBSCRIPTION_DELETE_SUCCESS';
const FRIEND_SUBSCRIPTION_DELETE_FAIL = 'boogaloo/friends/FRIEND_SUBSCRIPTION_DELETE_FAIL';

const FRIEND_DELETE = 'boogaloo/friends/FRIEND_DELETE';
const FRIEND_ADD = 'boogaloo/friends/FRIEND_ADD';
const SUBMIT_NEW_FRIEND_BY_ID = 'boogaloo/friends/SUBMIT_NEW_FRIEND_BY_ID';

const initialState = {
  currentPage: 0,
  friendsIds: [],
  searchIds: [],
  friends: [],
  loading: false,
  loaded: false,
  fullFriendsIds: [],
  fullFriendsCount: 0,
  fullNotAcceptedFriendsIds: [],
  error: null,
  friendSuggestionIds: [],
  friendSuggestCount: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FRIENDS_LOAD_START:
      return {
        ...state,
        laoding: true,
        loaded: false
      };
    case FRIENDS_SEARCH_START:
      return {
        ...state,
        laoding: true,
        loaded: false
      };
    case FRIENDS_IDS_LOAD_START:
      return {
        ...state,
        laoding: true,
        loaded: false
      };
    case FULL_FRIENDS_IDS_LOAD_START:
      return {
        ...state,
        laoding: true,
        loaded: false
      };
    case FRIENDS_IDS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        laoded: true,
        friendsIds: action.result.data,
        error: null
      };
    case FRIENDS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        laoded: true,
        friends: action.result.data,
        error: null
      };
    case FULL_FRIENDS_IDS_LOAD_SUCCESS: {
      const friends = action.result.data.idsList.filter(item => Number(item.accepted) === 1);
      const notAcceptedFriends = action.result.data.idsList.filter(item => Number(item.accepted) === 0);
      return {
        ...state,
        loading: false,
        laoded: true,
        fullFriendsIds: friends.length ? friends.map(friend => friend.userId) : [],
        fullNotAcceptedFriendsIds: notAcceptedFriends.length ? notAcceptedFriends.map(friend => friend.userId) : [],
        fullFriendsCount: friends.length,
        error: null
      };
    }
    case FRIENDS_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        laoded: true,
        searchIds: action.result.data,
        error: null
      };
    case FRIENDS_IDS_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        laoded: false,
        error: action.error
      };
    case FRIENDS_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        laoded: false,
        error: action.error
      };
    case FRIENDS_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        laoded: false,
        error: action.error,
        searchIds: []
      };
    case FULL_FRIENDS_IDS_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        laoded: false,
        fullFriendsIds: [],
        fullFriendsCount: 0,
        error: action.error
      };
    case FRIEND_DELETE: {
      const newFriendsObjects = Array.isArray(state.friends) && state.friends.length
        ? state.friends.filter(friend => friend.id !== action.friendId)
        : state.friends;
      const newFriendsIds = state.fullFriendsIds.filter(item => item !== action.friendId);
      return {
        ...state,
        loading: false,
        laoded: false,
        fullFriendsCount: state.fullFriendsCount - 1,
        friends: newFriendsObjects,
        fullFriendsIds: newFriendsIds
      };
    }
    case FRIEND_ADD: {
      const newFriendsIds = [...state.fullNotAcceptedFriendsIds, action.friendId];
      return {
        ...state,
        loading: false,
        laoded: false,
        fullFriendsCount: state.fullFriendsCount + 1,
        fullNotAcceptedFriendsIds: newFriendsIds
      };
    }
    case NEW_FRIENDS_LOAD_START:
      return {
        ...state,
        laoding: true,
        loaded: false
      };
    case NEW_FRIENDS_LOAD_SUCCESS:
      return {
        ...state,
        friendSuggestionIds: action.result.data,
        friendSuggestCount: Array.isArray(action.result.data) ? action.result.data.length : 0,
        loaded: true
      };
    case NEW_FRIENDS_LOAD_FAIL:
      return {
        ...state,
        laoding: true,
        loaded: false,
        friendSuggestionIds: [],
        error: action.error
      };
    case SUBMIT_NEW_FRIEND_BY_ID:
      return {
        ...state,
        fullFriendsIds: [...state.fullFriendsIds, action.friendId],
        friendSuggestionIds: state.friendSuggestionIds.filter(item => item.friend_id !== action.friendId),
        friendSuggestCount: state.friendSuggestCount - 1
      };
    case FRIEND_SUBSCRIPTION_DELETE_START:
      return {
        ...state
      };
    case FRIEND_SUBSCRIPTION_DELETE_SUCCESS:
      return {
        ...state,
        fullNotAcceptedFriendsIds: state.fullNotAcceptedFriendsIds.filter(item => item !== action.friendId),
        error: action.error
      };
    case FRIEND_SUBSCRIPTION_DELETE_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}

export function loadUserFriendsIds(userId) {
  return {
    types: [FRIENDS_IDS_LOAD_START, FRIENDS_IDS_LOAD_SUCCESS, FRIENDS_IDS_LOAD_FAIL],
    promise: client => client.get(`${config.apiHost}/users_friends?where=((user_id*=*${userId}),(accepted*=*1))`)
  };
}

export function loadUserFriendsData(usersIds) {
  return {
    types: [FRIENDS_LOAD_START, FRIENDS_LOAD_SUCCESS, FRIENDS_LOAD_FAIL],
    promise: client => client.get(`${config.apiHost}/users?where=(id*IN*${usersIds})&relations=images&limit=20`)
  };
}

export function searchFriends(input, token) {
  return {
    types: [FRIENDS_SEARCH_START, FRIENDS_SEARCH_SUCCESS, FRIENDS_SEARCH_FAIL],
    promise: client => client.get(`${config.apiHost}/users_friends?search=${input}&token=${token}&limit=20`)
  };
}

export function loadFullUserFriendsIds(token) {
  return {
    types: [FULL_FRIENDS_IDS_LOAD_START, FULL_FRIENDS_IDS_LOAD_SUCCESS, FULL_FRIENDS_IDS_LOAD_FAIL],
    promise: client => client.get(`${config.apiHost}/users_friends?token=${token}&idsOnly=true`)
  };
}

export function loadNewFriends(userId) {
  return {
    types: [NEW_FRIENDS_LOAD_START, NEW_FRIENDS_LOAD_SUCCESS, NEW_FRIENDS_LOAD_FAIL],
    promise: client => client.get(`${config.apiHost}/users_friends?where=((user_id*=*${userId}),(accepted*=*2))`)
  };
}

export function deleteFriend(friendId) {
  return {
    type: FRIEND_DELETE,
    friendId
  };
}

export function addFriend(friendId) {
  return {
    type: FRIEND_ADD,
    friendId
  };
}

export function submitNewFriendById(friendId) {
  return {
    type: SUBMIT_NEW_FRIEND_BY_ID,
    friendId
  };
}

export function deleteFiendFromSubscription(token, friendId) {
  return {
    types: [FRIEND_SUBSCRIPTION_DELETE_START, FRIEND_SUBSCRIPTION_DELETE_SUCCESS, FRIEND_SUBSCRIPTION_DELETE_FAIL],
    promise: client => client.del(`${config.apiHost}/users_friends?token=${token}&friendId=${friendId}`),
    friendId
  };
}
