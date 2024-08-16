const { string } = require('joi');
const mongoose = require('mongoose');
const Email = require('mongoose-type-email');

const orderSchema = new mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId},
    username: {type: String,required: true},
    orderDate: {type: Date,default: Date.now},
    address:{type:String},
    email:{type:Email},
    phone:{type:Number},
    amount:{type:Number}
    // orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem'}]
  });
  
 module.exports = mongoose.model('orderSchema', orderSchema);
  
//   **Order Item Schema**