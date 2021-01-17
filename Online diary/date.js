//jshint esversion:6
exports.getDate=function(){
  const today=new Date();
  let option={
    year:"numeric",
    day:"numeric",
    month:"long"
  };

  return today.toLocaleDateString("en-UK",option);
  };


exports.getDay=function(){
  const today=new Date();
  let option={
    weekday:"long",
  };
  return today.toLocaleDateString("en-UK",option);
  };
