import { updateUser } from "../controllers/user.controllers";
import AuthHelper from "../helpers/auth.helper";
import User from "../models/user";

class UserServices {
  constructor() {}

  /**
   *
   * @param {*} email
   * @returns  userExist
   */

  checkUser(email) {
    return new Promise((resolve, reject) => {
      User.findOne({ where: { email: email } }).then((userExist) => {
        if (userExist) {
          resolve(userExist);
        } else {
          resolve(userExist);
        }
      });
    });
  }

  /**
   *
   * @param {*} phoneNo
   * @returns phoneNo, error
   */
  checkPhoneNo(phoneNo) {
    return new Promise((resolve, reject) => {
      User.findOne({ where: { phone: phoneNo } }).then((phoneNo) => {
        if (phoneNo) {
          resolve(phoneNo);
        } else {
          resolve(phoneNo);
        }
      });
      // .catch((error) => reject(error));
    });
  }

  /**
   * @description Create user data
   * @param {*} data
   * @returns user, error
   */
  //
  async SignUp(data) {
    await AuthHelper.encryptPassword(data.password).then(
      async ({ passwordHash }) => {
        let { email, userId, firstName, lastName } = data;
        await AuthHelper.generateToken({
          email,
          userId,
          firstName,
          lastName,
        }).then(({ token, refreshToken }) => {
          data.password = passwordHash;
          data.token = token;
          data.refreshToken = refreshToken;

          return new Promise((resolve, reject) => {
            User.create(data)
              .then((user) => resolve(user))
              .catch((error) => reject(error));
          });
        });
      }
    );
  }
  /**
   * 
   * @param {*} userId 
   * @param {*} data 
   * @description update user 
   */
  updateUser(userId, data) {
    
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

export default new UserServices();
