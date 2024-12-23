const express = require('express');
const cartRouter = express.Router();
const {cart, decreaseCart, findcart} = require('../controller/cartController');
const {verifyToken} = require('../middleware/verifyToken');
const {isAdmin} = require('../middleware/checkRole');

// router.post('/login', verifyToken,isAdmin, login);

cartRouter.post('/',verifyToken,cart);
cartRouter.post('/decrease',verifyToken,decreaseCart);
cartRouter.get('/findcart/:id',verifyToken,findcart);
// cartRouter.get('/findproduct/:id',findproduct);
// cartRouter.delete('/deletebyId/:id',verifyToken,isAdmin,deletebyId);
// cartRouter.put('/upadtebyId/:id',verifyToken,isAdmin,upadtebyId);


module.exports = {cartRouter}