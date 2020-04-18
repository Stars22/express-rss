const Board = require('./board.model');
const createError = require('http-errors');

function getAll() {
  return Board.find().exec();
}

function createBoard(title, columns) {
  const board = new Board({ title, columns });
  return board.save();
}
function findBoard(id) {
  return Board.findById(id).exec();
}
function updateBoard(id, boardData) {
  return Board.findByIdAndUpdate(id, boardData, { upsert: false }).exec();
}
async function deleteBoard(id) {
  const board = await Board.findById(id);
  if (!board) {
    throw createError(404, "The board doesn't exist");
  }
  return board.deleteOne();
}

module.exports = { getAll, createBoard, findBoard, updateBoard, deleteBoard };
