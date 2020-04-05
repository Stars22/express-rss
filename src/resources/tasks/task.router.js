const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');

router.get('/', (req, res) => {
  res.json(taskService.getAll());
});
router.post('/', (req, res) => {
  res.json(
    taskService.createTask({ ...req.body, boardId: req.params.boardId })
  );
});

module.exports = router;
