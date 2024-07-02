import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./Routes/userRoutes.js";
dotenv.config({
    path:".env"
})
databaseConnection();

const app=express();

app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user",userRoute)
app.listen(process.env.PORT,()=>{
    console.log("Server listen at port ${process.env.PORT}");
})