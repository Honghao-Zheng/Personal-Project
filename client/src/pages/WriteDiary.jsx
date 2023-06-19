import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Header from "./fragments/Header"
import querystring from "querystring";
const date=require("../logicFunctions/date.js");
let todayDate=date.numericDate();
const WriteDiary = () => {
  const [diary, setdiary] = useState({
    diary:"",
    day:"",
    stringDate:"",
    numericDate:""
  });
  const handleChange = (e) => {
    
    setdiary((prev) => ({ ...prev, [e.target.name]: e.target.value }));}

  const acquireDiary =  () => {
       Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:8080/find/"+todayDate,
      }).then((res) => {
        console.log(res.data);
        setdiary(res.data)
      }
      )};
    const sendDiary = () => {
      Axios({
        method: "POST",
        data:diary,
        withCredentials: true,
        url: "http://localhost:8080/write",
      }).then((res) => {
        console.log(res.data);
      }
      )};

    useEffect(() => {
      acquireDiary();
    }, []);
    
    return (
      <div>
      
      <Header/>
      <div class="container-fluid">

<div class="container">
  <div class="row">
    <div class="col">
      {diary.stringDate}
    </div>
    <div class="col">
    {diary.day}
    </div>
  </div>

</div>

<div >
    <textarea type="text" name="diary" rows="8" cols="130" onChange={handleChange}>{diary.diary}</textarea>
</div>

<div >
  <button  onClick={sendDiary} >save</button>
</div>

</div>
      </div>
    );
  };
  
  export default WriteDiary;



