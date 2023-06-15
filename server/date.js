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




exports.findDateString=function(numericDate){
  const year=numericDate.slice(0,4);
  const month=numericDate.slice(5,6)+String(Number(numericDate.slice(6,7))-1);
  const day=numericDate.slice(8,10);
  const event = new Date(Date.UTC(year, month, day));
  const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
  const optionsDay = { weekday: 'long'};
  const date=event.toLocaleDateString("en-UK", optionsDate);
  const weekday=event.toLocaleDateString("en-UK", optionsDay);
  return {date:date,weekday:weekday};
};

exports.numericDate=function(dateString){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  return today;
};

// let wordCounts=0;
// let sliceFrom=0;
// let sliceTo;
// let p="Sound That's Engineered For You, For An Unsurpassed Calls & Music Experience. Shop Now. Our World Class Calls & Music Products Are The Perfect Sound Solution For All Your Needs. Free Standard Shipping. 1 Year Warranty. Free Technical Support. 30 Day Returns.";
// for (let characterIndex=0; characterIndex <= p.length; characterIndex++){
//   if (p[characterIndex]===" "){
//     wordCounts+=1;
//     if (wordCounts%20==0){
//       sliceTo=characterIndex;
//       console.log(sliceFrom,sliceTo+1);
//       console.log(p.slice(sliceFrom,sliceTo+1));
//       sliceFrom=sliceTo;
//     }
//   }}
//
// }
