import io from "socket.io-client";

const socket = io('http://localhost:3030');

export function addingNewFriend(cb) {
  socket.on('adding_new_friend', (userData) => cb(userData));
}

export function submittingNewFriend(cb) {
  socket.on('submitting_new_friend', (userData) => cb(userData));
}

export function rejectingNewFriend(cb) {
  socket.on('rejecting_new_friend', (userData) => cb(userData));
}

export function newMessage(cb) {
  socket.on('new_message', (message) => cb(message));
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
