import { Router } from "express";
import { login, signUp, updateUser } from "../controllers/user.controllers";
import middleware from "../middleware/authentication";
import upload from "../middleware/multer";

const userRouter = Router();

userRouter.post("/signup", upload.single("avatar"), signUp);
userRouter.post("/login", login);
userRouter.put(
  "/user/update",
  middleware.requireSignIn,
  upload.single("avatar"),
  updateUser
);

export { userRouter };
