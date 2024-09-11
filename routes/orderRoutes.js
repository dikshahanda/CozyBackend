const express = require('express');
const orderrouter = express.Router();
const {customersOrder, getorderdetails, findorder,deletebyid, updatebyid} = require('../controller/orderController');
const {verifyToken} = require('../middleware/verifyToken');
const {isAdmin} = require('../middleware/checkRole');

// router.post('/login', verifyToken,isAdmin, login);

// orderrouter.post('/',verifyToken,isAdmin,customersOrder);
orderrouter.post('/create',verifyToken,isAdmin,customersOrder);
orderrouter.get('/',getorderdetails);
orderrouter.get('/find/:id',findorder);
orderrouter.delete('/:id',verifyToken,isAdmin,deletebyid);
orderrouter.put('/:id',verifyToken,isAdmin,updatebyid);


module.exports = {orderrouter}