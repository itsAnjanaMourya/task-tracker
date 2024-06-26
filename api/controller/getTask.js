import jwt from "jsonwebtoken";
import {User} from '../models/user.js'
export const getTask = async(req,res)=>{
    const user = await User.findOne({email})

    if(user){
        
    }
    jwt.verify(req.body.token, "10",(err)=>{
        if(err) return res.status(403).json("Token is not valid!")
        })

        const {list} = req.body
        return res.status(200).json(list)

 }