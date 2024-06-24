import authRoutes from './routes/auth'
import express from 'express'
const app = express();


app.use(express.json())
app.use('/api/auth', authRoutes)

app.get('/api/dummy', function (req, res) {
  console.log("get api success")
  res.send({'abc':'xyz'})
})


app.listen(3000,()=>{
    console.log("Connected!")
})