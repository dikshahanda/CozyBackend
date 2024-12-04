require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = process.env.PORT;
const cors = require('cors');
const {router} = require('./routes/cozyRoutes');
const {productrouter} = require('./routes/productRoutes');
const {orderrouter} = require('./routes/orderRoutes');
const {uploadroute} = require('./routes/uploadroutes');
const {cartRouter} = require('./routes/cartRoutes');
var path=require('path');

const CozyDatabase = process.env.DATABASE;
mongoose.connect(CozyDatabase);

app.use(cors());
app.use(express.json());

// to read mode photo; publicily allow
app.use('/uploads', express.static('uploads'));
app.use('/api/auth',router);
app.use('/api/products',productrouter);
app.use('/api/orders',orderrouter );
app.use('/api/uploads', uploadroute);
app.use('/api/cart', cartRouter);
 
app.use(express.static(path.join(__dirname,'dist')));
app.use("/*", function(req, res){
    res.sendFile(path.join(__dirname+'/dist/index.html'))
})

app.listen(port, ()=>{
    console.log(`Server Started Successfully ${port}`)
})

