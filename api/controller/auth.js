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
        return res.json({message: "user already exist"})
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
       email,
       password: hashPassword 
    })
    await newUser.save();
    await res.json({status: true, message: "record registered"})

}
export const login = async (req,res)=>{
    console.log(process.env.NODE_ENV_KEY)
    const {email, password} = req.body;
    const user = await User.findOne({email})

    if(!user){
        return res.json({message: "user not already exist"})
    }
    const validPassword = await bcrypt.compare(password, user.password)
    
     if(!validPassword){
        return res.json({message: "incorrect password"})
    }

    const token = jwt.sign({name: user.name}, `${process.env.NODE_ENV_KEY}`, {expiresIn: '1h'})
    res.cookie('token', token, {httpOnly:true, maxAge: 360000})
     await res.json({status: true, message: "Login successful"})
}