import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./fragments/Header"
import querystring from "querystring";

const ManageDiary = () => {

  const navigate = useNavigate();
  const [diaries, setdiaries] = useState([]);
  const onDelete = (e) => {
    }

  const acquireDiaries =  () => {
       Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:8080/findAll",
      }).then((res) => {
        console.log(res.data);
        setdiaries(res.data)
      }
      )};
    // const deleteDiary = () => {
    //   Axios({
    //     method: "DELETE",
    //     data:diary,
    //     withCredentials: true,
    //     url: "http://localhost:8080/delete",
    //   }).then((res) => {
    //     console.log(res.data);
    //   }
    //   )};

    useEffect(() => {
      acquireDiaries();
    }, []);
    if(diaries==="Unauthenticated") {navigate("/login")}

    else if (diaries===[]){
      return(
        <div></div>
      )
    }
    else{
      return (
        <div>
          <Header/>
          <div class="container-fluid py-2 " >

    <div class="d-flex flex-row flex-nowrap">

    {diaries.map((diary,diaryNum)=>{
  
  return (
    <div class="card card-body">
      {" "}
      <a class="close" href="/manage">
        ×
      </a>
      <h5 class="card-title">
        <div class="container">
          <div class="row">
            <div class="col">{diary.stringDate}</div>
            <div class="col">{diary.day}</div>
          </div>
        </div>
      </h5>
      <p class="card-text">{diary.content}</p>
    </div>
  );
})}

    </div>
</div>

  </div>
    
  
      );
    }

  };
  
  export default ManageDiary;
