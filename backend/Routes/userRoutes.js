import express from "express";
import { Register } from "../Controllers/userController.js";

const userRoute= express.Router();
 userRoute.route("/register").post(Register);
 export default userRoute;
