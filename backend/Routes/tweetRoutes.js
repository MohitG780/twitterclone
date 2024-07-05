import express from "express";
import { CreateTweet, deleteTweet, getAllTweets, getFollowingTweets, likeorDislike } from "../Controllers/tweetController.js";
import {isAuth} from "./config/auth.js"
const router= express.Router();
router.route("/create").post(isAuth,CreateTweet);
router.route("/delete/:id").delete(deleteTweet);
router.route("/like/:id").put(likeorDislike);
router.route("/alltweets/:id").get(getAllTweets);
router.route("/followingtweets/:id").get(getFollowingTweets);
 export default router;