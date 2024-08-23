/** @format */

import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import useGetProfile from "../hooks/useGetProfile";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { followingUpdate } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";
const Profile = () => {
  const { user, profile } = useSelector(store => store.user);
  const {id}= useParams();
  useGetProfile(id);
  const dispatch =useDispatch();
  const followAndUnfollowHandler= async ()=> {
  if(user.following.includes(id)){
  try{
    axios.defaults.withCredentials=true;
   const res=await axios.post(`${USER_API_END_POINT}/unfollow/${id}`,{id:user?._id});
   console.log(res);
   dispatch(followingUpdate(id));
   dispatch(getRefresh());
   toast.success(res.data.message);
  }catch(error){
    console.log(error);
    toast.success(error.response.data.message);
  }
  }else{
    try{
      axios.defaults.withCredentials=true;
     const res=await axios.post(`${USER_API_END_POINT}/follow/${id}`,{id:user?._id});
     console.log(res);
     dispatch(followingUpdate(id));
     dispatch(getRefresh());
     toast.success(res.data.message);
    }catch(error){
      console.log(error);
      toast.success(error.response.data.message);
    }

  }
  }
  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <div>
        <div className="flex items-center py-2">
          <Link
            to="/"
            className=" hover:bg-gray-100 rounded-full p-2 hover:cursor-pointer">
            <IoMdArrowBack size="24px" />
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            <p className="text-gray-500 text-sm">10 Posts</p>
          </div>
        </div>
        <img
          src="https://libg.s3.us-east-2.amazonaws.com/download/670/670-Its-Time-To-Program-Something.jpg"
          alt="banner"
        />
        <div className="absolute border-white rounded-full border-4 top-44 ml-2 ">
          <Avatar
            src="https://tse3.mm.bing.net/th?id=OIP.bO-zQIV9Am0E7-lA_mzlLwHaHa&pid=Api&P=0&h=180"
            size="100"
            round={true}
          />
        </div>
        <div className="text-right m-4">
          {
            profile?._id== user?._id ? (<button className="px-4 py-1 rounded-full border hover:border-gray-200  border-gray-400">
              Edit Profile
            </button>) :(<button onClick={followAndUnfollowHandler} className="px-4 py-1 bg-black rounded-full border  text-white ">
            {user.following.includes(id) ? "Following" : "Follow" }
          </button>)
          }
          
        </div>
        <div className="m-4">
          <h1 className="font-bold text-xl">{profile?.name}</h1>
          <p>{`@${profile?.username}`}</p>
        </div>
        <div className="text-sm m-4">
          <p>
            👉Coder by day, 👨‍💻student by night. Constantly debugging life's
            challenges. #TechEnthusiast #NeverStopLearning "In a world of
            algorithms, always be the coder of your own destiny."
          </p>
        </div>
      </div>
    </div>
  );
};
export default Profile;
