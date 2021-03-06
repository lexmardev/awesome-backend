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

const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, env.TOKEN.SECRET_KEY, (error, decoded) => {
      if (error) {
        reject(error);
      }

      resolve(decoded);
    });
  });
};

module.exports = {
  sign,
  verify,
};
