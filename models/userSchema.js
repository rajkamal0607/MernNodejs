const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { save } = require("debug/src/node");

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
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function() {
    try {
        const token = jwt.sign({email:this.email.toString()}, "hellomynameisrajkamalsenandiamfine");
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (error) {
        res.send(error);
    }
}

const users = new mongoose.model("users", userSchema);

module.exports = users;