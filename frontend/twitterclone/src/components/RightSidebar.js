/** @format */

import React from "react";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";


const RightSidebar = ({otherUsers}) => {
  return (
    <div className="w-[25%]">
      <div className="rounded-full outline-none bg-gray-100 flex items-center my-2 p-2 w-full ">
        <CiSearch size="20px" />
        <input
          type="text"
          placeholder="search"
          className="bg-transparent px-2"
        />
      </div>
      <div className="p-2 bg-gray-100 rounded-2xl p-4 my-4">
        <h1 className="font-bold text-lg">Who to follow</h1>
        {  
        otherUsers?.map((user) => {
          return (
            <div key={user?._id} className="flex justify-between items-center my-2">
              <div className="flex">
                <div>
                  <Avatar
                    src="https://tse3.mm.bing.net/th?id=OIP.bO-zQIV9Am0E7-lA_mzlLwHaHa&pid=Api&P=0&h=180"
                    size="40"
                    round={true}
                  />
                </div>
                <div className="ml-2">
                  <h1 className="font-bold">{user?.name}</h1>
                  <p className="text-sm">{`@${user?.username}`}</p>
                </div>
              </div>
              <div>
              <Link to={`/profile/${user?._id}`}>
              <button className="px-4 py-1 bg-black text-white rounded-full ml-14">
                Profile
              </button>
              </Link>
            
              </div>
            
            </div>
          )
        })}
      </div>
    </div>
  );
};
export default RightSidebar;
