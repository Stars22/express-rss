const router = require('express').Router();
const boardService = require('./board.service');
const { catchError } = require('../../common/utils');
const createError = require('http-errors');

router.get(
  '/',
  catchError(async (req, res) => {
    res.json(await boardService.getAll());
  })
);
router.get(
  '/:id',
  catchError(async (req, res, next) => {
    const board = await boardService.findBoard(req.params.id);
    if (board) {
      return res.json(board);
    }
    next(createError(404));
  })
);
router.post(
  '/',
  catchError(async (req, res) => {
    const { title, columns } = req.body;
    const newBoard = await await boardService.createBoard(title, columns);
    res.json(newBoard);
  })
);
router.put(
  '/:id',
  catchError(async (req, res) => {
    const updatedBoard = await boardService.updateBoard(
      req.params.id,
      req.body
    );
    res.json(updatedBoard);
  })
);
router.delete(
  '/:id',
  catchError(async (req, res) => {
    const isDeleted = await boardService.deleteBoard(req.params.id);
    if (isDeleted) {
      res.json().status(204);
    }
  })
);

module.exports = router;
