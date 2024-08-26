require('dotenv').config();
const mongoose = require('mongoose');
const productSchema = require('../model/productSchema');
const userSchema = require('../model/CozySchema');
const CartSchema = require('../model/cartSchema')




const cart = async (req, res, next)=>{
    try{
        const userid = req.body.userId;
        console.log(userid)
        userSchema.findById(userid).then(response=>{
            if(!response){
                return res.status(200).json({'message':"user not found"});
            }
        })
        // const Checkuser =await userSchema.findOne({_id:userid});
        // console.log(Checkuser)
        // if(!Checkuser){
        //     return res.status(200).json({'message':"user not found"});
        // }
        const productid = req.body.productId;
        console.log(productid)
        productSchema.findById(productid).then(response=>{
            if(!response){
                return res.status(200).json({'message':"product not found"});
            }
        })
        // const checkproduct =await productSchema.findOne({_id:productid})
        // if(!checkproduct){
        //     return res.status(200).json({'message':"product not found"});
        // }
        // const checkcart = await productSchema.findOne({_id:userid});
        // if(checkcart){
        //     return res.status(200).json({'message':"cart not found"});
        // }
        // else{
        //     const newCart = await CartSchema.create({ userId: userid,
        //         products: [{
        //             productId: {  productid},
        //             quantity: 1,
        //         } ]})
        // }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({'message':"Something went wrong"});
    }
}

module.exports = {cart}

