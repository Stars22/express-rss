const jwt = require('jsonwebtoken');
const { findUser } = require('../users/user.service');
module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'please login to continue' });
  }
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    await findUser(decodedToken.userId);
  } catch {
    return res.status(401).json({ message: 'please login to continue' });
  }
  next();
};
