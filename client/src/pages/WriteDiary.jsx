import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./fragments/Header"
import querystring from "querystring";
const date=require("../logicFunctions/date.js");
let todayDate=date.numericDate();

const WriteDiary = () => {
  const navigate = useNavigate();
  const [diary, setdiary] = useState({
    date:{
      numericDate:"", 
      stringDate: "",
      day:""
    },
    content:"",
    isEmpty:true,
    hashTags:[],
    scores: 5
  });
  const handleChange = (e) => {
    
    setdiary((prev) => ({ ...prev, [e.target.name]: e.target.value }));}

  const acquireDiary =  () => {
       Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:8080/read/"+todayDate,
      }).then((res) => {
        console.log(res.data);
         setdiary(res.data)
      }
      )};
    const sendDiary = () => {
      Axios({
        method: "PUT",
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
    if(diary==="Unauthenticated") {navigate("/login")}

    else {return (
      <div>
      
      <Header/>
      <div class="container-fluid">

<div class="container">
  <div class="row">
    <div class="col">
      {diary.date.stringDate}
    </div>
    <div class="col">
    {diary.date.day}
    </div>
    <div class="col">
    Rating of the day: {diary.score}
    </div>
  </div>
</div>

<div >
    <textarea type="text" name="content" rows="8" cols="130" onChange={handleChange}>{diary.content}</textarea>
</div>

<div >
  <button  onClick={sendDiary} >save</button>
</div>

</div>
      </div>
    );
    }
  };

  export default WriteDiary;



