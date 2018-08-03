const USERS_NOT_READ_MESSAGES_LOAD_START = 'boogaloo/usersNotReadMessages/USERS_NOT_READ_MESSAGES_LOAD_START';
const USERS_NOT_READ_MESSAGES_LOAD_SUCCESS = 'boogaloo/usersNotReadMessages/USERS_NOT_READ_MESSAGES_LOAD_SUCCESS';
const USERS_NOT_READ_MESSAGES_LOAD_FAIL = 'boogaloo/usersNotReadMessages/USERS_NOT_READ_MESSAGES_LOAD_FAIL';

const ADD_NEW_NOT_READ_MESSAGE = 'boogaloo/usersNotReadMessages/ADD_NEW_NOT_READ_MESSAGE';

const CLEAR_CHAT_NOT_READ_MESSAGE_START = 'boogaloo/usersNotReadMessages/CLEAR_CHAT_NOT_READ_MESSAGE_START';
const CLEAR_CHAT_NOT_READ_MESSAGE = 'boogaloo/usersNotReadMessages/CLEAR_CHAT_NOT_READ_MESSAGE';
const CLEAR_CHAT_NOT_READ_MESSAGE_FAIL = 'boogaloo/usersNotReadMessages/CLEAR_CHAT_NOT_READ_MESSAGE_FAIL';

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
      chatWithAddedMessage.idsList.push(action.messageId);

      return {
        ...state,
        usersNotReadMessages: [...otherChats, chatWithAddedMessage],
        usersNotReadMessagesTotal: state.usersNotReadMessagesTotal + 1,
        usersOnlineIds: action.usersOnlineIds
      };
    }
    case CLEAR_CHAT_NOT_READ_MESSAGE_START:
      return {
        ...state,
        loading: true
      };
    case CLEAR_CHAT_NOT_READ_MESSAGE: {
      console.log('here');
      const chatWithAddedMessage = state.usersNotReadMessages.find(chat => chat.chatId === action.chatId);
      const otherChats = state.usersNotReadMessages.filter(chat => chat.chatId !== action.chatId);
      const totalNotReadMessages = state.usersNotReadMessagesTotal - chatWithAddedMessage.messagesCount;

      chatWithAddedMessage.messagesCount = 0;
      chatWithAddedMessage.idsList = [];

      return {
        ...state,
        usersNotReadMessages: [...otherChats, chatWithAddedMessage],
        usersNotReadMessagesTotal: totalNotReadMessages,
        usersOnlineIds: action.usersOnlineIds
      };
    }
    case CLEAR_CHAT_NOT_READ_MESSAGE_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

export function loadUserNotReadMessages(token) {
  return {
    types:
      [USERS_NOT_READ_MESSAGES_LOAD_START, USERS_NOT_READ_MESSAGES_LOAD_SUCCESS, USERS_NOT_READ_MESSAGES_LOAD_FAIL],
    promise: client => client.get(`${global.config.apiHost}/users_not_read_messages?token=${token}`)
  };
}

export function addNewNotReadMessage(chatId, messageId) {
  return {
    type: ADD_NEW_NOT_READ_MESSAGE,
    chatId,
    messageId
  };
}

export function clearChatNotReadMessage(token, chatId, messageId) {
  return {
    types: [CLEAR_CHAT_NOT_READ_MESSAGE_START, CLEAR_CHAT_NOT_READ_MESSAGE, CLEAR_CHAT_NOT_READ_MESSAGE_FAIL],
    promise: client => client.put(
      `${global.config.apiHost}/chats_users?token=${token}`,
      {
        data: JSON.stringify({
          chatId,
          messageId
        }),
        headers: [{ name: 'Content-Type', value: 'application/json' }]
      }
    ),
    chatId
  };
}
