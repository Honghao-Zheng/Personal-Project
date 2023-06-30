const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const passportLocalMongoose = require("passport-local-mongoose");
const fs = require("fs");
const date = require("./date");
const service = require("./service");
const dotenv = require("dotenv").config();
// const ejs = require("ejs");
const app = express();
// const User = require("./user");
// app.set("view engine","ejs");
// app.use(express.static("public"));
// const defaultDiary="Write something for the day...";

//----------------------------------------- END OF IMPORTS---------------------------------------------------

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL, // <-- location of the react app were connecting to
    credentials: true,
  })
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

//connecting mongoDB database and import example dataset
mongoose.connect(
  process.env.MONGODB_URL,

  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);

const diary = {
  date: {
    numericDate: String,
    stringDate: String,
    day: String,
  },
  content: String,
  isEmpty: Boolean,
  hashTags: Array,
  score: Number,
};
const user = new mongoose.Schema({
  secrets: [diary],
});

user.plugin(passportLocalMongoose);
const Diary = new mongoose.model("Diary", diary);
const User = new mongoose.model("User", user);

const testerData = JSON.parse(fs.readFileSync("./exampleData.json", "utf-8"));

const importData = async () => {
  try {
    await User.create(testerData);
    console.log("data successfully imported");
    process.exit();
  } catch (error) {
    console.log("error", error);
  }
};

passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
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

app.get("/logout", function (req, res) {
  req.logout();
  res.send("Logout successfully");
});

app.get("/find/:by", async function (req, res) {
  let findBy = req.params.by;
  let rangeFrom;
  let rangeTo;
  let allDiaries;
  let diariesFound = [];
  let foundUser = await service.findUser(req, res, User);
          allDiaries = foundUser.secrets;
          if (findBy === "all") {
            res.send(allDiaries);
          } else {
            rangeFrom = req.query.from;
            rangeTo = req.query.to;
            if (findBy === "byDate") {
              service.findDiariesByDate(
                allDiaries,
                rangeFrom,
                rangeTo,
                diariesFound
              );
            }
            if (findBy === "byScore") {
              service.findDiariesByScore(
                allDiaries,
                rangeFrom,
                rangeTo,
                diariesFound
              );
            }
            res.send(diariesFound);
          }
});

app.get("/read/:diaryDate", async function (req, res) {
  const numericDate = req.params.diaryDate;
  const day = date.findDateString(numericDate).day;
  const stringDate = date.findDateString(numericDate).date;
  let diary;
  let isDiaryExist = false;
  try {
    let foundUser = await service.findUser(req, res, User);
    let allDiaries = foundUser.secrets;
    allDiaries.forEach((diaryOfTheDay) => {
      if (diaryOfTheDay.date.numericDate === numericDate) {
        diary = diaryOfTheDay;
        isDiaryExist = true;
      }
    });

    if (!isDiaryExist) {
      const newDiary = new Diary({
        date: {
          numericDate: numericDate,
          stringDate: stringDate,
          day: day,
        },
        content: "",
        isEmpty: true,
        hashTags: [],
        score: 0,
      });

      foundUser.secrets.push(newDiary);
      await foundUser.save();
      diary = newDiary;
    }
    res.json(diary);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/write", async function (req, res) {
  const numericDate = req.body.date.numericDate.slice(0, 10);
  const content = req.body.content;
  const score = req.body.score;
  const hashTags = req.body.hashTags;
  let foundUser = await service.findUser(req, res, User);
  let allDiaries = foundUser.secrets;
  allDiaries.forEach((diaryOfTheDay) => {
    if (diaryOfTheDay.date.numericDate === numericDate) {
      diaryOfTheDay.content = content;
      diaryOfTheDay.score = score;
      diaryOfTheDay.hashTags = hashTags;
      if (content) {
        diaryOfTheDay.isEmpty = false;
      } else {
        diaryOfTheDay.isEmpty = true;
      }
    }
  });
  await foundUser.save();
  res.send("Diary saved");
});

app.delete("/remove/:diaryDate", async function (req, res) {
  const numericDate = req.params.diaryDate;
  let foundUser = await service.findUser(req, res, User);
  let allDiaries = foundUser.secrets;
  for (let diaryIndex = 0; diaryIndex < allDiaries.length; diaryIndex++) {
    if (allDiaries[diaryIndex].date.numericDate === numericDate) {
      allDiaries.splice(diaryIndex, 1);
    }
  }
  await foundUser.save();
  res.send("Diary Deleted");
});

app.post("/register", (req, res) => {
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.send("User already exist or incorrect password");
      } else {
        passport.authenticate("local")(req, res, function () {
          // res.json(infoOfUserSignedIn(req))
          res.send("Authenticated");
        });
      }
    }
  );
});

app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});
//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server

app.listen(process.env.PORT || 8080, function () {
  importData();
  console.log("start server port 8080");
});
