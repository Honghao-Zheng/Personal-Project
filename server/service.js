exports.findUser=(req, res, User)=> {
    return new Promise((resolve, reject) => {
      if (!req.isAuthenticated()) {
        res.send("Unauthenticated");
      } else {
        const userID = req.user.id;
        User.findById(userID, function(err, foundUser) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (!foundUser) {
              console.log("cannot find user");
              resolve(null);
            } else {
              console.log("foundUser 1: " + foundUser);
              resolve(foundUser);
            }
          }
        });
      }
    });
  }
  
exports.findDiariesByDate=(allDiaries, rangeFrom, rangeTo, diariesFound) =>{
    allDiaries.forEach(diaryOfTheDay => {
        let numericDate = diaryOfTheDay.date.numericDate;
      if (rangeFrom &&
        rangeTo &&
        rangeFrom <= numericDate &&
        rangeTo >= numericDate) {
        diariesFound.push(diaryOfTheDay);
      } else if (!rangeFrom &&
        rangeTo &&
        rangeFrom <= numericDate) {
        diariesFound.push(diaryOfTheDay);
      } else if (rangeFrom &&
        !rangeTo &&
        rangeTo >= numericDate) {
        diariesFound.push(diaryOfTheDay);
      } else {
        return;
      }
    });
  }

exports.findDiariesByScore=(allDiaries, rangeFrom, rangeTo, diariesFound)=> {
    allDiaries.forEach(diaryOfTheDay=>{
        let score=diaryOfTheDay.score;
        if(
          rangeFrom<=score && 
          rangeTo>=score){
           diariesFound.push(diaryOfTheDay);
        } else if(
          rangeFrom<=score){
             diariesFound.push(diaryOfTheDay);
        } else if(
          rangeTo>=score){
          diariesFound.push(diaryOfTheDay);
        } else {
          return;
        }
      })
  }