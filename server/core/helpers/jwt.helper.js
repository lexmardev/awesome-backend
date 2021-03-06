const env = require('./yenv.helper');
const jwt = require('jsonwebtoken');

const sign = (payload = {}) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, env.TOKEN.SECRET_KEY, { algorithm: 'HS256', expiresIn: env.TOKEN.EXP }, (error, encoded) => {
      if (error) {
        reject(new Error('Failed to sign'));
      }

      resolve(encoded);
    });
  });
};

module.exports = {
  sign,
};
