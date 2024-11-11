require('dotenv').config();
const mongoose = require('mongoose');
const productSchema = require('../model/productSchema');
const { response } = require('express');



// post request
const products = async (req, res) => {
    try {
        const product = new productSchema(req.body);
        // next();
        await product.save();
        console.log(product)
        return res.status(200).json({ "Message": "Product added successfully" })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ Message: 'Product not added' });
    }
}

// get request
const getproduct = async (req, res) => {
    try {
        // productSchema.paginate().then({});
        const { page, perpage } = req.query;
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(perpage, 10),
            sort: { createdAt: -1 },
        };

        productSchema.paginate({}, options).then(data => {
            return res.status(200).json(data);

        })
    }
    catch (error) {
        return res.status(500).json({ 'error': "Something went wrong" })
    }
}

//find by id
const findproduct = async (req, res) => {
    try {
        const id = req.params.id;
        productSchema.findById(id).then(response => {
            return res.status(200).json({ "product": response })
        })
    }
    catch (error) {
        return res.status(500).json({ "error": error })
    }
}

//find by id
const findProductsByPIDS = async (req, res) => {
    try {

        let productIds = [];
        let cartResponse = req.body.products || [];


        if (cartResponse.length <= 0) {
            return res.status(200).json({ status: false, _doc: [], message: "Sorry, Request Contains Empty", total: 0 });
        }

        // Step 1: Get all the IDS of products which are available for cart.
        cartResponse.forEach((element) => {
            productIds.push(element["productId"]);
        });

        console.log(productIds)

        //Step 2: Fetch products by using product ids.
        const productsByIds = await productSchema.find({ _id: { $in: productIds } });

        console.log(productsByIds)


        //Step 3: Mapping the Quantity to the products
        let result = await productsByIds.map((x) => {
            let itemData = cartResponse.find((item) => item.productId === x._id.toString());
            if (itemData) {
                x._doc.quantity = itemData.quantity;
                return x;
            }
        });


        //Step 4: Find the total of the cart  TODO:

        // Step 5 : Send the cart Reponse
        return res.status(200).json({ status: true, _doc: result});

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ "error": error })
    }
}

// delete by id

const deletebyId = async (req, res) => {
    try {
        const id = req.params.id;
        productSchema.findByIdAndDelete(id).then(response => {
            return res.status(200).json({ "Id deleted": response })
        })
    }
    catch (error) {
        return res.status(500).json({ "error": error })
    }
}

// update by id
const upadtebyId = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        productSchema.findByIdAndUpdate(id, body, { new: true }).then(response => {
            console.log(response)
            return res.status(200).json({ "message": "Updated successfully" });

        })
    }
    catch (err) {
        return res.status(500).json({ "error": err })
    }
}

module.exports = { products, getproduct, findproduct, deletebyId, upadtebyId, findProductsByPIDS };