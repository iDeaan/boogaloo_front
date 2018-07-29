const USERS_NOT_READ_MESSAGES_LOAD_START = 'boogaloo/usersNotReadMessages/USERS_NOT_READ_MESSAGES_LOAD_START';
const USERS_NOT_READ_MESSAGES_LOAD_SUCCESS = 'boogaloo/usersNotReadMessages/USERS_NOT_READ_MESSAGES_LOAD_SUCCESS';
const USERS_NOT_READ_MESSAGES_LOAD_FAIL = 'boogaloo/usersNotReadMessages/USERS_NOT_READ_MESSAGES_LOAD_FAIL';

const ADD_NEW_NOT_READ_MESSAGE = 'boogaloo/usersNotReadMessages/ADD_NEW_NOT_READ_MESSAGE';

const initialState = {
  loading: false,
  loaded: false,
  usersNotReadMessages: [],
  usersNotReadMessagesTotal: 0,
  error: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case USERS_NOT_READ_MESSAGES_LOAD_START:
      return {
        ...state,
        loading: true
      };
    case USERS_NOT_READ_MESSAGES_LOAD_SUCCESS: {
      const responseData = action.result.data;

      return {
        ...state,
        loading: false,
        loaded: true,
        usersNotReadMessages: Array.isArray(responseData.chatsData) ? responseData.chatsData : [responseData.chatsData],
        usersNotReadMessagesTotal: responseData.total,
        error: null
      };
    }
    case USERS_NOT_READ_MESSAGES_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        usersNotReadMessages: [],
        usersNotReadMessagesTotal: 0,
        error: action.error
      };
    case ADD_NEW_NOT_READ_MESSAGE: {
      const chatWithAddedMessage = state.usersNotReadMessages.find(chat => chat.chatId === action.chatId);
      const otherChats = state.usersNotReadMessages.filter(chat => chat.chatId !== action.chatId);

      chatWithAddedMessage.messagesCount += 1;

      return {
        ...state,
        usersNotReadMessages: [...otherChats, chatWithAddedMessage],
        usersNotReadMessagesTotal: state.usersNotReadMessagesTotal + 1,
        usersOnlineIds: action.usersOnlineIds
      };
    }
    default:
      return state;
  }
}

export function loadUserNotReadMessages(token) {
  return {
    types: [USERS_NOT_READ_MESSAGES_LOAD_START, USERS_NOT_READ_MESSAGES_LOAD_SUCCESS, USERS_NOT_READ_MESSAGES_LOAD_FAIL],
    promise: client => client.get(`http://localhost:3030/users_not_read_messages?token=${token}`)
  };
}

export function addNewNotReadMessage(chatId) {
  return {
    type: ADD_NEW_NOT_READ_MESSAGE,
    chatId
  };
}
