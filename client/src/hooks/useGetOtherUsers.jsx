import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import {setAllUsers} from "../redux/userSlice.js"

const useGetOtherUsers = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:5000/api/v1/user/`);
                // console.log(res);
                // store all users in redux
                dispatch(setAllUsers(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllUsers();
    }, []);
}

export default useGetOtherUsers