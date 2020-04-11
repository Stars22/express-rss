const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { catchError } = require('../../common/utils');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});
router.get(
  '/:id',
  catchError(async (req, res) => {
    const user = await usersService.findUser(req.params.id);
    return res.json(User.toResponse(user));
  })
);
router.post('/', (req, res) => {
  const { name, login, password } = req.body;
  const user = usersService.createUser(name, login, password);
  res.json(User.toResponse(user));
});
router.put('/:id', (req, res) => {
  const updatedUser = usersService.updateUser(req.params.id, req.body);
  res.json(User.toResponse(updatedUser));
});
router.delete('/:id', (req, res) => {
  const isDeleted = usersService.deleteUser(req.params.id);
  if (isDeleted) {
    return res.json({ message: 'user was deleted' });
  }
  res.status(404).json({ message: 'something went wrong' });
});
module.exports = router;
