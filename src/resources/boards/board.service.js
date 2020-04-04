const boardRepo = require('./board.memory.repository');

const createBoard = (title, columns) => boardRepo.createBoard(title, columns);

module.exports = { createBoard };
