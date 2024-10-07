const express=require('express');
const app=express();
const port=5000;
const bodyparser=require('body-parser')
app.set("view engine","ejs");
const mongoose=require("mongoose");
mongoose.connect('mongodb+srv://rvinayreddy1234:ktBp8Qw6IsXiozCA@test-pro-db.6leoq.mongodb.net/?retryWrites=true&w=majority&appName=test-pro-db');
const db=mongoose.connection;
const bcrypt=require("bcryptjs");
db.once("open",()=>{
  console.log("successfully connected to db");
})
const user=require("./models/user")
db.on("error",(error)=>{
  console.log(error)
})
const urlencoded=bodyparser.urlencoded({extended:true})
app.get("/signin",(req,res)=>{
  res.render("signin");
})
app.get("/signup",(req,res)=>{
res.render("signup");
})
app.post("/signup",urlencoded,async(req,res)=>{
  console.log(req.body.name)
  console.log(req.body.email)
  console.log(req.body.password)
 const {name,email,password:plaitextpassword}=req.body;
  const salt= await bcrypt.genSalt(10);
  const encryptedpassword=await bcrypt.hashSync(plaitextpassword,salt);
  try{
      await user.create({
          name,
          email,
          password:encryptedpassword
      })
      res.redirect("signin");
  }catch(error){
      console.log(error);
  }

})
app.listen(port,()=>{
  console.log(`server is listining at port:${port}`)
})


