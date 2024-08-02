const { message } = require("../Joi/JoiSchema")

const isAdmin = (req, res, next)=>{
    if(!req.user){
        return res.status(500).json({message:'unauthorized'});
    }
    if(req.user.role !== 'admin'){
        return res.status(500).json({message:'unauthorized'});
    }
}

module.exports = {isAdmin};