import {User} from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';
dotenv.config();

export const register = async (req,res)=>{
    console.log("ggh")
    const {name, email, password} = req.body;
    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({message: "user already exist"})
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
       email,
       password: hashPassword 
    })
    await newUser.save();
    await res.status(201).json({status: true, message: "record registered"})

}
export const login = async (req,res)=>{
    console.log(process.env.NODE_ENV_KEY)
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({message: "user not already exist"})
    }
    const validPassword = await bcrypt.compare(password, user.password)
    
     if(!validPassword){
        return res.status(401).json({message: "incorrect password"})
    }

    const token = jwt.sign({name: user.name}, process.env.NODE_ENV_KEY, {expiresIn: '1h'})
    res.cookie('token', token, {httpOnly:true, maxAge: 360000})
     await res.json({status: true, message: "Login successful", email:user.email, name:user.name, list:user.list})
}


export const logout = (req,res)=>{
    res.clearCookie("access_token", {
        sameSite:"none",
        secure:true
    }).status(200).json({signout:true,message:"User has been logged out."})
console.log(res)
};

export const myTask = async(req,res)=>{
    const {email} = req.body;
    const list = req.body.list;
    const user = await User.findOne({email})

    user.list = list;
    console.log("list to db",user.list)
    await user.save()

    const currentUser = await User.findOne({email})
    console.log("list from db",currentUser.list)

    await res.json({status: true, message: "user task..",list:currentUser.list})
}

export const getTask = async(req,res)=>{
    const user = await User.findOne({email})
    const list = user.list;
    console.log("zjdhdbhj",list)
    await res.json({status: true, message: "user task getting from db",list:list})
}