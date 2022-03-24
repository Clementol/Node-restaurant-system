const { Router } = require("express");
const {
  login,
  signUp,
  updateUser,
} = require("../controllers/user.controllers");
const middleware = require("../middleware/authentication");
const upload = require("../middleware/multer");

const userRouter = Router();

userRouter.post("/signup", upload.single("avatar"), signUp);
userRouter.post("/login", login);
userRouter.put(
  "/user/update",
  middleware.requireSignIn,
  upload.single("avatar"),
  updateUser
);

module.exports = userRouter;
