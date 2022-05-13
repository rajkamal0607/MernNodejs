const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    tech: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    token: {
        type: String,
        default: ''
    }
});

userSchema.methods.generateAuthToken = async function () {
    try {
        const users = this
        const token = jwt.sign({ _id: users._id }, process.env.SECRET_KEY);
        users.token = token;
        await users.save();
        return token;
    } catch (error) {
        res.send(error);
    }
}

const users = new mongoose.model("users", userSchema);

module.exports = users;