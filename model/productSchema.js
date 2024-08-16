const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productschema = new mongoose.Schema({
    productname:{type:String, required:true},
    description:{type:String, required:true},
    productimage:{type:String, required:true},
    productprice:{type:Number, required:true},
    deliverycharges:{type:Number, default:"No delivery charges"}
})

productschema.plugin(mongoosePaginate);

module.exports = mongoose.model('productSchema', productschema)