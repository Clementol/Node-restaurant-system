const AuthHelper = require("../helpers/auth.helper");
const {User, Order, Food, Order_Items, Vendor} = require("../models");

/**
 *
 * @param {*} email
 * @returns  userExist
 */

const checkUser = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({ where: { email: email }
    }).then((userExist) => {
      if (userExist) {
        resolve(userExist);
      } else {
        resolve(userExist);
      }
    })
  });
};

/**
 *
 * @param {*} phoneNo
 * @returns phoneNo, error
 */
const checkPhoneNo = (phoneNo) => {
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
};

/**
 * @description Create user data
 * @param {*} data
 * @returns user, error
 */
//
const SignUp = async (data) => {
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
};
/**
 *
 * @param {*} userId
 * @param {*} data
 * @description update user
 */
const updateUser = (userId, data) => {
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

/**
 * 
 * @param {*} userId 
 * @description Get user orders 
 */

const getUserOrders = (userId) => {
  const attr = ["userId", "firstName", "lastName"]
  return new Promise((resolve, reject) => {
    Order.findAll({where: {userId: userId}, 
      include: [
        {model: Vendor, as: "vendor"},
        {model: Order_Items, as: "orderItems",
          include: [{model: Food, as: "food"}]
        },
      ], 
  
    })
    .then((user) => resolve(user))
    .catch(error => reject(error))
  })
}

module.exports = { checkUser, checkPhoneNo, SignUp, updateUser, getUserOrders };
