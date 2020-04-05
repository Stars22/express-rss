const Board = require('./board.model');
const taskService = require('../tasks/task.service');
const boards = {
  '2': {
    id: '2',
    title: 'someTitle',
    columns: [{ id: '2c', title: 'colTitle', order: 1 }]
  }
};

function getAll() {
  return Object.values(boards);
}

function createBoard(title, columns) {
  const board = new Board(title, columns);
  boards[board.id] = board;
  return board;
}
function findBoard(id) {
  return boards[id];
}
function updateBoard(id, boardData) {
  boards[id] = { ...boards[id], ...boardData };
  return boards[id];
}
function deleteBoard(id) {
  if (boards[id]) {
    delete boards[id];
    taskService.deleteBoardTasks(id);
    return true;
  }
  return false;
}

module.exports = { getAll, createBoard, findBoard, updateBoard, deleteBoard };
