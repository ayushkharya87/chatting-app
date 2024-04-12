import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import toast from "react-hot-toast"

const SignUp = () => {

  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });

  const navigate = useNavigate();
  // checkbox
  const handleCheckbox =(gender) => {
    setUser({...user, gender})
  }

  // submit handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // post api
    try {
      const res = await axios.post(`http://localhost:5000/api/v1/user/register`, user, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      // console.log(res);
      if(res.data.success) {
        navigate("/login")
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    }
    // set empty after submit
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: ""
    })
  };

  return (
    <div className='min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center'>SignUp</h1>
        {/* form */}
        <form onSubmit={onSubmitHandler} action="">
          {/* full name */}
          <div>
            <label className='label p-1'>
            <span className='text-base label-text'>Full Name</span>
            </label>
            <input type="text" value={user.fullName} 
            onChange={(e) => setUser({...user, fullName: e.target.value})} className='w-full input input-bordered h-8' placeholder='Enter Your Full name'/>
          </div>
          {/* username */}
          <div>
            <label className='label p-1'>
            <span className='text-base label-text'>Username</span>
            </label>
            <input type="text" value={user.username}
            onChange={(e) => setUser({...user, username:e.target.value})}  className='w-full input input-bordered h-8' placeholder='Enter Your Username'/>
          </div>
          {/* password */}
          <div>
            <label className='label p-1'>
            <span className='text-base label-text'>Password</span>
            </label>
            <input type="password" value={user.password} 
            onChange={(e) => setUser({...user, password:e.target.value})} className='w-full input input-bordered h-8' placeholder='Enter a new Password'/>
          </div>
          {/* confirm password */}
          <div>
            <label className='label p-1'>
            <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input type="password" value={user.confirmPassword} 
            onChange={(e) => setUser({...user, confirmPassword:e.target.value})}
            className='w-full input input-bordered h-8' placeholder='Confirm Password'/>
          </div>
          {/* checkbox */}
          <div className='flex items-center my-4'>
            <div className='flex items-center'>
              <p>Male</p>
              <input
                type="checkbox"
                onChange={() => handleCheckbox("male")}
                checked={user.gender === "male"}
                defaultChecked
                className="checkbox mx-2" />
            </div>
            <div className='flex items-center'>
              <p>Female</p>
              <input
                type="checkbox"
                onChange={() => handleCheckbox("female")}
                checked={user.gender === "female"}
                defaultChecked
                className="checkbox mx-2" />
            </div>
          </div>
          <p className='text-center my-2'>Already have an account? <Link to="/login"> Login </Link></p>
          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>SingUp</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp