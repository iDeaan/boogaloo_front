const USERS_ONLINE_LOAD_START = 'boogaloo/usersOnline/USERS_ONLINE_LOAD_START';
const USERS_ONLINE_LOAD_SUCCESS = 'boogaloo/usersOnline/USERS_ONLINE_LOAD_SUCCESS';
const USERS_ONLINE_LOAD_FAIL = 'boogaloo/usersOnline/USERS_ONLINE_LOAD_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  usersOnlineIds: [],
  error: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case USERS_ONLINE_LOAD_START:
      return {
        ...state,
        loading: true
      };
    case USERS_ONLINE_LOAD_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        usersOnlineIds: Array.isArray(action.result.data) ? action.result.data : [action.result.data],
        error: null
      };
    }
    case USERS_ONLINE_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        usersOnlineIds: [],
        error: action.error
      };
    default:
      return state;
  }
}

export function loadUsersOnline(token, usersIds) {
  return {
    types: [USERS_ONLINE_LOAD_START, USERS_ONLINE_LOAD_SUCCESS, USERS_ONLINE_LOAD_FAIL],
    promise: client => client.get(`http://localhost:3030/users_online?token=${token}&userId=${usersIds}`)
  };
}
