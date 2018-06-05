import ApiClient from './ApiClient';

const client = new ApiClient();

export function addNewFriend(token, friendId) {
  return client.post(`http://localhost:3030/users_friends?token=${token}&userId=${friendId}`)
};

export function deleteFriend(token, friendId) {
  return client.del(`http://localhost:3030/users_friends?token=${token}&friendId=${friendId}`)
};
