const router = require('express').Router();
const { catchError } = require('../../common/utils');
const { authoriseUser, generateUserToken } = require('./login.controller');
const jwt = require('jsonwebtoken');
const User = require('../users/user.model');
const uuid = require('uuid');
router.post(
  '/',
  catchError(async (req, res) => {
    const { login, password } = req.body;
    const user = await authoriseUser(login, password);
    const token = await generateUserToken({ login, userId: user._id });
    const refreshToken = uuid();
    user.tokens.push({ token: refreshToken });
    await user.save();
    res.set('Authorization', `Bearer ${token}`).json({ token, refreshToken });
  })
);
router.post('/refresh', async (req, res) => {
  const { userId, refreshToken } = req.body;
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: 3600
  });
  const newToken = uuid();
  const createdAt = Date.now();
  await User.updateOne(
    {
      _id: userId,
      'tokens.token': refreshToken
    },
    { $set: { 'tokens.$.token': newToken, 'tokens.$.createdAt': createdAt } }
  );
  res.json({ refreshToken: { token: newToken, createdAt }, accessToken });
});
module.exports = router;
