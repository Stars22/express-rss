const router = require('express').Router();
const boardService = require('./board.service');

router.post('/', (req, res) => {
  const { title, columns } = req.body;
  const newBoard = boardService.createBoard(title, columns);
  res.json(newBoard);
});

module.exports = router;
