import authRoutes from './routes/auth'
import express from 'express'
import cors from 'cors'
const app = express();
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
app.use(express.json())

app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use('/api/auth', authRoutes)
app.get('/api/abc', (req,res)=>{res.send({abc:'as'})})
app.use(cookieParser())
// app.use((req, res, next)=>{
//  // res.header('Access-Control-Allow-Origin')
//   next();
// })
mongoose.connect('mongodb://127.0.0.1:27017/TaskTracker')

app.listen(3002,()=>{
    console.log("Connected!")
})