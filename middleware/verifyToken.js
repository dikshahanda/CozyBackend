require('dotenv').config();
const Jwt = require('jsonwebtoken');



const verifyToken = (req, res, next)=>{
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(500).json({Error:"No token provided"})
    }
    try{
        const decoded = jwt.verify(token, process.env.TOKEN);
        console.log(decoded);
        req.user = decoded;
        next()
    }
    catch(error){
        return res.status(500).json({error:'Invalid token'});
    }
};

module.exports = {verifyToken};

