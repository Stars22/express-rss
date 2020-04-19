const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { catchError } = require('../../common/utils');
const createError = require('http-errors');

// password exclusion from response is implemented by mongodb projection
router.route('/').get(
  catchError(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users);
  })
);
router.get(
  '/:id',
  catchError(async (req, res, next) => {
    const user = await usersService.findUser(req.params.id);
    if (user) {
      return res.json(user);
    }
    next(createError(404));
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
      return res.json({ message: 'user was deleted' });
    }
    throw new Error('user was not found');
  })
);
module.exports = router;
