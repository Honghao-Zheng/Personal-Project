const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
// const User = require("./user");
//----------------------------------------- END OF IMPORTS---------------------------------------------------
mongoose.connect(
  "mongodb://localhost:27017/diaryDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors(
    {
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  }
  )
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());


const diary={
  date:String,
  diary:String
};
const user = new mongoose.Schema ({
  username: String,
  password: String,
  secrets:[diary]
});

// const user = new mongoose.Schema({
//   username: String,
//   password: String,
// });
user.plugin(passportLocalMongoose);
const Diary=new mongoose.model("Diary", diary);
const User = new mongoose.model("User", user);


passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");

      });
    }
  })(req, res, next);
});

app.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.send("Logout successfully");
  });
});

app.post("/register", (req, res) => {
  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.send("Fail register")
    } else {
      passport.authenticate("local")(req, res, function(){
        // res.json(infoOfUserSignedIn(req))
        res.send("User Created");
      });
    }
  });
});


app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});
//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server


// const express = require('express');
// const ejs = require("ejs");
// const bodyParser=require("body-parser");
// const date=require(__dirname+"/date.js");
// const mongoose=require("mongoose");
// const session = require('express-session');
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
// const app=express();
// const cookieParser=require("cookie-parser");
// const cors =require("cors");
// const defaultDiary="Write something for the day...";
// // set the view engine to ejs
// app.set("view engine","ejs");
// //To use multiple static assets directories
// app.use(express.static("public"));










// userSchema.plugin(passportLocalMongoose);

// passport.use(User.createStrategy());



function infoOfUserSignedIn(request){
  return {
    username:request.isAuthenticated()?request.user.username:null, 
    isLogin:request.isAuthenticated()
  };
}



// app.get("/",function(req,res){
//   console.log("root: ")
//   console.log(infoOfUserSignedIn(req));
//   return res.json(infoOfUserSignedIn(req));
// });

// app.get("/write",function(req,res){
//   let todayDate=date.numericDate();
//   res.redirect("/write/"+todayDate);
// });

// app.get("/login",function(req,res){
//   res.render("login",infoOfUserSignedIn(req));
// });

// app.get("/manage",function(req,res){
//   if (!req.isAuthenticated){
//     res.redirect("/login");
//   } else {
//     res.render("manage",infoOfUserSignedIn(req));
//   }
// });

// app.get("/register",function(req,res){
//   res.render("register",infoOfUserSignedIn(req));
// });



// app.get("/about", function(req,res){
//   res.render("about",infoOfUserSignedIn(req));
// });

// app.get("/contact", function(req,res){
//   res.render("contact",infoOfUserSignedIn(req));
// });

// app.get("/read/:diaryDate",function(req,res){
//   const numericDate=req.params.diaryDate;
//   const weekday=date.findDateString(numericDate).weekday;
//   const dateString=date.findDateString(numericDate).date;
//   diaryExist=false;
//   if (!req.isAuthenticated()){
//     res.redirect("/login");
//   } else {
//      const userID=req.user.id;
//      User.findById(userID,function(err,foundUser){
//        if (err){
//          console.log(err);
//        } else{
//          if (!foundUser){
//            console.log("cannot find user");
//          }else{
//            let allDiaries=foundUser.secrets;
//            if (allDiaries.length !==0){
//             allDiaries.forEach(diaryOfTheDay=>{
//                if (diaryOfTheDay.date===numericDate){
//                 diaryExist=true;
//                  res.render("read",
//                  Object.assign(infoOfUserSignedIn(req),
//                  {stringDate:dateString, day:weekday, diary:diaryOfTheDay.diary,numericDate:numericDate}
//                ));
//                }
//              });
//            }
//            if(!diaryExist){
//                   const newDiary=new Diary({
//                     date:numericDate,
//                     diary:defaultDiary
//                   });
//                   foundUser.secrets.push(newDiary);
//                 foundUser.save();
//                 res.render("read",Object.assign(
//                   infoOfUserSignedIn(req),
//                   {stringDate:dateString, day:weekday, diary:newDiary.diary,numericDate:numericDate}
//                 ));
//               }
//          }
//        }
//      });
//   }
// });


