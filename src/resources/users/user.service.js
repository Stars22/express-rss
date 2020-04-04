const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const createUser = (name, login, password) =>
  usersRepo.createUser(name, login, password);
const findUser = id => usersRepo.findUser(id);
const deleteUser = id => usersRepo.deleteUser(id);
const updateUser = (id, userData) => usersRepo.updateUser(id, userData);

module.exports = { getAll, createUser, findUser, deleteUser, updateUser };
