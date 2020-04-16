const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { catchError } = require('../../common/utils');

// password exclusion from response is implemented by mongodb projection
router.route('/').get(
  catchError(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users);
  })
);
router.get(
  '/:id',
  catchError(async (req, res) => {
    const user = await usersService.findUser(req.params.id);
    return res.json(user);
  })
);
router.post(
  '/',
  catchError(async (req, res) => {
    const { name, login, password } = req.body;
    const user = await usersService.createUser(name, login, password);
    res.json(User.toResponse(user));
  })
);
router.put(
  '/:id',
  catchError(async (req, res) => {
    const updatedUser = await usersService.updateUser(req.params.id, req.body);
    res.json(User.toResponse(updatedUser));
  })
);
router.delete(
  '/:id',
  catchError(async (req, res) => {
    const isDeleted = await usersService.deleteUser(req.params.id);
    if (isDeleted) {
      res.json({ message: 'user was deleted' });
    }
    throw new Error('user was not found');
  })
);
module.exports = router;
