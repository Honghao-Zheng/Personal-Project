const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const date=require(__dirname+"/date.js");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const passportLocalMongoose = require("passport-local-mongoose");
// const ejs = require("ejs");
const app = express();
// const User = require("./user");
// app.set("view engine","ejs");
// app.use(express.static("public"));
// const defaultDiary="Write something for the day...";
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
    resave: false,
    saveUninitialized: false,
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
  // username: String,
  // password: String,
  secrets:[diary]
});

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
        res.send("Authenticated");

      });
    }
  })(req, res, next);
});
app.get("/logout", function(req, res){
  req.logout();
  res.send("Logout successfully")
  });


  
// app.get("/logout", function(req, res, next){
//   console.log(req.isAuthenticated())
//   req.logout(function(err) {
//     console.log(req.isAuthenticated());
//     if (err) { return next(err); }
//     res.send("Logout successfully");
//   });
// });

app.post("/register", (req, res) => {
  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.send("User already exist or incorrect password")
    } else {
      passport.authenticate("local")(req, res, function(){
        // res.json(infoOfUserSignedIn(req))
        res.send("Authenticated");
      });
    }
  });
});


app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});
//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server





app.get("/find/:diaryDate",function(req,res){
  const numericDate=req.params.diaryDate;
  const weekday=date.findDateString(numericDate).weekday;
  const dateString=date.findDateString(numericDate).date;
  let diary;
  let isDiaryExist=false;
 
  if (!req.isAuthenticated()){
    res.send("user is not authenticated");
  } else {
     const userID=req.user.id;
     User.findById(userID,function(err,foundUser){
       if (err){
         console.log(err);
       } else{
         if (!foundUser){
           console.log("cannot find user");
         }else{
           let allDiaries=foundUser.secrets;
            allDiaries.forEach(diaryOfTheDay=>{
               if (diaryOfTheDay.date===numericDate){
                 diary=diaryOfTheDay.diary;
                 isDiaryExist=true;
               } 
             });
            if(!isDiaryExist) {
                  const newDiary=new Diary({
                    date:numericDate,
                    diary:""
                  });
                foundUser.secrets.push(newDiary);
                foundUser.save();
                diary=newDiary.diary
              }
                res.json({
                  stringDate:dateString, day:weekday, diary:diary,numericDate:numericDate
                });
         }
       }
     });
  }
}
)

app.put("/write",function(req,res){
  console.log(req.body);
  const numericDate=req.body.numericDate.slice(0,10);
  const content=req.body.diary;
  const userID=req.user.id;
  User.findById(userID,function(err,foundUser){
    if (err){
      console.log(err);
    } else{
      if (!foundUser){
        console.log("cannot find user");
      }else{
        let allDiaries=foundUser.secrets;
        allDiaries.forEach(diaryOfTheDay=>{
            if (diaryOfTheDay.date===numericDate){
              diaryOfTheDay.diary=content;
            }
          });
          foundUser.save();
          res.send("Diary saved"); 
      }
    }
  });
});
app.listen(8080,function(){
  console.log("start server port 8080");
});


// app.get("/manage",function(req,res){
//   if (!req.isAuthenticated){
//     res.redirect("/login");
//   } else {
//     res.render("manage",infoOfUserSignedIn(req));
//   }
// });












// app.post("/manage", function(req,res){
//   const postDate=req.body.numericDate;
//   res.redirect("/read/"+postDate);
// });




// app.post("/read",function(req,res){
//      const numericDate=req.body.numericDate.slice(0,10);
//      res.redirect("/write/"+numericDate);
//    });






