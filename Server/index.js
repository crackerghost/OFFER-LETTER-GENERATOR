const express = require('express')
const { router } = require('./routes/Auth')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const { connectDB } = require('./models/conn')
connectDB()
app.use(bodyParser.json())
app.use(cors());
app.use('/',router)


app.listen(3000,()=>{
    console.log("running")
})