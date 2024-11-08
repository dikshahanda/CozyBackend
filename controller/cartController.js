require('dotenv').config();
const mongoose = require('mongoose');
const productSchema = require('../model/productSchema');
const userSchema = require('../model/CozySchema');
const Cart = require('../model/cartSchema')


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

        let cart = await Cart.findOne({ userId: userId });

        if (cart) {
            let itemIndex = cart.products.findIndex((p) => p.productId == productId);

            if (itemIndex > -1) {
                let productItem = cart.products[itemIndex];
                productItem.quantity += 1;
                cart.products[itemIndex] = productItem;
            } else {
                cart.products.push({ productId: productId, quantity: 1 });
            }
            cart = await cart.save();
            return res.status(200).send({ status: true, updatedCart: cart });
        } else {
            const newCart = await Cart.create({
                userId,
                products: [{ productId: productId, quantity: 1 }],
            });

            return res.status(201).send({ status: true, newCart: newCart });
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({'message':"Something went wrong"});
    }
}

const findcart= async(req, res)=>{
    try{
        const id = req.params.id;
        let cart = await Cart.findOne({ userId: id });
       return res.status(200).json(cart)
    }
    catch(error){
        return res.status(500).json({"error":error})
    }
} 

const decreaseCart = async (req, res, next)=>{
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

        let cart = await Cart.findOne({ userId: userId });

        if (!cart) {
            return res.status(200).json({ status: false, message: "Cart not found for this user", cart: [], });
        }


        let itemIndex = cart.products.findIndex((p) => p.productId == productId);

        if (itemIndex > -1) {
            let productItem = cart.products[itemIndex];
            if (productItem.quantity === 1) {
                cart.products.splice(itemIndex, 1);
                cart = await cart.save();
                return res.status(200).send({ status: true, updatedCart: cart });
            }
            productItem.quantity -= 1;
            cart.products[itemIndex] = productItem;
            cart = await cart.save();
            return res.status(200).send({ status: true, updatedCart: cart });
        }
        return res.status(400).json({ status: false, message: "Item does not exist in cart" });
    }
    catch(err){
        console.log(err)
        return res.status(500).json({'message':"Something went wrong"});
    }
}

module.exports = {cart, decreaseCart, findcart}

