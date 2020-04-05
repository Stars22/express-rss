const router = require('express').Router();
const boardService = require('./board.service');

router.get('/', (req, res) => {
  res.json(boardService.getAll());
});
router.get('/:id', (req, res) => {
  const board = boardService.findBoard(req.params.id);
  if (board) {
    return res.json(board);
  }
  res.status(404).json({ message: 'board was not found' });
});
router.post('/', (req, res) => {
  const { title, columns } = req.body;
  const newBoard = boardService.createBoard(title, columns);
  res.json(newBoard);
});
router.put('/:id', (req, res) => {
  const updatedBoard = boardService.updateBoard(req.params.id, req.body);
  res.json(updatedBoard);
});
router.delete('/:id', (req, res) => {
  const isDeleted = boardService.deleteBoard(req.params.id);
  if (isDeleted) {
    return res.status(204).end();
  }
  res.status(404).end();
});

module.exports = router;
