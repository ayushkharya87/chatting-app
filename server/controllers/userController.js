import { User } from "../models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register
export const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({message: "All fields are required!"})
        }

        if(password !== confirmPassword) {
            return res.status(400).json({message: "Password don't match"})
        }

        const user = await User.findOne({username})
        if(user) {
            return res.status(400).json({message: "User already exist!"})
        }
        // hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // profile photo - placeholder avtar
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({ 
            fullName, 
            username, 
            password:hashedPassword, 
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto, 
            gender 
        });
        return res.status(201).json({message: "Account Created Successfully!", success: true})
    } catch (error) {
        console.log(error);
    }
};

// login 
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({message: "All fields are required"})
        };
        // find user
        const user = await User.findOne({username})
        if(!user) {
            return res.status(400).json({message: "Incorrect Username or Password", success: false})
        }
        // password match
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({message: "Incorrect Username or Password", success: false})
        }
        // generate jwt token
        const tokendata = {
            userId: user._id
        }
        const token = await jwt.sign(tokendata, process.env.JWT_SECRET_KEY, {expiresIn: "2d"});
        // send token to cookie
        return res.status(200).cookie("token", token, {maxAge: 2*24*60*60*1000, httpOnly: true, sameSite: 'strict' }).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto
        });
    } catch (error) {
        console.log(error);
    }
}

// logout
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({message: "logged Out"})
    } catch (error) {
        console.log(error);
    }
};

// show other users
export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
    }
}