// app.get("/write/:diaryDate",function(req,res){
//  const numericDate=req.params.diaryDate;
//  let diaryExist=false;
//  const weekday=date.findDateString(numericDate).weekday;
//  const dateString=date.findDateString(numericDate).date;
//  if (!req.isAuthenticated()){
//    res.redirect("/login");
//  }else{
//  const userID=req.user.id;
//  User.findById(userID,function(err,foundUser){
//    if (err){
//      console.log(err);
//    } else{
//      if (!foundUser){
//        console.log("cannot find user");
//      }else{
//        let allDiaries=foundUser.secrets;
//        if (allDiaries.length !==0){
//          allDiaries.forEach(diaryOfTheDay=>{
//            if (diaryOfTheDay.date===numericDate){
//             diaryExist=true;
//              res.render("write",Object.assign(
//                infoOfUserSignedIn(req),
//                {stringDate:dateString, day:weekday, diary:diaryOfTheDay.diary,numericDate:numericDate }
//              ));
//            }
//          });
//        }
//        if(!diaryExist){
//               const newDiary=new Diary({
//                 date:numericDate,
//                 diary:""
//               });
//               foundUser.secrets.push(newDiary);
//             foundUser.save();
//             res.render("write",Object.assign(
//               infoOfUserSignedIn(req),
//               {stringDate:dateString, day:weekday, diary:newDiary.diary,numericDate:numericDate}
//             ));
//           }

//      }
//    }
//  });
// }
// });


// app.post("/register", function(req, res){
//   User.register({username: req.body.username}, req.body.password, function(err, user){
//     if (err) {
//       console.log(err);
//       res.send(err);
//     } else {
//       passport.authenticate("local")(req, res, function(){
//         // res.json(infoOfUserSignedIn(req))
//         res.send("User Created");
//       });
//     }
//   });
// });
// app.get("/user", (req, res) => {
//   res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
// });
// app.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) throw err;
//     if (!user) res.send("No User Exists");
//     else {
//       req.logIn(user, (err) => {
//         if (err) throw err;
//         res.send("Successfully Authenticated");
//         console.log(req.user);
//       });
//     }
//   })(req, res, next);
// });
// // app.post("/login", function(req, res){
// //   console.log(req.body);
// //     const user=new User({
// //       username:req.body.username,
// //       password:req.body.password
// //     });
// //     console.log("before: ")
// //     console.log(infoOfUserSignedIn(req))
// //     req.login(user,function(err){
// //       if (err){
// //         console.log(err);
// //         res.json(err);
// //       }else{
// //         passport.authenticate("local")(req,res,function(){
// //           console.log("after: ")
// //           console.log(infoOfUserSignedIn(req));
// //           res.send("Successfully login");
// //           console.log(req.user);
          
// //         });
// //       }
// //     });
// // });

// app.post("/write",function(req,res){
//   const numericDate=req.body.numericDate.slice(0,10);
//   const content=req.body.content;
//   const userID=req.user.id;
//   User.findById(userID,function(err,foundUser){
//     if (err){
//       console.log(err);
//     } else{
//       if (!foundUser){
//         console.log("cannot find user");
//       }else{
//         let allPosts=foundUser.secrets;
//           allPosts.forEach(postOfTheDay=>{
//             if (postOfTheDay.date===numericDate){
//               postOfTheDay.post=content;
//               foundUser.save();
//               res.redirect("/read/"+numericDate);
//             }
//           });

//       }
//     }
//   });
// });


// app.post("/manage", function(req,res){
//   const postDate=req.body.numericDate;
//   res.redirect("/read/"+postDate);
// });




// app.post("/read",function(req,res){
//      const numericDate=req.body.numericDate.slice(0,10);
//      res.redirect("/write/"+numericDate);
//    });






app.listen(8080,function(){
  console.log("start server port 8080");
});
