const boardRepo = require('./board.db.repository');

const createBoard = (title, columns) => boardRepo.createBoard(title, columns);
const getAll = () => boardRepo.getAll();
const findBoard = id => boardRepo.findBoard(id);
const updateBoard = (id, boardData) => boardRepo.updateBoard(id, boardData);
const deleteBoard = id => boardRepo.deleteBoard(id);

module.exports = { createBoard, getAll, findBoard, updateBoard, deleteBoard };
