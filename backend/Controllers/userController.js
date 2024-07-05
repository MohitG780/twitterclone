import { User } from "../models/userSchema.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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


export const Login = async(req,res) => {
  try{
    const {email,password}=req.body;
    if(!email||!password){
      return res.status(401).json({
        message:"All Fields are Required",
        success:false
      })
    };
    const user= await User.findOne({email});
    if(!user){
      return res.status(401).json({
        message:"User does exist with this email",
        success:false

      })
    }
    const isMatch= await bcryptjs.compare(user.password,password);
    if(!isMatch){
      return res.status(401).json({
        message:"Incorrect email or password",
        success:false

      })
    };
    const tokenData= {
      userId:user._id
    }
    const token= await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1d"});
    return res.status(201).cookie("token",token,{expiresIn:"1d",httpOnly:true}).json({
      message:`Welcome back ${user.name}`,
      success:true
    })

  }catch(error){
    console.log(error);
  } 
}

export  const Logout =(req,res) => {
  return res.cookie("token","",{expiresIn:new Date(Date.now())}).json({
    message:"user logged out successfully",
    success: true
  })
}

export const bookmark=async(req,res)=> {
  try{
      const loggedInUserId=req.body.id;
      const tweetId= req.params.id;
      const tweet=await Tweet.findById(tweetId);
  if(tweet.bookmarks.include(loggedInUserId)){
      await Tweet.findByIdAndUpdate(tweetId,{$pull:{bookmarks:loggedInUserId}});
      return res.status(200).json({
          message:"Removed from bookmarks. "
      }) 

  }
  else{
      await Tweet.findByIdAndUpdate(tweetId,{$push:{bookmarks:loggedInUserId}});
      return res.status(200).json({
          message:"Saved to bookmarks."
      }) 

  }
  }catch(error){
      console.log(error);
  }
}
export const getMyProfile= async(req,res)=>{
  try{
    const id=req.params.id;
    const user=await User.findById(id).select("-password");
    return res.status(200).json({
      user
    })
  }catch(error){
    console.log(error);
  }
}
export const getOtherUsers= async(req,res)=>{
  try{
    const { id }=req.params.id;
    const OtherUsers=await User.findById({_id:{$ne:id}}).select("-password");
    if(!OtherUsers){
     return res.status(401).json({
      message: "Currently do not have any users."
     })
    };
    return res.status(200).json({
      user
    })
  }catch(error){
    console.log(error);
  }
}