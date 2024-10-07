const mongoose=require("mongoose");
const { type } = require("os");
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model("users",userschema);