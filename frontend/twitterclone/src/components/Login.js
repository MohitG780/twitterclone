import React, { useState } from "react";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import { getUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
const Login = ()=>{
    const [isLogin,setisLogin]=useState(true);
    const [name,setName]=useState("");
    const [username,setuserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const dispatch =useDispatch();
    const submitHandler=async (e)=> {
        e.preventDefault();
        if(isLogin){
            try{
                const res=await axios.post(`${USER_API_END_POINT}/login`,{email,password}, 
                { headers:{
                    'Content-Type':"application/json"
                 },
                 withCredentials:true});
                 dispatch(getUser(res?.data?.user));
                 if(res.data.success){
                    navigate("/");
                    toast.success(res.data.message);
                 }
                 else{
                    toast.error(res.data.message);
                 }
        
                 
               
            }catch (error) {
                toast.error(error.response.data.message);
                  console.log(error);
            }
        }else{
            try{
                const res=await axios.post(`${USER_API_END_POINT}/register`,{name,username,email,password},
                 { headers:{
                    'Content-Type':"application/json"
                 },
                 withCredentials:true}) ;
               
                 if(res.data.success){
                    setisLogin(true);
                    toast.success(res.data.message);
                 }
                 else{
                    toast.error(res.data.message);
                 }
            }catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }

        }
    }
    const loginSignupHandler = () => {
        setisLogin(!isLogin);
    }
    return (
        <div className=" w-screen h-screen flex items-center justify-center">
        <div className="flex items-center justify-evenly w-[80%]">
            <div>
            <img className="ml-5" width={"600px"} src = "https://tse2.mm.bing.net/th?id=OIP.1lm9KjprReA8-CMRPriawgAAAA&pid=Api&P=0&h=180" alt = "twitter-logo"/>  
            </div>
            <div>
                <div>
             <h1 className="font-bold text-6xl">Happening now.</h1>
              </div>
                <h1 className="text-2xl my-4 font-bold">{isLogin?"Login":"Signup"}</h1>
                <form onSubmit={submitHandler} className="flex flex-col w-[55%]">
                    { !isLogin && (<>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"/>
                        <input type="text"  value={username} onChange={(e)=>setuserName(e.target.value)} placeholder="Username" className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
                    </>)}
                   
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"/>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"/>
                    <button className="  py-2 my-4 border-none bg-[#1A8CD8] text-white text-lg rounded-full ">{isLogin?"Login":"Create Account"}</button> </form>
                    <h1>{isLogin?"Do not have an account?":"Already have an account?"}<span onClick={loginSignupHandler} className="font-bold text-blue-600 cursor-pointer">{isLogin?" Signup":" Login"}</span></h1> 
                    </div>

        </div>
        </div>
    )
}
export default Login;