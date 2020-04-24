const router = require('express').Router();
const { catchError } = require('../../common/utils');
const { authoriseUser, generateUserToken } = require('./login.controller');
router.post(
  '/',
  catchError(async (req, res) => {
    const { login, password } = req.body;
    await authoriseUser(login, password);
    const token = await generateUserToken({ login });
    res
      .set('Authorization', `Bearer ${token}`)
      .json({ message: 'Hello my friend' });
  })
);
module.exports = router;
