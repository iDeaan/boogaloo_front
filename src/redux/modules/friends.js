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

const FRIEND_DELETE = 'boogaloo/friends/FRIEND_DELETE';
const FRIEND_ADD = 'boogaloo/friends/FRIEND_ADD';

const initialState = {
  currentPage: 0,
  friendsIds: [],
  searchIds: [],
  friends: [],
  loading: false,
  loaded: false,
  fullFriendsIds: [],
  fullFriendsCount: 0,
  error: null
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
    case FULL_FRIENDS_IDS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        laoded: true,
        fullFriendsIds: action.result.data.idsList,
        fullFriendsCount: action.result.data.total,
        error: null
      };
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
      const newFriendsIds = [...state.fullFriendsIds, action.friendId];
      return {
        ...state,
        loading: false,
        laoded: false,
        fullFriendsCount: state.fullFriendsCount + 1,
        fullFriendsIds: newFriendsIds
      };
    }
    default:
      return state;
  }
}

export function loadUserFriendsIds(userId) {
  return {
    types: [FRIENDS_IDS_LOAD_START, FRIENDS_IDS_LOAD_SUCCESS, FRIENDS_IDS_LOAD_FAIL],
    promise: client => client.get(`http://localhost:3030/users_friends?where=(user_id*=*${userId})`)
  };
}

export function loadUserFriendsData(usersIds) {
  return {
    types: [FRIENDS_LOAD_START, FRIENDS_LOAD_SUCCESS, FRIENDS_LOAD_FAIL],
    promise: client => client.get(`http://localhost:3030/users?where=(id*IN*${usersIds})&relations=images&limit=20`)
  };
}

export function searchFriends(input, token) {
  return {
    types: [FRIENDS_SEARCH_START, FRIENDS_SEARCH_SUCCESS, FRIENDS_SEARCH_FAIL],
    promise: client => client.get(`http://localhost:3030/users_friends?search=${input}&token=${token}&limit=20`)
  };
}

export function loadFullUserFriendsIds(token) {
  return {
    types: [FULL_FRIENDS_IDS_LOAD_START, FULL_FRIENDS_IDS_LOAD_SUCCESS, FULL_FRIENDS_IDS_LOAD_FAIL],
    promise: client => client.get(`http://localhost:3030/users_friends?token=${token}&idsOnly=true`)
  };
}

export function deleteFriend(friendId) {
  return {
    type: FRIEND_DELETE,
    friendId
  }
}

export function addFriend(friendId) {
  return {
    type: FRIEND_ADD,
    friendId
  }
}
