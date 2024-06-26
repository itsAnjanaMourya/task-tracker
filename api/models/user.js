import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true, unique:true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    list: {type: Array, required: true}
})

const UserModel= mongoose.model('User', UserSchema)

export {UserModel as User}