import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./fragments/Header";
import querystring from "querystring";
const date = require("../logicFunctions/date.js");
let todayDate = date.numericDate();

const WriteDiary = (props) => {
  const navigate = useNavigate();
  const [diary, setdiary] = useState({
    date: {
      numericDate: "",
      stringDate: "",
      day: "",
    },
    content: "",
    isEmpty: true,
    hashTags: [],
    score: null,
  });

  const [writtingMode, setWrittingMode]=useState(false)

  const changeDate=(e)=>{
    acquireDiary(e.target.value)

  }
  const handleChange = (e) => {
    setdiary((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  

  const acquireDiary = (date) => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8080/read/" + date,
    }).then((res) => {
      console.log(res.data);
      setdiary(res.data);
    });
  };
  const sendDiary = () => {
    Axios({
      method: "PUT",
      data: diary,
      withCredentials: true,
      url: "http://localhost:8080/write",
    }).then((res) => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    acquireDiary(todayDate);
  }, []);
  if (diary === "Unauthenticated") {
    navigate("/login");
  } else {
    return (
      <div>
        <Header />
      
        <div class="container-fluid">
          <div class="container">
            <div class="row">
              <div class="col">{diary.date.stringDate}</div>
              <div class="col">{diary.date.day}</div>
              <div class="col">
                Rating of the day:{" "}
                {writtingMode?<input
                  name="score"
                  type="number"
                  size="3"
                  onChange={handleChange}
                  value={diary.score}
                />: diary.score}
              </div>
            </div>
          </div>

          <div>
          {writtingMode?
            <textarea
              type="text"
              name="content"
              rows="8"
              cols="130"
              onChange={handleChange}
              value={diary.content}
            />: <article>
              <p>
              {diary.content}
              </p>
            </article>
            }
          </div>

          <div>
          {writtingMode? 
          <button onClick={(e)=>{setWrittingMode(false);sendDiary(e)}}>save</button>:
          <button onClick={()=>setWrittingMode(true)}>Start Writing</button>
          }
          </div>
          <div>
            <h5>
            Select a different date
            </h5>
            <input type="date" name="date" onChange={changeDate}/>
          </div>
        </div>
      </div>
    );
  }
};

export default WriteDiary;
