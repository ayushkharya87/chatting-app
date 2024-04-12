import React, { useEffect } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client"
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

const App = () => {

  const {authUser} = useSelector(store => store.user);
  const {socket} = useSelector(store => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if(authUser) {
      const socketio = io("http://localhost:5000", {
        query: {
          userId: authUser._id     // get the socket.io user id
        }  
      });
      dispatch(setSocket(socketio));
      // receive online user from backend
      socketio?.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      });
      // disconnect
      return () => socketio.close();
    } else {
      if(socket) {
        socket.close()
        dispatch(setSocket(null))
      }
    }
  }, [authUser]);

  return (
    <div className='p-5 h-screen flex items-center justify-center'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;