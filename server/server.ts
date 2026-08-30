import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import meetingRoute from './routes/meeting.routes.js'

const app = express();
const port = 8000;
dotenv.config()

app.use(express.json())
app.use(cors())

// app.use('/', (req, res)=>{
//     res.send("Welcome to Acme AI")
// })

app.use('/meet', meetingRoute)

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})

