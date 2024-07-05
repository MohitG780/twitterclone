import express from "express";
import { CreateTweet, deleteTweet, likeorDislike } from "../Controllers/tweetController.js";
import {isAuth} from "./config/auth.js"
const router= express.Router();
router.route("/create").post(isAuth,CreateTweet);
router.route("/delete/:id").delete(deleteTweet);
router.route("/like/:id").put(likeorDislike);
 export default router;