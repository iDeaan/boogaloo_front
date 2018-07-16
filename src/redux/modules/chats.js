const CHAT_LOAD_START = 'boogaloo/auth/CHAT_LOAD_START';
const CHAT_LOAD_SUCCESS = 'boogaloo/auth/CHAT_LOAD_SUCCESS';
const CHAT_LOAD_FAIL = 'boogaloo/auth/CHAT_LOAD_FAIL';

const initialState = {
  chatsList: [],
  loading: false,
  loaded: false,
  error: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHAT_LOAD_START:
      return {
        ...state,
        loading: true
      };
    case CHAT_LOAD_SUCCESS: {
      const chatsList = Array.isArray(action.result.data)
        ? action.result.data : [action.result.data];
      return {
        ...state,
        loading: false,
        loaded: true,
        chatsList: chatsList.map((item) => item.chat_id),
        error: null
      };
    }
    case CHAT_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        chatsList: [],
        error: action.error
      };
    default:
      return state;
  }
}

export function loadChatsList(token, userId) {
  return {
    types: [CHAT_LOAD_START, CHAT_LOAD_SUCCESS, CHAT_LOAD_FAIL],
    promise: client => client.get(`http://localhost:3030/chats?token=${token}&userId=${userId}`)
  };
}

