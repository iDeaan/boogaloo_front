import ApiClient from './ApiClient';

const client = new ApiClient();

export function loadUsers(usersIds, limit = null) {
  return client.get(`${global.config.apiHost}/users?where=(id*IN*${usersIds})&relations=images${limit ? `&limit=${limit}` : ''}`);
}

export function addNewFriend(token, friendId) {
  return client.post(`${global.config.apiHost}/users_friends?token=${token}&userId=${friendId}`);
}

export function deleteFriend(token, friendId) {
  return client.del(`${global.config.apiHost}/users_friends?token=${token}&friendId=${friendId}`);
}

export function submitNewFriend(token, userId) {
  return client.post(`${global.config.apiHost}/users_friends?token=${token}&userId=${userId}&submitFriend=true`);
}

export function rejectNewFriend(token, userId) {
  return client.post(`${global.config.apiHost}/users_friends?token=${token}&userId=${userId}&rejectFriend=true`);
}
