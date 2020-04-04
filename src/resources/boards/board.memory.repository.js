const Board = require('./board.model');
const boards = {};

function createBoard(title, columns) {
  const board = new Board(title, columns);
  boards[board.id] = board;
  return board;
}

module.exports = { createBoard };
