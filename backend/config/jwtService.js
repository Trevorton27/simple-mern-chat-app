const jwt = require('jsonwebtoken');

const jwtService = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

module.exports = jwtService;
