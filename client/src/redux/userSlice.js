import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: null,
        allUsers: null,
        selectedUser: null,
        onlineUsers: null
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload
        },
        setAllUsers: (state, action) => {
            state.allUsers = action.payload
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        }
    }
});

export const { setAuthUser, setAllUsers, setSelectedUser, setOnlineUsers } = userSlice.actions;

export default userSlice.reducer;