const users = require("../models/userSchema");


// router.get("/",(req,res)=>{
//     console.log("connect");
// });

// register user data

const postUserdata = async (req,res)=>{
    // console.log(req.body);
    const {name,email,tech,password} = req.body;

    if(!name || !email || !tech || !password)
    {
        res.status(422).json("please fill the data");
    }

    try{
        const preuser = await users.findOne({email:email});
        console.log(preuser);

        if(preuser){
            res.status(422).json("this user is already present");
        }else{
            const adduser = new users({
                name,email,tech,password
            });

            const token  = await adduser.generateAuthToken();
            console.log(token);

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }
    }catch(err){
        res.status(422).json(err);
    }
};

// get user data

const getUserdata = async (req,res)=>{
    try{
        const userdata = await users.find();
        res.status(201).json(userdata);
        console.log(userdata);
    }catch(err){
        res.status(422).json(err);
    }
};


// get individual user data

const getOwndata = async (req,res) => {
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual);
    } catch (err) {
        res.status(422).json(err);
    }
};

//update user data

const updateUserdata = async (req,res) => {
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate({_id:id},req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);
    } catch (err) {
        res.status(422).json(err);
    }
};

// delete user

const deleteUserdata = async (req,res) => {
    try {
        const {id} = req.params;

        const deluser = await users.findByIdAndDelete({_id:id});

        console.log(deluser);
        res.status(201).json(deluser);
    } catch (err) {
        res.status(422).json(err);
    }
};

// user login

const userlogin = async (req,res) => {
    try {
        const {email,password} = req.body;
        const useremail = await users.findOne({email:email});

        if(useremail.password == password){
            res.status(201).json("Login Successful");
            console.log("Login Successful");
        }else{
            res.status(422).json("Invalid Login Credentials");
        }
    } catch (error) {
        res.status(422).json(error);
    }
};

module.exports = {postUserdata,getUserdata,getOwndata,updateUserdata,deleteUserdata,userlogin};