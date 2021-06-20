//jshint esversion:6
const express = require('express');
const ejs = require("ejs");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");
const mongoose=require("mongoose");
// const session = require('express-session');
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");

const app=express();
app.set("view engine","ejs");
app.use(express.static("public"));
// app.use(session({
//   secret: "Our little secret.",
//   resave: false,
//   saveUninitialized: false
// }));
// //
// // app.use(passport.initialize());
// // app.use(passport.session());
//
mongoose.connect("mongodb://localhost:27017/diaryDB",{useNewUrlParser: true ,useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended:true}));
let todayDate=date.numericDate(date.getDate());
//
//
const postsSchema=new mongoose.Schema ({
  date:String,
  post:String
});
// // const userSchema = new mongoose.Schema ({
// //   username:String,
// //   password: String,
// //   secrets:[postsSchema]
// //
// // });
// //
// // userSchema.plugin(passportLocalMongoose);
// //
// // const User = new mongoose.model("User", userSchema);
// // passport.use(User.createStrategy());
// //
// // passport.serializeUser(function(user, done) {
// //   done(null, user.id);
// // });
// //
// // passport.deserializeUser(function(id, done) {
// //   User.findById(id, function(err, user) {
// //     done(err, user);
// //   });
// // });
//
//
const Post=mongoose.model("Post",postsSchema);

const defaultPost="You have not written anything for the day.";

app.get("/",function(req,res){
  res.render("home");
});

app.get("/write",function(req,res){
  res.redirect("/write/"+todayDate);
});

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/register",function(req,res){
  res.render("register");
});




app.get("/about", function(req,res){
  res.render("about");
});

app.get("/contact", function(req,res){
  res.render("contact");
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

app.get("/write/:postDate",function(req,res){
 const numericDate=req.params.postDate;
   Post.findOne({date:numericDate},function(err,foundList){
     if (!err){
       if (!foundList){
         console.log("not found list");
         const newDiary=new Post({
           date:numericDate,
           post:""
         });
       newDiary.save();
       res.redirect("/write/"+numericDate);
       }else{
         const weekday=date.findDateString(numericDate).weekday;
         const dateString=date.findDateString(numericDate).date;
         res.render("write",{date:dateString, day:weekday, post:foundList.post});
       }
     }
   });
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


app.post("/mamage", function(req,res){
  const postDate=req.body.date;
  res.redirect("/read/"+postDate);
});




app.post("/read",function(req,res){
     const dateString=req.body.dateString;
     const numericDate=date.numericDate(dateString);
     res.redirect("/write/"+numericDate);
   });






app.listen(3000,function(){
  console.log("start server port 3000");
});
