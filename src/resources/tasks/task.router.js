const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const { catchError } = require('../../common/utils');
const createError = require('http-errors');

router.get(
  '/',
  catchError(async (req, res) => {
    res.json(await taskService.getAll());
  })
);
router.get(
  '/:id',
  catchError(async (req, res, next) => {
    const task = await taskService.getTask(req.params.id);
    if (task) {
      return res.json(task);
    }
    next(createError(404));
  })
);
router.post(
  '/',
  catchError(async (req, res) => {
    res.json(
      await taskService.createTask({ ...req.body, boardId: req.params.boardId })
    );
  })
);
router.put(
  '/:id',
  catchError(async (req, res) => {
    const { id, boardId } = req.params;
    res.json(await taskService.updateTask(id, { ...req.body, boardId }));
  })
);

router.delete(
  '/:id',
  catchError(async (req, res) => {
    const isDeleted = await taskService.deleteTask(req.params.id);
    if (isDeleted) {
      return res.status(204).end();
    }
    res.status(404).end();
  })
);
module.exports = router;
