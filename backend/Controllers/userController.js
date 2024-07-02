import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";

export const Register =async (req,res) =>{
    try {
      const {name,username,email,password}= req.body;
      if(!name||!username||!email||!password){
        return res.status(401).json({
            message:"All Fields Are Required",
            success:false
        })
      }
      const user=await User.findOne({email});
      if(user){
        return res.status(401).json({
            message:"User Already Exist",
            success:false
      })}

      const hashedPassword = await bcryptjs.hash(password,16);

      await User.create({
        name,
        username,
        email,
        password:hashedPassword
      });
      return res.status(201).json({
        message:"Account Created Sucessfully",
        success:true


      })
    }catch(error){
        console.log(error);
    }
}