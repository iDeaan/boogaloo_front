const FRIENDS_IDS_LOAD_START = 'boogaloo/friends/FRIENDS_IDS_LOAD_START';
const FRIENDS_IDS_LOAD_SUCCESS = 'boogaloo/auth/FRIENDS_IDS_LOAD_SUCCESS';
const FRIENDS_IDS_LOAD_FAIL = 'boogaloo/auth/FRIENDS_IDS_LOAD_FAIL';

const FRIENDS_LOAD_START = 'boogaloo/friends/FRIENDS_LOAD_START';
const FRIENDS_LOAD_SUCCESS = 'boogaloo/auth/FRIENDS_LOAD_SUCCESS';
const FRIENDS_LOAD_FAIL = 'boogaloo/auth/FRIENDS_LOAD_FAIL';

const initialState = {
  currentPage: 0,
  friendsIds: [],
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
    default:
      return state;
  }
}

export function loadUserFriendsIds(userId) {
  return {
    types: [FRIENDS_LOAD_START, FRIENDS_LOAD_SUCCESS, FRIENDS_LOAD_FAIL],
    promise: client => client.get(`http://localhost:3030/users_friends?userId=${userId}`)
  };
}

export function checkIfTokenValid(token, userId) {
  return {
    types: [REGISTER_START, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: client => client.get(`http://localhost:3030/sign?token=${token}&userId=${userId}`)
  };
}
