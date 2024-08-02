const mongoose = require('mongoose');

const registerUser = new mongoose.Schema({
    userName:{type:String, required:true, unique:true},
    email: { type: String, required: true, unique: true, lowercase: true},
    password: { type: String, required: true},
    confirmPassword: { type: String, required: true}, 
    role:{ type: String, required: true, default:'user'}
});

module.exports = mongoose.model('cozyRegister', registerUser)


// const cozyRegisterSchema = new mongoose.Schema({
//   // Define your schema here
//   name: String,
//   email: String,
//   password: String
// });

// const CozyRegister = mongoose.model('userschema', cozyRegisterSchema);

// module.exports = CozyRegister;