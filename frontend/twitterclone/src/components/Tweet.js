import React from "react";
import Avatar from 'react-avatar';
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import { MdDelete } from "react-icons/md";
import { timeSlice } from "../utils/constant";



const Tweet = ({tweet})=>{
    const {user}=useSelector(store=>store.user);
    const dispatch =useDispatch();
    const likeorDislikeHandler = async (id) =>{
        try{
            const res =await axios.put(`${TWEET_API_END_POINT}/like/${id}`,{id:user?._id},{withCredentials:true});
            dispatch(getRefresh());
          
            toast.success(res.data.message);
            
            
        }
        catch(error){
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
    const deleteTweetHandler = async (id) =>{
        try{
            axios.defaults.withCredentials=true;
            const res =await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
            dispatch(getRefresh());
          
            toast.success(res.data.message);
            
            
        }
        catch(error){
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
    
    return (
        <div className="border-b border-gray-200">
            <div>
                <div className="flex p-4">
                <Avatar src="https://tse3.mm.bing.net/th?id=OIP.bO-zQIV9Am0E7-lA_mzlLwHaHa&pid=Api&P=0&h=180" size="40" round={true} />
                <div className="ml-2 w-full">
                    <div className="flex items-center">
                    <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
                    <p className="text-gray-500 text-sm ml-2">{`@${tweet?.userDetails[0]?.username} .${timeSlice(user?.createdAt)}`}</p>
                </div>
                <div>
                    <p>{tweet?.description}</p>
                </div>
                <div className="flex justify-between my-2">
                    <div className="flex items-center">
                        <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                        <FaRegComment size="20px"/>
                        </div>
                        
                        <p>0</p>
                    </div>
                    <div className="flex items-center">
                    <div onClick={() => likeorDislikeHandler(tweet?._id)} className="p-2 hover:bg-pink-200 rounded-full cursor-pointer">
                        <CiHeart size="20px" />
                        </div>
                        <p>{tweet?.like?.length}</p>
                    </div>
                    <div className="flex items-center">
                    <div className="p-2 hover:bg-yellow-200 rounded-full cursor-pointer">
                        <CiBookmark size="20px"/>
                        </div>
                        <p>0</p>
                    </div>
                    {
                        user?._id==tweet?.userId &&(   <div className="flex items-center">
                            <div onClick={()=>deleteTweetHandler(tweet?._id)} className="p-2 hover:bg-yellow-200 rounded-full cursor-pointer">
                                <MdDelete  size="20px"/>
                                </div>
                            </div>)
                    }

                 

                </div>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Tweet;