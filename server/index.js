import express from "express"; 
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
dotenv.config({});

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    // origin:'http://localhost:3000',
    origin:[`https://chatting-app-neon.vercel.app`, `https://chatting-app-git-master-ayush-kharyas-projects.vercel.app`,
    `https://chatting-gabqbi4er-ayush-kharyas-projects.vercel.app`,
    `https://chatting-app-ayush-kharyas-projects.vercel.app`
],
    credentials:true
};
app.use(cors(corsOption)); 

// routes
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
 
app.get("/", (req, res) => {
    res.send("hello")
})

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at prot ${PORT}`);
});

