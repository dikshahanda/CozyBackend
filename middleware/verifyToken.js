require('dotenv').config();
const jwt = require('jsonwebtoken');



const verifyToken = (req, res, next)=>{
    const token = req.header('x-auth-token');
    const role = req.header('x-auth-role');
    console.log(token)
    if(!token){
        return res.status(500).json({Error:"No token provided"})
    }
    try{
        const decoded = jwt.verify(token, "abc");
        console.log(decoded);
        req.user = decoded;
        next()
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:'Invalid token'});
    }
};

module.exports = {verifyToken};

