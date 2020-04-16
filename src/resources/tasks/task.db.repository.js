const Task = require('./task.model');

function getAll() {
  return Task.find();
}
function getTask(id) {
  return Task.findById(id);
}

function createTask(taskData) {
  const task = new Task(taskData);
  return task.save();
}
function updateTask(id, taskData) {
  return Task.findByIdAndUpdate(id, taskData, { upsert: false });
}
function deleteTask(id) {
  return Task.findByIdAndDelete(id);
}

module.exports = {
  createTask,
  getAll,
  getTask,
  updateTask,
  deleteTask
};
