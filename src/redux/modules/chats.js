const config = require('../../config');

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

const MESSAGES_LOAD_START = 'boogaloo/chats/MESSAGES_LOAD_START';
const MESSAGES_LOAD_SUCCESS = 'boogaloo/chats/MESSAGES_LOAD_SUCCESS';
const MESSAGES_LOAD_FAIL = 'boogaloo/chats/MESSAGES_LOAD_FAIL';

const PREVIOUS_MESSAGES_LOAD_START = 'boogaloo/chats/PREVIOUS_MESSAGES_LOAD_START';
const PREVIOUS_MESSAGES_LOAD_SUCCESS = 'boogaloo/chats/PREVIOUS_MESSAGES_LOAD_SUCCESS';
const PREVIOUS_MESSAGES_LOAD_FAIL = 'boogaloo/chats/PREVIOUS_MESSAGES_LOAD_FAIL';

const SEND_MESSAGE_START = 'boogaloo/chats/SEND_MESSAGE_START';
const SEND_MESSAGE_SUCCESS = 'boogaloo/chats/SEND_MESSAGE_SUCCESS';
const SEND_MESSAGE_FAIL = 'boogaloo/chats/SEND_MESSAGE_FAIL';

const ADD_MESSAGES = 'boogaloo/chats/ADD_MESSAGES';

const ADD_CHAT_TO_USER = 'boogaloo/chats/ADD_CHAT_TO_USER';
const EDIT_CHAT = 'boogaloo/chats/EDIT_CHAT';
const EDIT_CHAT_LM = 'boogaloo/chats/EDIT_CHAT_LM';

const CHAT_CREATE_START = 'boogaloo/chats/CHAT_CREATE_START';
const CHAT_CREATE_SUCCESS = 'boogaloo/chats/CHAT_CREATE_SUCCESS';
const CHAT_CREATE_FAIL = 'boogaloo/chats/CHAT_CREATE_FAIL';

const initialState = {
  chatsList: [],
  chatsData: [],
  chatsUsers: [],
  messages: [],
  totalMessagesCount: 0,
  selectedChat: null,
  loading: false,
  loaded: false,
  sendingMessage: false,
  sentMessage: false,
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
        chatsList: chatsList.map(item => item.chat_id),
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
        selectedChat: action.selectedChat,
        messages: state.selectedChat === action.selectedChat ? state.messages : []
      };
    case MESSAGES_LOAD_START:
      return {
        ...state,
        loading: true
      };
    case MESSAGES_LOAD_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        messages: Array.isArray(action.result.data) ? action.result.data : [action.result.data],
        totalMessagesCount: action.result.meta.total,
        error: null
      };
    }
    case MESSAGES_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case PREVIOUS_MESSAGES_LOAD_START:
      return {
        ...state,
        loading: true
      };
    case PREVIOUS_MESSAGES_LOAD_SUCCESS: {
      const newMessages = Array.isArray(action.result.data) ? action.result.data : [action.result.data];
      return {
        ...state,
        loading: false,
        loaded: true,
        messages: [...newMessages, ...state.messages],
        error: null
      };
    }
    case PREVIOUS_MESSAGES_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case ADD_MESSAGES: {
      const addedMessages = Array.isArray(action.newMessages) ? action.newMessages : [action.newMessages];
      return {
        ...state,
        messages: [...state.messages, ...addedMessages]
      };
    }
    case SEND_MESSAGE_START:
      return {
        ...state,
        sendingMessage: true
      };
    case SEND_MESSAGE_SUCCESS: {
      const addedMessages = Array.isArray(action.result.data) ? action.result.data : [action.result.data];
      return {
        ...state,
        sendingMessage: false,
        messages: [...state.messages, ...addedMessages]
      };
    }
    case SEND_MESSAGE_FAIL:
      return {
        ...state,
        sendingMessage: false,
        sentMessage: false,
        error: action.error
      };
    case EDIT_CHAT: {
      const chatWithAddedMessage = state.chatsData.find(chat => chat.id === action.chatId);
      const otherChats = state.chatsData.filter(chat => chat.id !== action.chatId);

      chatWithAddedMessage.last_message_time = action.lastMessageTime;

      return {
        ...state,
        sendingMessage: false,
        sentMessage: false,
        chatsData: [...otherChats, chatWithAddedMessage],
        error: action.error
      };
    }
    case EDIT_CHAT_LM: {
      const chatWithAddedMessage = state.chatsData.find(chat => chat.id === action.chatId);
      const otherChats = state.chatsData.filter(chat => chat.id !== action.chatId);

      chatWithAddedMessage.last_message = action.lastMessage;

      return {
        ...state,
        sendingMessage: false,
        sentMessage: false,
        chatsData: [...otherChats, chatWithAddedMessage],
        error: action.error
      };
    }
    case CHAT_CREATE_START:
      return {
        ...state,
        loading: true
      };
    case CHAT_CREATE_SUCCESS: {
      const newChatId = action.result.data.id;
      return {
        ...state,
        loading: false,
        loaded: true,
        chatsList: [...state.chatsList, newChatId],
        error: null
      };
    }
    case CHAT_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case ADD_CHAT_TO_USER:
      return {
        ...state,
        loading: false,
        loaded: false,
        chatsList: [...state.chatsList, action.newChatId],
        error: action.error
      };
    default:
      return state;
  }
}

