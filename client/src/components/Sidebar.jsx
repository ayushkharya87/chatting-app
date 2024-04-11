import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import AllUsers from './AllUsers';
import axios from "axios"
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAllUsers, setAuthUser } from '../redux/userSlice';

const Sidebar = () => {

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { allUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null))
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    const searchUser = allUsers?.find(((user) => user.fullName.toLowerCase().includes(search.toLowerCase())));
    if(searchUser) {
      dispatch(setAllUsers([searchUser]));
    } else {
      toast.error("User not found")
    }
  };

  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      {/* search */}
        <form onSubmit={searchHandler} action="" className='flex items-center gap-2'>
            <input type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
            className='input input-bordered rounded-md' placeholder='Search...' />
            <button type='submit' className='btn bg-zinc-700 text-white'><BiSearchAlt2  className='w-6 h-6 outline-none'/></button>
        </form>
        <div className="divider px-3"></div>
        <AllUsers />
        {/* logout btn */}
        <div className='mt-2'>
            <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
        </div>
    </div>
  )
}

export default Sidebar