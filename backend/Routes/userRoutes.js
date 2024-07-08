import express from "express";
import { Register,Login, Logout, bookmark, getMyProfile, getOtherUsers, unfollow, follow } from "../Controllers/userController.js";
import isAuth from "../config/auth.js";

const router =express.Router();
 router.route("/register").post(Register);
 router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/bookmark/:id").put(isAuth,bookmark);
router.route("/profile/:id").get(isAuth,getMyProfile);
router.route("/otheruser/:id").get(isAuth,getOtherUsers);
router.route("/follow/:id").post(isAuth,follow);
router.route("/unfollow/:id").post(isAuth,unfollow);

 export default router;