export function loadChatsList(token, userId) {
  return {
    types: [CHAT_LOAD_START, CHAT_LOAD_SUCCESS, CHAT_LOAD_FAIL],
    promise: client => client.get(`${config.apiHost}/chats?token=${token}&userId=${userId}`)
  };
}

export function loadChatsData(token, chatsIds) {
  return {
    types: [CHAT_DATA_LOAD_START, CHAT_DATA_LOAD_SUCCESS, CHAT_DATA_LOAD_FAIL],
    promise: client => client.get(`${config.apiHost}/chats?token=${token}&where=(id*IN*${chatsIds})&order=FIELD(id)&relations=users`)
  };
}

export function loadChatsUsers(token, usersIds) {
  return {
    types: [USERS_LOAD_START, USERS_LOAD_SUCCESS, USERS_LOAD_FAIL],
    promise: client => client.get(`${config.apiHost}/users?token=${token}&where=(id*IN*${usersIds})&order=FIELD(id)&relations=images`)
  };
}

export function selectChat(chatId) {
  return {
    type: SELECT_CHAT,
    selectedChat: chatId
  };
}

export function loadMessages(token, chatId, limit = 50, offset = 0) {
  return {
    types: [MESSAGES_LOAD_START, MESSAGES_LOAD_SUCCESS, MESSAGES_LOAD_FAIL],
    promise: client => client.get(`${config.apiHost}/chats_messages?token=${token}&chat_id=${chatId}&limit=${limit}&offset=${offset}`)
  };
}

export function loadPreviousMessages(token, chatId, limit = 20, offset = 0) {
  return {
    types: [PREVIOUS_MESSAGES_LOAD_START, PREVIOUS_MESSAGES_LOAD_SUCCESS, PREVIOUS_MESSAGES_LOAD_FAIL],
    promise: client => client.get(`${config.apiHost}/chats_messages?token=${token}&chat_id=${chatId}&limit=${limit}&offset=${offset}`)
  };
}

export function addNewMessages(messages) {
  return {
    type: ADD_MESSAGES,
    newMessages: messages
  };
}

export function editChatOrder(chatId, messageTime) {
  return {
    type: EDIT_CHAT,
    chatId,
    lastMessageTime: messageTime
  };
}

export function editChatLM(chatId, lm) {
  return {
    type: EDIT_CHAT_LM,
    chatId,
    lastMessage: lm
  };
}

export function sendNewMessage(token, messageData) {
  return {
    types: [SEND_MESSAGE_START, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAIL],
    promise: client => client.post(
      `${config.apiHost}/chats_messages?token=${token}`,
      {
        data: JSON.stringify(messageData),
        headers: [{ name: 'Content-Type', value: 'application/json' }]
      }
    )
  };
}

export function createNewChat(token, userId) {
  return {
    types: [CHAT_CREATE_START, CHAT_CREATE_SUCCESS, CHAT_CREATE_FAIL],
    promise: client => client.post(
      `${config.apiHost}/chats?token=${token}&userId=${userId}`,
      {
        headers: [{ name: 'Content-Type', value: 'application/json' }]
      }
    )
  };
}

export function addNewChatToUser(newChatId) {
  return {
    type: ADD_CHAT_TO_USER,
    newChatId
  };
}
