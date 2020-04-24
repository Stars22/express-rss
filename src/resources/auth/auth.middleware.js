const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'please login to continue' });
  }
  const token = req.headers.authorization.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch {
    return res.status(401).json({ message: 'please login to continue' });
  }
  next();
};
