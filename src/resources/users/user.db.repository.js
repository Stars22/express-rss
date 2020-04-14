const User = require('./user.model');

const getAll = () => {
  return User.find();
};

function createUser(name, login, password) {
  const user = new User({ name, login, password });
  user.save();
  return user;
}
function findUser(id) {
  return User.findById(id);
}
function updateUser(id, newUserData) {
  users[id] = { ...users[id], ...newUserData };
  return users[id];
}
function deleteUser(id) {
  if (users[id]) {
    delete users[id];
    taskService.unassignUserTasks(id);
    return true;
  }
  return false;
}
module.exports = { getAll, createUser, findUser, updateUser, deleteUser };
