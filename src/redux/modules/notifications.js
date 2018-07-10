const SHOW_NOTIFICATION = 'boogaloo/notifications/SHOW_NOTIFICATION';
const HIDE_NOTIFICATION = 'boogaloo/notifications/HIDE_NOTIFICATION';

const initialState = {
  message: 'Message',
  displayTime: 5000,
  title: '',
  notificationDOM: '',
  showNewNotification: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        message: action.notification.message || state.message,
        displayTime: action.notification.displayTime || state.displayTime,
        title: action.notification.title || state.title,
        notificationDOM: action.notification.notificationDOM || state.notificationDOM,
        showNewNotification: true
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        showNewNotification: false
      };
    default:
      return state;
  }
}

export function showNotification(notification = {}) {
  return {
    type: SHOW_NOTIFICATION,
    notification
  };
}

export function hideNotification() {
  return {
    type: HIDE_NOTIFICATION
  };
}
