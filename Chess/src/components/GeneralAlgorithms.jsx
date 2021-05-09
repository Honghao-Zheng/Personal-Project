//jshint esversion:6
function checkEqualArray(array1,array2){
  if (array1.length===array2.length){
    var i;
    for(i=0;i<array1.length;i++){
      if (array1[i] !==array2[i]){
        return (false);
      }
    }
    return (true);
}
}

  function arraysIncludeArray(arrays,oneArray){
    var i;
    for (i=0;i<arrays.length;i++){
      if (checkEqualArray(arrays[i],oneArray)){
        return (true);
      }
    }
    return (false);
  }


export {arraysIncludeArray};
