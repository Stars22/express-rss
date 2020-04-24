const router = require('express').Router();
const { catchError } = require('../../common/utils');
const { authoriseUser, generateUserToken } = require('./login.controller');
router.post(
  '/',
  catchError(async (req, res) => {
    const { login, password } = req.body;
    const user = await authoriseUser(login, password);
    const token = await generateUserToken({ login, userId: user._id });
    res.set('Authorization', `Bearer ${token}`).json({ token });
  })
);
module.exports = router;
