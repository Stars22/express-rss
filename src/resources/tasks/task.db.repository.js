const Task = require('./task.model');

function getAll() {
  return Task.find();
}
function getTask(id) {
  return Task.findById(id).exec();
}

function createTask(taskData) {
  const task = new Task(taskData);
  return task.save();
}
function updateTask(id, taskData) {
  return Task.findByIdAndUpdate(id, taskData, { upsert: false }).exec();
}
function deleteTask(id) {
  return Task.findByIdAndDelete(id);
}
function deleteBoardTasks(id) {
  return Task.deleteMany({ boardId: id }).exec();
}

function updateUserTasks(id) {
  return Task.updateMany({ userId: id }, { userId: null }).exec();
}

module.exports = {
  createTask,
  getAll,
  getTask,
  updateTask,
  deleteTask,
  deleteBoardTasks,
  updateUserTasks
};
