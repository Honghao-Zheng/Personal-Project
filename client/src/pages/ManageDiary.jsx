import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./fragments/Header";
import querystring from "querystring";

const ManageDiary = () => {
  const navigate = useNavigate();
  const [diaries, setdiaries] = useState([]);
  const onDelete = (e) => {};

  const acquireDiaries = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8080/findAll",
    }).then((res) => {
      console.log(res.data);
      setdiaries(res.data);
    });
  };
  const deleteDiary = (e) => {
    Axios({
      method: "DELETE",
      withCredentials: true,
      url: "http://localhost:8080/remove/"+e.target.name,
    }).then((res) => {
      console.log(res.data);
      acquireDiaries();
    }
    )};

  

  useEffect(() => {
    acquireDiaries();
  }, []);
  if (diaries === "Unauthenticated") {
    navigate("/login");
  } else if (diaries === []) {
    return <div></div>;
  } else {
    return (
      <div>
        <Header />

        
        <div class="container-fluid py-2 ">
          <div class="card-columns">
            {diaries.map((diary, diaryNum) => {
              return (
                <div class="card card-body card-block" >
                  <h5 class="card-title">
                  <button class="close" name={diary.date.numericDate} onClick={deleteDiary}>
                    ×
                  </button>
                    <div class="container">
                        <div class="row">{diary.date.stringDate}</div>
                        <div class="row">{diary.date.day}</div>
                        <div class="row">Score: {diary.score}</div>
                    </div>
                  </h5>
                  <p class="card-text">{diary.content.slice(0,200)}<a href={"/write/"+diary.date.numericDate}>...mroe</a></p>
                  <p class="card-text"><small class="text-muted">
                    {diary.hashTags.map((tag)=>{
                      return ("#"+tag+" ")
                    })}
                  </small></p>
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
