//jshint esversion:6
const express = require('express');
const ejs = require("ejs");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");
const mongoose=require("mongoose");


const app=express();
app.set("view engine","ejs");
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/diaryDB",{useNewUrlParser: true ,useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended:true}));


let todayDay=date.getDay();
let todayDate=date.getDate();
const postsSchema={
  date:String,
  post:String
};

const Post=mongoose.model("Post",postsSchema);


app.get("/",function(req,res){
  res.render("home");
});

app.get("/writting",function(req,res){
  res.render("writting",{day:todayDay,date:todayDate});
});

app.post("/writting",function(req,res){
  console.log(req.body.content);
  console.log(req.body.todayDate);
  const post=new Post({
    date:req.body.numericDate,
    post:req.body.content
  });
  post.save();
  res.render("writting",{day:todayDay,date:todayDate});
});

app.get("/mamaging", function(req,res){
  res.render("managing");
});

app.post("/mamaging", function(req,res){
  
});


app.listen(3000,function(){
  console.log("start server port 3000");
});
