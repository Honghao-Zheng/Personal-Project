//jshint esversion:6
const express = require('express');
const ejs = require("ejs");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");
const mongoose=require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app=express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/diaryDB",{useNewUrlParser: true ,useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended:true}));


let todayDate=date.numericDate();

const postsSchema={
  date:String,
  post:String
};
const userSchema = new mongoose.Schema ({
  secrets:[postsSchema]
});

userSchema.plugin(passportLocalMongoose);
const Post=new mongoose.model("Post",postsSchema);
const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



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

app.get("/manage",function(req,res){
  if (!req.isAuthenticated){
    res.redirect("/login");
  } else {
    res.render("manage");
  }
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
  const weekday=date.findDateString(numericDate).weekday;
  const dateString=date.findDateString(numericDate).date;
  postExist=false;
  if (!req.isAuthenticated()){
    res.redirect("/login");
  } else {
     const userID=req.user.id;
     User.findById(userID,function(err,foundUser){
       if (err){
         console.log(err);
       } else{
         if (!foundUser){
           console.log("cannot find user");
         }else{
           let allPosts=foundUser.secrets;
           if (allPosts.length !==0){
             allPosts.forEach(postOfTheDay=>{
               if (postOfTheDay.date===numericDate){
                 postExist=true;
                 res.render("read",{stringDate:dateString, day:weekday, post:postOfTheDay.post,numericDate:numericDate});
               }
             });
           }
           if(!postExist){
                  const newDiary=new Post({
                    date:numericDate,
                    post:defaultPost
                  });
                  foundUser.secrets.push(newDiary);
                foundUser.save();
                res.render("read",{stringDate:dateString, day:weekday, post:newDiary.post,numericDate:numericDate});
              }

         }
       }
     });
  }

});

app.get("/write/:postDate",function(req,res){
 const numericDate=req.params.postDate;
 let postExist=false;
 const weekday=date.findDateString(numericDate).weekday;
 const dateString=date.findDateString(numericDate).date;
 if (!req.isAuthenticated()){
   res.redirect("/login");
 }else{
 const userID=req.user.id;
 User.findById(userID,function(err,foundUser){
   if (err){
     console.log(err);
   } else{
     if (!foundUser){
       console.log("cannot find user");
     }else{
       let allPosts=foundUser.secrets;
       if (allPosts.length !==0){
         allPosts.forEach(postOfTheDay=>{
           if (postOfTheDay.date===numericDate){
             postExist=true;
             res.render("write",{stringDate:dateString, day:weekday, post:postOfTheDay.post,numericDate:numericDate });
           }
         });
       }
       if(!postExist){
              const newDiary=new Post({
                date:numericDate,
                post:""
              });
              foundUser.secrets.push(newDiary);
            foundUser.save();
            res.render("write",{stringDate:dateString, day:weekday, post:newDiary.post,numericDate:numericDate});
          }

     }
   }
 });
}
});


app.post("/register", function(req, res){
  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.render("register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/");
      });
    }
  });
});


app.post("/login", function(req, res){
    const user=new User({
      username:req.body.username,
      password:req.body.password
    });
    req.login(user,function(err){
      if (err){
        console.log(err);
        res.redirect("/login");
      }else{
        passport.authenticate("local")(req,res,function(){
          res.redirect("/");
        });
      }
    });
});

app.post("/write",function(req,res){
  const numericDate=req.body.numericDate.slice(0,10);
  const content=req.body.content;
  const userID=req.user.id;
  User.findById(userID,function(err,foundUser){
    if (err){
      console.log(err);
    } else{
      if (!foundUser){
        console.log("cannot find user");
      }else{
        let allPosts=foundUser.secrets;
          allPosts.forEach(postOfTheDay=>{
            if (postOfTheDay.date===numericDate){
              postOfTheDay.post=content;
              foundUser.save();
              res.redirect("/read/"+numericDate);
            }
          });

      }
    }
  });
});


app.post("/manage", function(req,res){
  const postDate=req.body.numericDate;
  res.redirect("/read/"+postDate);
});




app.post("/read",function(req,res){
     const numericDate=req.body.numericDate.slice(0,10);
     res.redirect("/write/"+numericDate);
   });






app.listen(3000,function(){
  console.log("start server port 3000");
});
