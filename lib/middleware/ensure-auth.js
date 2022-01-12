const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const { userId } = req.cookies;
    req.user = jwt.verify(userId, process.env.APP_SECRET);

    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
}