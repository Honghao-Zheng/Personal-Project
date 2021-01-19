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
const defaultPost="You have not written anything for the day.";

app.get("/",function(req,res){
  res.render("home");
});

app.get("/write",function(req,res){
  res.render("write",{day:todayDay,date:todayDate,post:""});
});

app.post("/write",function(req,res){

  const dateString=req.body.dateString;
  const numericDate=date.numericDate(dateString);
  const content=req.body.content;

  Post.findOne({date:numericDate},function(err,foundList){
    if(!err){
      if (!foundList){
        const post=new Post({
          date:numericDate,
          post:content
        });
        post.save();

      }else{
        foundList.post=content;
        foundList.save();
      }
    }
  });
res.redirect("/read/"+numericDate);
});



app.get("/manage", function(req,res){
  res.render("manage");
});

app.post("/mamage", function(req,res){
  const postDate=req.body.date;
  res.redirect("/read/"+postDate);
});



app.get("/read/:postDate",function(req,res){
  const numericDate=req.params.postDate;
  Post.findOne({date:numericDate},function(err,foundList){
    if (!err){
      if (!foundList){
        const newDiary=new Post({
          date:numericDate,
          post:defaultPost
        });
      newDiary.save();
      res.redirect("/read/"+numericDate);
    }else{
      const dateString=date.findDateString(numericDate).date;
      const weekday=date.findDateString(numericDate).weekday;
      res.render("read",{date:dateString, day:weekday, post:foundList.post});
    }
    }
  });
});

app.post("/read",function(req,res){
  const dateString=req.body.dateString;
  const numericDate=date.numericDate(dateString);
  Post.findOne({date:numericDate},function(err,foundList){
    if (!err){
      if (!foundList){
        console.log("did not find list");
      }else{
        const weekday=date.findDateString(numericDate).weekday;
        res.render("write",{date:dateString, day:weekday, post:foundList.post});
      }
    }
  });
});

app.listen(3000,function(){
  console.log("start server port 3000");
});
