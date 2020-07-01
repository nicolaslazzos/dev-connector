const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // get token from header
  const token = req.header('x-auth-token');

  if (!token) return res.status(401).json({ msg: 'Unauthorized, no token' });

  // verify the token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // user id extracted from the decoded token body
    req.user = decoded.user;

    next();
  }catch(error) {
    res.status(401).json({ msg: 'Unauthorized, invalid token' });
  }
}