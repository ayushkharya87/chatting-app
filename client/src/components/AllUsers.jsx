import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from "react-redux"

const AllUsers = () => {
  // custom hook
  useGetOtherUsers();
  // select from redux store
  const { allUsers } = useSelector(store => store.user);
  if(!allUsers)  return;

  return (
    <div className='overflow-auto flex-1'>
        {
          allUsers?.map((user) => {
            return (
              <OtherUser key={user._id} user={user} />
            )
          })
        }
    </div>
  )
}

export default AllUsers