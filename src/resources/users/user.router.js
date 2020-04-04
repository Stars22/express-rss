const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});
router.get('/:id', (req, res) => {
  const user = usersService.findUser(req.params.id);
  res.json(user);
});
router.post('/', (req, res) => {
  const { name, login, password } = req.body;
  const user = usersService.createUser(name, login, password);
  res.json(User.toResponse(user));
});
router.put('/:id', (req, res) => {
  const updatedUser = usersService.updateUser(req.params.id, req.body);
  res.json(updatedUser);
});
router.delete('/:id', (req, res) => {
  const isDeleted = usersService.deleteUser(req.params.id);
  if (isDeleted) {
    return res.status(200).json({ message: 'user was deleted' });
  }
  res.status(404).json({ message: 'something went wrong' });
});
module.exports = router;
