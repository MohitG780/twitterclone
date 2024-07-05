import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv({
    path:"../config/.env"
})
const isAuth = async(req,res,next) => {
    try{
        const token=res.cookies;
        console.log(token);
        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false
            })
            const decode =await jwt.verify(token,process.env.TOKEN_SECRET);
            console.log(decode);
            req.user=decode.userId;
            next();
        }
    }
    catch(error){
        console.log(error);

    }
    }
    export default isAuth;

