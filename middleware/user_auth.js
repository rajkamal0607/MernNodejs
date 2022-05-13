const jwt = require("jsonwebtoken");
const users = require("../models/userSchema");
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });

// const auth = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '');
//         const data = jwt.verify(token, process.env.SECRET_KEY);
//         const user = await users.findOne({ _id: data._id })
       
//         if (!user) {
//             throw new Error()
//         }
//         req.user = user;
//         req.token = token;
//         next();
//     } catch (error) {
//         res.status(422).send({ statusCode: 422, message: "Not authorized to access this resource" })
//     }

// }

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt_cookie;
        const data = jwt.verify(token, process.env.SECRET_KEY);
        const user = await users.findOne({ _id: data._id, "token":token });
       
        if (!user) {
            throw new Error('User not found')
        }
        req.token = token;
        req.user = user;
        req.userID = user._id;
        next();
    } catch (error) {
        res.status(422).send("Not authorized to access this resource");
        console.log(error);
    }

}

module.exports = auth;