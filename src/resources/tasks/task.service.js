const taskRepo = require('./task.memory.repository');

const createTask = taskData => taskRepo.createTask(taskData);
const getAll = () => taskRepo.getAll();

module.exports = { createTask, getAll };
