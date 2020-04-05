const Task = require('./task.model');

const tasks = {
  '1': {
    id: '1',
    title: 'SomeTask',
    order: '1',
    description: 'Some desctiption',
    columnId: '1c',
    userId: '1u',
    boardId: '1b'
  }
};

function getAll() {
  return Object.values(tasks);
}
function createTask(taskData) {
  const task = new Task(taskData);
  console.log(task);
  tasks[task.id] = task;
  return task;
}

module.exports = { createTask, getAll };
