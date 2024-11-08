require('dotenv').config();
const mongoose = require('mongoose');
const productSchema = require('../model/productSchema');
const { response } = require('express');



// post request
const products = async (req, res)=>{
    try{
        const product = new productSchema(req.body);
        // next();
        await product.save();
        console.log(product)
        return res.status(200).json({"Message":"Product added successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Message:'Product not added'});
    }
}

// get request
const getproduct = async (req, res)=>{
    try{
        // productSchema.paginate().then({});
        const { page, perpage } = req.query;
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(perpage, 10),
            sort: { createdAt: -1 },
        };  

        productSchema.paginate({}, options).then(data=>{
            return res.status(200).json(data);

        })
    }
    catch(error){
        return res.status(500).json({'error':"Something went wrong"})
    }
}

//find by id
const findproduct= async(req, res)=>{
    try{
        const id = req.params.id;
        productSchema.findById(id).then(response=>{
            return res.status(200).json({"product":response})
        })
    }
    catch(error){
        return res.status(500).json({"error":error})
    }
} 

//find by id
const findProductsByPIDS= async(req, res)=>{
    try{
        const pids = req.body.product_pids;
        console.log(pids)
        const products = await productSchema.find({ _id: { $in: pids } });
        return res.status(200).json(products);

    }
    catch(error){
        return res.status(500).json({"error":error})
    }
} 

// delete by id

const deletebyId = async (req, res )=>{
    try{
        const id = req.params.id;
    productSchema.findByIdAndDelete(id).then(response=>{
        return res.status(200).json({"Id deleted":response})
    })
    }
    catch(error){
        return res.status(500).json({"error":error})
    }
}

// update by id
const upadtebyId = async (req, res)=>{
    try{
        const id = req.params.id;
        const body = req.body;
        productSchema.findByIdAndUpdate(id, body, {new:true}).then(response=>{
            console.log(response)
            return res.status(200).json({"message":"Updated successfully"});

        })
    }
    catch(err){
        return res.status(500).json({"error":err})
    }
}

module.exports = {products, getproduct, findproduct, deletebyId, upadtebyId, findProductsByPIDS};