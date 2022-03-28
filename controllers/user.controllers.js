const { ObjectId } = require("mongodb");
const AuthHelper = require("../helpers/auth.helper");

const UserServices = require("../services/user.services");

const signUp = (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const avatar = req.file;
    let userId = ObjectId().toString();
  
    let data = {
      userId,
      firstName,
      lastName,
      email,
      phone,
      password,
    };
    if (avatar != null) {
      data.avatar = avatar.location;
    }
    UserServices.checkUser(data.email).then((userExist) => {
      if (userExist) {
        return res.status(400).json({ error: "User already exist" });
      } else if (!userExist) {
        UserServices.checkPhoneNo(data.phone).then((userPhone) => {
          if (userPhone) {
            return res.status(400).json({ error: `Phone already exist` });
          } else if (!userPhone) {
            UserServices.SignUp(data)
              .then((user) => {
                return res.status(201).json(`User created successfully!`);
              })
              .catch((error) => {
                if (error) {
                  const msg = `error creating user ${error}`;
                  return res.status(400).json({ error: msg });
                }
              });
          }
        });
      }
    }).catch(error => {
      const msg = `Unable to check for user ${error}`
      return res.status(400).json({error: msg})
    })
  } catch (error) {
    // const {error: {errors}} = error
    return res.status(400).json({ error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    await UserServices.checkUser(email).then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User doesn't exist" });
      } else if (user) {
        AuthHelper.verifyPassword(user.password, password).then((isMatch) => {
          if (!isMatch) {
            return res.status(400).json({ error: "Invalid login details" });
          } else if (isMatch) {
            AuthHelper.generateToken({
              email: user.email,
              userId: user.userId,
              firstName: user.firstName,
              lastName: user.lastName,
            }).then(({ token, refreshToken }) => {
              let data = {};
              data.token = token;
              data.refreshToken = refreshToken;
              AuthHelper.updateToken(user.userId, data).then(() => {
                const rUser = user.toJSON() 
                delete rUser.password
                delete rUser.refreshToken
                return res.status(200).json({ user: rUser});
              })
              .catch(error => {
                const msg =  `Unable to update user credentials ${error}`
                return res.status(400).json({error: msg})
              })
            });
          }
        });
      }
    }).catch(error => {
      const msg = `Unable to check for user ${error}`
      return res.status(400).json({error: msg})
    })
  } catch (error) {
    const msg = `Error loging in ${error}`;
    return res.status(400).json({ error: msg });
  }
};

const updateUser = (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    const avatar = req.file;
    const userId = req.user.userId;
    let data = {};

    if (firstName != null) {
      data.firstName = firstName;
    }
    if (lastName != null) {
      data.lastName = lastName;
    }
    if (phone != null) {
      data.phone = phone;
    }

    if (avatar != null) {
      data.avatar = avatar.location;
    }
    UserServices.updateUser(userId, data)
      .then((user) => {
        const [affectedCount] = user
        if (affectedCount == 0) {
          const msg = `No user found`
          return res.status(400).json({error: msg})
        }
        return res.status(202).json({ user });
      })
      .catch((error) => {
        const msg = `Unable to update user ${error}`;
        return res.status(400).json({ error: msg });
      });
  } catch (error) {
    const msg = `Error updating user ${error}`;
    return res.status(400).json({ error: msg });
  }
};

const getUserOrders = (req, res) => {
  try {
    const userId = req.user.userId;
    UserServices.getUserOrders(userId)
    .then(user => {
      return res.status(200).json({user})
    })
    .catch(error => {
      const msg = `Unable to get user orders ${error}`
      return res.status(400).json({error: msg})
    })
  } catch (error) {
    const msg = `Error getting user orders ${error}`;
    return res.status(400).json({ error: msg });
  }
}

module.exports = { signUp, login, updateUser, getUserOrders };
