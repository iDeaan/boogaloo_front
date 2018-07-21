import io from 'socket.io-client';

const socket = io('http://localhost:3030');

export function addingNewFriend(cb) {
  socket.on('adding_new_friend', userData => cb(userData));
}

export function submittingNewFriend(cb) {
  socket.on('submitting_new_friend', userData => cb(userData));
}

export function rejectingNewFriend(cb) {
  socket.on('rejecting_new_friend', userData => cb(userData));
}

export function userPrintingMessageInChatStart(cb) {
  socket.on('user_printing_message_in_chat_start', userInformation => cb(userInformation));
}

export function userPrintingMessageInChatStop(cb) {
  socket.on('user_printing_message_in_chat_stop', userInformation => cb(userInformation));
}

export function newMessage(cb) {
  socket.on('new_message', message => cb(message));
}

export function connectNewUser(nextProps) {
  socket.emit('connect_new_user', {
    userId: nextProps.currentUserId,
    chats: nextProps.chatsList
  });
}

export function disconnectUser(currentUserId) {
  socket.emit('disconnect_user', currentUserId);
}

export function userPrintingMessageStart(chatId, userInformation, userId) {
  socket.emit('user_printing_message_start', {
    chatId,
    userInformation,
    userId
  });
}

export function userPrintingMessageStop(chatId, userInformation, userId) {
  socket.emit('user_printing_message_stop', {
    chatId,
    userInformation,
    userId
  });
}
