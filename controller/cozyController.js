require('dotenv').config();
const mongoose = require('mongoose');
const CozyRegister = require('../model/CozySchema');
const JoiSchema = require('../Joi/JoiSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../logger/wistonLog')

const register = async (req, res, next)=>{
    try{
        const ChechUser = await CozyRegister.findOne({email:req.body.email});
        const userName=req.body.userName;
        const email=req.body.email;
        const password=req.body.password;
        const confirmPassword =req.body.confirmPassword;
        const result = JoiSchema.validate({userName, email, password, confirmPassword});
        console.log(result)
        if(result.error){
            return res.status(501).send({"error":result.error.details})
        }
        if(ChechUser){
        return res.status(500).json({"message":'Email already exist'})
       }
       else{
        const user = new CozyRegister(req.body);
        bcrypt.hash(user.password, 10, async function(err, hash){
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
            await user.save();
        });
        return res.status(200).json({message:"User register successfully"})
       }
    }
    catch(err){
        console.log(err)
        logger.error(err.message)
        return res.status(500).json({"Error":'Something went wrong'})
    }
} 

const login = async (req, res, next)=>{
    try{
        const user = await CozyRegister.findOne({userName:req.body.userName});
        if(!user){
            return res.status(501).json({"error":"Invalid Username and password"});
        }
        console.log(user);
        const IsValid = await bcrypt.compare(req.body.password,user.password);
        // console.log(req.body.password);
        // console.log(IsValid)
        if(!IsValid){
            return res.status(501).json({"error":"Please enter valid details"});
        }
        const token = jwt.sign({_id:user._id, role:user.role}, "abc",{expiresIn:'1h'} );
        console.log(token)
        return res.json({"token":token})
    }
    catch(err){
        console.log(err);
        logger.error(err.message);
        return res.status(500).json({"Message":"Try after some time"})
    }
}

module.exports = {register, login}