const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');

router.get('/', (req, res) => {
  res.json(taskService.getAll());
});
router.get('/:id', (req, res) => {
  const task = taskService.getTask(req.params.id);
  if (task) {
    return res.json(task);
  }
  res.status(404).json({ message: 'task was not found' });
});
router.post('/', (req, res) => {
  res.json(
    taskService.createTask({ ...req.body, boardId: req.params.boardId })
  );
});
router.put('/:id', (req, res) => {
  const { id, boardId } = req.params;
  // console.log(req.body);
  res.json(taskService.updateTask(id, { ...req.body, boardId }));
});

router.delete('/:id', (req, res) => {
  const isDeleted = taskService.deleteTask(req.params.id);
  if (isDeleted) {
    return res.status(204).end();
  }
  res.status(404).end();
});
module.exports = router;
