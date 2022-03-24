const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const {User} = require("../models");

/**
 * @description encrypt password
 * @param {*} password
 * @returns passwordHash, error
 */

const encryptPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(password, salt, (error, hash) => {
        // if (error) reject({ error });
        resolve({ passwordHash: hash });
      });
    });
  });
};

/**
 * @param {*} foundedPassword
 * @param {*} password
 * @description To verify Password
 */
const verifyPassword = (foundedPassword, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, foundedPassword).then((isMatch) => {
      if (isMatch) {
        resolve(isMatch);
      } else {
        resolve(isMatch);
      }
    });
  });
};

/**
 * @description Generate token
 * @param {*} data
 * @returns token, error
 */
const generateToken = (data) => {
  let token, refreshToken;
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data },
      config.JWT_SECRETE,
      { expiresIn: "24h" },
      (error, jwtToken) => {
        // if (error) reject({ error });
        token = jwtToken;
        refreshToken = jwtToken;
        resolve({ token, refreshToken });
      }
    );
  });
};

/**
 *
 * @param {*} userId
 * @param {*} data
 * @description Update token
 */
const updateToken = (userId, data) => {
  return new Promise((resolve, reject) => {
    
    User.update(data, { where: { userId: userId } })
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  generateToken,
  updateToken,
  encryptPassword,
  verifyPassword,
};
