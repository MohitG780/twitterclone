/** @format */

import React from "react";
import { GoHomeFill } from "react-icons/go";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { IoBookmarkSharp } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_END_POINT } from "../utils/constant";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";
const LeftSidebar = () => {
    const { user } = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch =useDispatch();
     const logoutHandler=async ()=> {
      try{
        const res = await axios.get(`${USER_API_END_POINT}/logout`)
        dispatch(getUser(null));
        dispatch(getOtherUsers(null));
        dispatch(getMyProfile(null));
        toast.success(res.data.message);
        navigate("/login");
      }catch(error){
        console.log(error);
      }
     }
  return (
    <div className="w-[20%]">
      <div>
        <div>
          <img
            width={"128px"}
            src="https://tse2.mm.bing.net/th?id=OIP.1lm9KjprReA8-CMRPriawgAAAA&pid=Api&P=0&h=180"
            alt="twitter-logo"
          />
        </div>
        <div className="my-4">
          <Link
            to="/"
            className="flex items-center my-2 px-4 py-2  hover:bg-gray-100 hover:cursor-pointer  rounded-full">
            <GoHomeFill size="24px" />
            <div className="font-bold  text-lg ml-2">Home </div>
          </Link>

          <div className="flex items-center my-2 px-4 py-2  hover:bg-gray-100 hover:cursor-pointer  rounded-full">
            <CiHashtag size="24px" />
            <div className="font-bold  text-lg ml-2">Explore</div>
          </div>

          <div className="flex items-center my-2 px-4 py-2  hover:bg-gray-100 hover:cursor-pointer  rounded-full">
            <IoIosNotificationsOutline size="24px" />
            <div className="font-bold  text-lg ml-2">Notifications</div>
          </div>

          <Link
            to={`/profile/${user?._id}`}
            className="flex items-center my-2 px-4 py-2  hover:bg-gray-100 hover:cursor-pointer  rounded-full">
            <CiUser size="24px" />
            <div className="font-bold  text-lg ml-2">Profile</div>
          </Link>

          <div className="flex items-center my-2 px-4 py-2  hover:bg-gray-100 hover:cursor-pointer  rounded-full">
            <IoBookmarkSharp size="24px" />
            <div className="font-bold  text-lg ml-2">Bookmarks</div>
          </div>

          <div onClick={logoutHandler} className="flex items-center my-2 px-4 py-2  hover:bg-gray-100 hover:cursor-pointer  rounded-full">
            <RiLogoutCircleRLine size="24px" />
            <div className="font-bold  text-lg ml-2">Logout</div>
          </div>

          <button className=" px-4 py-2 border-none bg-[#1A8CD8] text-white font-bold w-full rounded-full">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
export default LeftSidebar;
