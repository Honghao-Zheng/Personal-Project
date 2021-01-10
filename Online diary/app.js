//jshint esversion:6
const express = require('express');
const ejs = require("ejs");
const bodyParse=require("body-parser");

const app=express();
app.set("view engine","ejs");
app.use(express.static("public"));



app.get("/",function(req,res){
  res.render("home");
});

app.get("/writting",function(req,res){
  res.render("writting");
});

app.listen(3000,function(){
  console.log("start server port 3000");
});
