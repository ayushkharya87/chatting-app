import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:[`https://chatting-app-neon.vercel.app`, `https://chatting-app-git-master-ayush-kharyas-projects.vercel.app`,
    `https://chatting-gabqbi4er-ayush-kharyas-projects.vercel.app`,
    `https://chatting-app-ayush-kharyas-projects.vercel.app`
],
        methods:['GET', 'POST'],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

// set user online
const userSocketMap = {}; 

// connection
io.on('connection', (socket)=>{
    // console.log("Server connect");
    const userId = socket.handshake.query.userId
    if(userId !== undefined){
        userSocketMap[userId] = socket.id;
    } 

    //   send online user to frontend
    io.emit('getOnlineUsers',Object.keys(userSocketMap)); 

    // disconnect
    socket.on('disconnect', ()=>{
        delete userSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketMap));  // update the user is online or not
    })
})

export {app, io, server};

