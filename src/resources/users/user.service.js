const usersRepo = require('./user.db.repository');

const getAll = () => usersRepo.getAll();
const createUser = (name, login, password) =>
  usersRepo.createUser(name, login, password);
const findUser = id => {
  const user = usersRepo.findUser(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
const deleteUser = id => usersRepo.deleteUser(id);
const updateUser = (id, userData) => usersRepo.updateUser(id, userData);
const findUserByLogin = login => usersRepo.findUserByLogin(login);

module.exports = {
  getAll,
  createUser,
  findUser,
  deleteUser,
  updateUser,
  findUserByLogin
};
