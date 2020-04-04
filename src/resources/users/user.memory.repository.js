const User = require('./user.model');

const users = {
  '1': { id: 1, name: 'vasya', login: 'vasi', password: 'asdf' }
};

const getAll = async () => {
  return Object.values(users);
};

function createUser(name, login, password) {
  const user = new User({ name, login, password });
  users[user.id] = user;
  return user;
}
function findUser(id) {
  return users[id];
}
function updateUser(id, newUserData) {
  const userData = users[id];
  users[id] = { ...userData, ...newUserData };
  return users[id];
}
function deleteUser(id) {
  if (users[id]) {
    delete users[id];
    return true;
  }
  return false;
}
module.exports = { getAll, createUser, findUser, updateUser, deleteUser };
