import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express();
const port = 8000;
dotenv.config()

app.use(express.json())
app.use(cors())

app.use('/', (req, res)=>{
    res.send("Welcome to Acme AI")
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})

