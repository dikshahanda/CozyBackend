const mongoose = require('mongoose');
const Order =  require('../model/orderSchema');
const { response } = require('express');
const User = require('../model/CozySchema');
const Cart = require('../model/cartSchema');
const Product = require('../model/productSchema');
const { orderrouter } = require('../routes/orderRoutes');


// post order

// const customersOrder = async (req, res, next)=>{
//     try{
//         // For store full data in a varialbe
//         const order = new orderSchema(req.body);
//         await order.save();
//         return res.status(200).json({"message":"Order successfully"})
//     }
//     catch(err){
//         // If logic not work than error occured than this work
//         return res.status(500).json({"error":"Something went wrong"})
//     }
// }

const customersOrder = async (req, res, next)=>{
    try{
        let userId = req.body.userId;
        let productIds = [];
        let discount=0;


        let user = await User.exists({ _id: userId });

        if (!userId || !user) {
            return res
                .status(400)
                .send({ status: false, message: "Invalid user ID" });
        }

        let cart = await Cart.findOne({ userId: userId });
        console.log(cart);
        if (!cart) {
            return res
                .status(404)
                .send({ status: false, message: "Cart not found for this user" });
        } 
        
        else {


            //Get all the IDS of products which are available for cart.
            cart.products.forEach((element) => {
                productIds.push(element["productId"]);
            });

            console.log(productIds);

            //Fetch products by using product ids.
            const productsByIds = await Product.find({ _id: { $in: productIds } });

            console.log(productsByIds);


            //Mapping the Quantity to the products
            let result = await productsByIds.map((x) => {
                let itemData = cart.products.find(
                    (item) => item.productId === x._id.toString()
                );
                if (itemData) {
                    x._doc.quantity = itemData.quantity;
                    return x;
                }
            });

            console.log(result);

            //Find the Total of Products
            let totalPrice = result.reduce(function (accumulator, item) {
                return accumulator + item._doc.quantity * item._doc.productprice;
            }, 0);

            console.log(totalPrice)


            // Create a Order creation onject
            if (totalPrice && totalPrice > 0) {
                let orderDetails = {
                    userId: userId,
                    products: cart.products,
                    receiverName: req.body.receiverName,
                    amount: totalPrice,
                    discount: discount,
                    couponcode: req.body.couponcode || 'N/A',
                    email: req.body.email,
                    phone: req.body.phone,
                    pmode: req.body.pmode,
                    address: req.body.address,
                    status: req.body.status
                };

                const newOrder = new Order(orderDetails);
                const savedOrder = await newOrder.save();
                return res.status(200).json(savedOrder);
           }
}

}

catch(err){
    console.log(err)
    // If logic not work than error occured than this work
    return res.status(500).json({"error":"Something went wrong"})
}
    
}

// show data

const getorderdetails = async (req, res)=>{
    // try{
    //     await orderSchema.find().then(data=>{
    //         console.log(data)
    //         return res.status(200).json(data);
    //     })
    // }
    try {
        // productSchema.paginate().then({});
        const { page, perpage } = req.query;
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(perpage, 10),
            sort: { createdAt: -1 },
        };

        Order.paginate({}, options).then(data => {
            return res.status(200).json(data);

        })
    }
    catch(err){
        // If logic not work than error occured than this work
        console.log(err)
        return res.status(500).json({"error":"Something went wrong"})
    }
}

// Find by ID

const findorder =  async (req, res) => {
    try {
        const id = req.params.userId;
        console.log(id)
        Order.find({userId:id}).then(response => {
            return res.status(200).json({ "product": response })
        })
    }
    catch (error) {
        return res.status(500).json({ "error": error })
    }
}


// delete by ID

const deletebyid = async (req, res)=>{
    try{
        // store id into variable id
        const id = req.params.id;
        // for find order use deleteById method
        orderSchema.findOneAndDelete(id).then(response=>{
            return res.status(200).json({"Order deleted":response});
        })
    }
    catch(err){
        // If logic not work than error occured than this work
        return res.status(500).json({"error":"Something went wrong"})
    }
}


// update by ID

const updatebyid = async (req, res)=>{
    try{
        // store id into variable id
        const id = req.params.id;
        const body = req.body
        // for find order use updateById method
        orderSchema.findByIdAndUpdate(id , body, {new:true}).then(response=>{
            return res.status(200).json(response);
        })
    }
    catch(err){
        // If logic not work than error occured than this work
        return res.status(500).json({"error":"Something went wrong"})
    }
}

module.exports = {customersOrder, getorderdetails, findorder, deletebyid, updatebyid}
