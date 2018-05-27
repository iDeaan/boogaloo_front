const FRIENDS_IDS_LOAD_START = 'boogaloo/friends/FRIENDS_IDS_LOAD_START';
const FRIENDS_IDS_LOAD_SUCCESS = 'boogaloo/auth/FRIENDS_IDS_LOAD_SUCCESS';
const FRIENDS_IDS_LOAD_FAIL = 'boogaloo/auth/FRIENDS_IDS_LOAD_FAIL';

const FRIENDS_LOAD_START = 'boogaloo/friends/FRIENDS_LOAD_START';
const FRIENDS_LOAD_SUCCESS = 'boogaloo/auth/FRIENDS_LOAD_SUCCESS';
const FRIENDS_LOAD_FAIL = 'boogaloo/auth/FRIENDS_LOAD_FAIL';

const FRIENDS_SEARCH_START = 'boogaloo/friends/FRIENDS_SEARCH_START';
const FRIENDS_SEARCH_SUCCESS = 'boogaloo/auth/FRIENDS_SEARCH_SUCCESS';
const FRIENDS_SEARCH_FAIL = 'boogaloo/auth/FRIENDS_SEARCH_FAIL';

const initialState = {
  currentPage: 0,
  friendsIds: [],
  searchIds: [],
  friends: [],
  loading: false,
  loaded: false,
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
    case FRIENDS_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        laoded: true,
        searchIds: action.result.data,
        error: null
      }
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
    default:
      return state;
  }
}

export function loadUserFriendsIds(userId) {
  return {
    types: [FRIENDS_IDS_LOAD_START, FRIENDS_IDS_LOAD_SUCCESS, FRIENDS_IDS_LOAD_FAIL],
    promise: client => client.get(`http://localhost:3030/users_friends?userId=${userId}`)
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

