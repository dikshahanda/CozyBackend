const mongoose = require('mongoose');
const orderSchema =  require('../model/orderSchema');
const { response } = require('express');


// post order

const customersOrder = async (req, res, next)=>{
    try{
        // For store full data in a varialbe
        const order = new orderSchema(req.body);
        await order.save();
        return res.status(200).json({"message":"Order successfully"})
    }
    catch(err){
        // If logic not work than error occured than this work
        return res.status(500).json({"error":"Something went wrong"})
    }
}

// show data

const getorderdetails = async (req, res)=>{
    try{
        await orderSchema.find().then(data=>{
            return res.status(200).json(data);
        })
    }
    catch(err){
        // If logic not work than error occured than this work
        return res.status(500).json({"error":"Something went wrong"})
    }
}

// Find by ID

const findorder = async (req, res)=>{
    try{
        // store id into variable id
        const id = req.params.id;
        // for find order use findById method
        orderSchema.findById(id).then(response=>{
            return res.status(200).json(response);
        })
    }
    catch(err){
        // If logic not work than error occured than this work
        return res.status(500).json({"error":"Something went wrong"})
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
