const CHAT_LOAD_START = 'boogaloo/chats/CHAT_LOAD_START';
const CHAT_LOAD_SUCCESS = 'boogaloo/chats/CHAT_LOAD_SUCCESS';
const CHAT_LOAD_FAIL = 'boogaloo/chats/CHAT_LOAD_FAIL';

const CHAT_DATA_LOAD_START = 'boogaloo/chats/CHAT_DATA_LOAD_START';
const CHAT_DATA_LOAD_SUCCESS = 'boogaloo/chats/CHAT_DATA_LOAD_SUCCESS';
const CHAT_DATA_LOAD_FAIL = 'boogaloo/chats/CHAT_DATA_LOAD_FAIL';

const USERS_LOAD_START = 'boogaloo/chats/USERS_LOAD_START';
const USERS_LOAD_SUCCESS = 'boogaloo/chats/USERS_LOAD_SUCCESS';
const USERS_LOAD_FAIL = 'boogaloo/chats/USERS_LOAD_FAIL';

const SELECT_CHAT = 'boogaloo/chats/SELECT_CHAT';

const initialState = {
  chatsList: [],
  chatsData: [],
  chatsUsers: [],
  selectedChat: null,
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
    case CHAT_DATA_LOAD_START:
      return {
        ...state,
        loading: true
      };
    case CHAT_DATA_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        chatsData: Array.isArray(action.result.data) ? action.result.data : [action.result.data],
        error: null
      };
    case CHAT_DATA_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        chatsData: [],
        error: action.error
      };
    case USERS_LOAD_START:
      return {
        ...state,
        loading: true
      };
    case USERS_LOAD_SUCCESS: {
      console.log('action.result.data', action.result.data);
      return {
        ...state,
        loading: false,
        loaded: true,
        chatsUsers: Array.isArray(action.result.data) ? action.result.data : [action.result.data],
        error: null
      };
    }
    case USERS_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        chatsUsers: [],
        error: action.error
      };
    case SELECT_CHAT:
      return {
        ...state,
        selectedChat: action.selectedChat
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

export function loadChatsData(token, chatsIds) {
  return {
    types: [CHAT_DATA_LOAD_START, CHAT_DATA_LOAD_SUCCESS, CHAT_DATA_LOAD_FAIL],
    promise: client => client.get(`http://localhost:3030/chats?token=${token}&where=(id*IN*${chatsIds})&order=FIELD(id)&relations=users`)
  };
}

export function loadChatsUsers(token, usersIds) {
  return {
    types: [USERS_LOAD_START, USERS_LOAD_SUCCESS, USERS_LOAD_FAIL],
    promise: client => client.get(`http://localhost:3030/users?token=${token}&where=(id*IN*${usersIds})&order=FIELD(id)&relations=images`)
  };
}

export function selectChat(chatId) {
  return {
    type: SELECT_CHAT,
    selectedChat: chatId
  };
}
