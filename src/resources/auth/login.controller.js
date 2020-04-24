const bcrypt = require('bcryptjs');
const usersService = require('../users/user.service');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

async function authoriseUser(login, password) {
  const user = await usersService.findUserByLogin(login);
  if (!user) throw createError(403);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw createError(403);
}
function generateUserToken(payload, expiration = 3600) {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: expiration
  });
}

module.exports = { authoriseUser, generateUserToken };
