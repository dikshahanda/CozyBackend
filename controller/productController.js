require('dotenv').config();
const mongoose = require('mongoose');

const products = async (req, res, next)=>{
    try{
        return res.status(200).json({Message:'Hello World'});
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Message:'Product not added'});
    }
}

module.exports = {products};