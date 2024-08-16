const express = require('express');
const router = express.Router();
const {register, login} = require('../controller/cozyController');
const {products} = require('../controller/productController');
const {verifyToken} = require('../middleware/verifyToken');
const {isAdmin} = require('../middleware/checkRole');

router.post('/register', register);
// router.post('/login', verifyToken,isAdmin, login);
router.post('/login', login);
// router.post('/product',products);

module.exports = {router}