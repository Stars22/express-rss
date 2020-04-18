const taskRepo = require('./task.db.repository');

const createTask = taskData => taskRepo.createTask(taskData);
const getAll = () => taskRepo.getAll();
const getTask = id => taskRepo.getTask(id);
const updateTask = (id, taskData) => taskRepo.updateTask(id, taskData);
const deleteTask = id => taskRepo.deleteTask(id);
const unassignUserTasks = id => taskRepo.unassignUserTasks(id);
const deleteBoardTasks = boardId => taskRepo.deleteBoardTasks(boardId);
const updateUserTasks = boardId => taskRepo.updateUserTasks(boardId);

module.exports = {
  createTask,
  getAll,
  getTask,
  updateTask,
  deleteTask,
  unassignUserTasks,
  deleteBoardTasks,
  updateUserTasks
};
