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
  day:String,
  post:String
};



const Post=mongoose.model("Post",postsSchema);
const defaultPost="You have not written anything for the day.";

app.get("/",function(req,res){
  res.render("home");
});

app.get("/writting",function(req,res){
  res.render("writting",{day:todayDay,date:todayDate});
});

app.post("/writting",function(req,res){
  const post=new Post({
    date:req.body.numericDate,
    day:date.findWeekday(req.body.numericDate),
    post:req.body.content
  });
  post.save();
  res.render("writting",{day:todayDay,date:todayDate});
});



app.get("/managing", function(req,res){
  res.render("managing");
});

app.post("/mamaging", function(req,res){
  const postDate=req.body.date;
  res.redirect("/reading/"+postDate);
});



app.get("/reading/:diaryDate",function(req,res){
  const diaryDate=req.params.diaryDate;
  Post.findOne({date:diaryDate},function(err,foundList){
    if (!err){
      if (!foundList){
        const newDiary=new Post({
          date:diaryDate,
          day:date.findWeekday(diaryDate),
          post:defaultPost
        });
      newDiary.save();
      res.redirect("/reading/"+diaryDate);
    }else{
      res.render("reading",{date:foundList.date, day:foundList.day, post:foundList.post});
    }
    }
  });
});

app.post("/reading",function(req,res){
  const diaryDate=req.params.date;
});

app.listen(3000,function(){
  console.log("start server port 3000");
});
