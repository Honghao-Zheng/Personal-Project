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


exports.findWeekday=function(date){
  const year=date.slice(0,4);
  const month=date.slice(5,7);
  const day=date.slice(8,10);
const event = new Date(Date.UTC(year, month, day));
const options = { weekday: 'long'};

return event.toLocaleDateString("en-UK", options);
// expected output: Thursday, December 20, 2012 (varies according to default locale)
};
