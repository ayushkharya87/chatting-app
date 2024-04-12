// Authentication middleware
import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({message: "User not Authenticated"});
        };
        // verify token
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(!decode) {
            return res.status(401).json({message: "Invalid token"});
        };
        // store the id of logged in user
        req.id = decode.userId
        next();
    } catch (error) {
        console.log(error);
    }
};

export default isAuth;

const req = {
    id:"",
}
req.id = "ayush"