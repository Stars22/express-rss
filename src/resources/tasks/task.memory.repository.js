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
class CreateRef {
  addRefId(id, ref) {
    if (this[id]) {
      this[id].push(ref);
    } else {
      this[id] = [ref];
    }
  }
}

const userRefs = new CreateRef();
const boardRefs = new CreateRef();

function getAll() {
  return Object.values(tasks);
}
function getTask(id) {
  return tasks[id];
}

function createTask(taskData) {
  const { userId, boardId } = taskData;
  const task = new Task(taskData);
  tasks[task.id] = task;
  userRefs.addRefId(userId, task.id);
  boardRefs.addRefId(boardId, task.id);
  return task;
}
function updateTask(id, taskData) {
  tasks[id] = { ...tasks[id], ...taskData };
  return tasks[id];
}
function deleteTask(id) {
  if (tasks[id]) {
    delete tasks[id];
    return true;
  }
  return false;
}
function unassignUserTasks(userId) {
  if (userRefs[userId]) {
    for (const task of userRefs[userId]) {
      updateTask(task, { userId: null });
    }
  }
}
function deleteBoardTasks(boardId) {
  if (boardRefs[boardId]) {
    for (const task of boardRefs[boardId]) {
      deleteTask(task);
    }
  }
}

module.exports = {
  createTask,
  getAll,
  getTask,
  updateTask,
  deleteTask,
  unassignUserTasks,
  deleteBoardTasks
};
