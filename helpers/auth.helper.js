import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config";
import User from "../models/user";

class AuthHelper {
  /**
   * @description encrypt password
   * @param {*} password
   * @returns passwordHash, error
   */

  encryptPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(password, salt, (error, hash) => {
          // if (error) reject({ error });
          resolve({ passwordHash: hash });
        });
      });
    });
  }

  /**
   * @param {*} foundedPassword 
   * @param {*} password 
   * @description To verify Password
   */
  verifyPassword(foundedPassword, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, foundedPassword)
      .then(isMatch => {
          if (isMatch) {
            resolve(isMatch)
          } else {
            resolve(isMatch)
          }
      })
    })
  }

  /**
   * @description Generate token
   * @param {*} data
   * @returns token, error
   */
  generateToken(data) {
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
          resolve({token, refreshToken});
        }
      );
    });
  }

/**
 * 
 * @param {*} userId 
 * @param {*} data 
 * @description Update token 
 */
  updateToken(userId, data) {
    return new Promise((resolve, reject) => {
      User.update(data, {where: {userId: userId}})
      .then(user => {
        resolve(user)
      })
      .catch(error => {
        reject(error)
      })
    })
  }
}

export default new AuthHelper();
