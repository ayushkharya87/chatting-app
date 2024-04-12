import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]
}

// set user online
const userSocketMap = {}; // store user id

// connection
io.on("connection", (socket) => {
  // console.log("Server connect");
  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }

//   send online user to frontend
io.emit("getOnlineUsers", Object.keys(userSocketMap));

// disconnect
socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));  // update the user is online or not
})
});

export { app, server, io };
