import { User } from "../models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
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
        return res.status(201).json({message: "account created successfully", success: true})
    } catch (error) {
        console.log(error);
    }
};

// login 
const login = async (req, res) => {
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
    } catch (error) {
        console.log(error);
    }
}

export default register;