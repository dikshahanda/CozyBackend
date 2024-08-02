require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = process.env.PORT;
const cors = require('cors');
const {router} = require('./routes/cozyRoutes')



console.log(process.env) // remove this after you've confirmed it is working

const CozyDatabase = process.env.DATABASE;
mongoose.connect(CozyDatabase);

app.use(cors());
app.use(express.json());

app.use('/api/v1',router)

app.listen(port, ()=>{
    console.log(`Server Started Successfully ${port}`)
})

