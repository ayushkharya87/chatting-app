import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';

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
  return (
    <div className='p-5 h-screen flex items-center justify-center'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App