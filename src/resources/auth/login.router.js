const router = require('express').Router();
const usersService = require('../users/user.service');
const bcrypt = require('bcryptjs');
const { catchError } = require('../../common/utils');
const createError = require('http-errors');
const User = require('../users/user.model');
router.post(
  '/',
  catchError(async (req, res) => {
    const { login, password } = req.body;
    const user = await usersService.findUserByLogin(login);
    console.log(user);
    if (!user) throw createError(403);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw createError(403);
    // res.json(User.toResponse(user));
  })
);
module.exports = router;
