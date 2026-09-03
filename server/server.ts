import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'

import meetingRoute from './routes/meeting.routes.js'
import authRoutes from "./routes/auth.routes.js";

const app = express();
const port = 8000;

app.use(express.json())
app.use(cors())
 await connectDB()

// app.use('/', (req, res)=>{
//     res.send("Welcome to Acme AI")
// })

app.use('/meet', meetingRoute)
app.use("/auth", authRoutes);

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})

