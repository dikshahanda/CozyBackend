const express = require('express');
const productrouter = express.Router();
const {products, getproduct, findproduct, deletebyId, upadtebyId, findProductsByPIDS} = require('../controller/productController');
const {verifyToken} = require('../middleware/verifyToken');
const {isAdmin} = require('../middleware/checkRole');
const productSchema = require('../model/productSchema');

// router.post('/login', verifyToken,isAdmin, login);

productrouter.post('/product',verifyToken,isAdmin,products);
productrouter.get('/getproduct',getproduct);
productrouter.get('/findproduct/:id',findproduct);
productrouter.post('/findpids',findProductsByPIDS);
productrouter.delete('/deletebyId/:id',verifyToken,isAdmin,deletebyId);
productrouter.put('/upadtebyId/:id',verifyToken,isAdmin,upadtebyId);


module.exports = {productrouter}