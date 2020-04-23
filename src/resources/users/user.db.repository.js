const User = require('./user.model');
const createError = require('http-errors');

const getAll = () => {
  return User.find({}, { password: 0 }).exec();
};

function createUser(name, login, password) {
  const user = new User({ name, login, password });
  return user.save();
}
function findUser(id) {
  return User.findById(id, { password: 0 }).exec();
}
function updateUser(id, newUserData) {
  return User.findByIdAndUpdate(id, newUserData, { upsert: false }).exec();
}
async function deleteUser(id) {
  const user = await User.findById(id);
  if (user) {
    return user.deleteOne();
  }
  throw createError(404, 'User was not found');
}
function findUserByLogin(login) {
  return User.findOne({ login });
}
module.exports = {
  getAll,
  createUser,
  findUser,
  updateUser,
  deleteUser,
  findUserByLogin
};
