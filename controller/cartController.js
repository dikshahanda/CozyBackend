require('dotenv').config();
const mongoose = require('mongoose');
const productSchema = require('../model/productSchema');
const userSchema = require('../model/CozySchema');
const CartSchema = require('../model/cartSchema')




const cart = async (req, res, next)=>{
    try{
        const userId = req.body.userId;
        let user = await userSchema.findOne({ _id: userId });

        if (!user) {
            return res
                .status(400)
                .send({ status: false, message: "Invalid user ID" });
        }

        let productId = req.body.productId;
        let product = await productSchema.findOne({ _id: productId });
        if (!product) {
            return res
                .status(400)
                .send({ status: false, message: "Invalid product" });
        }

        else{
            return res
                .status(200)
                .send({ status: true, message: "working" });
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({'message':"Something went wrong"});
    }
}

module.exports = {cart}

