const mongoose = require('mongoose')

 const noteSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true ,"User account already exist"]
    },
    password:String,
})

const userModel = mongoose.model('users' , noteSchema)


module.exports = userModel