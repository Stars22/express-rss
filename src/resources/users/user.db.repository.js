const User = require('./user.model');

const getAll = () => {
  return User.find({}, { password: 0 });
};

function createUser(name, login, password) {
  const user = new User({ name, login, password });
  return user.save();
}
function findUser(id) {
  return User.findById(id, { password: 0 });
}
function updateUser(id, newUserData) {
  return User.findByIdAndUpdate(id, newUserData, { upsert: false });
}
function deleteUser(id) {
  return User.findByIdAndDelete(id);
}
module.exports = { getAll, createUser, findUser, updateUser, deleteUser };
