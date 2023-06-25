import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./fragments/Header";
import querystring from "querystring";
import { SERVER_URL } from "../env";
const ManageDiary = () => {
  const navigate = useNavigate();
  const [diaries, setDiaries] = useState([]);
  const [seachedDate, setSearchedDate] = useState({
    queryMade: false,
    from: null,
    to: null,
  });

  const [seachedScore, setSearchedScore] = useState({
    queryMade: false,
    from: null,
    to: null,
  });

  const handleDateChange = (e) => {
    setSearchedDate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleScoreChange = (e) => {
    setSearchedScore((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const acquireDiaries = (e) => {
    let findBy;
    let seachingConditionInfo = {
      from: null,
      to: null,
    };
    if (e) {
      findBy = e.target.name;
      if (findBy === "byDate") {
        console.log("seachedDate: " + seachedDate);
        seachingConditionInfo = seachedDate;
        setSearchedDate((prev) => ({ ...prev, queryMade: true }));
        setSearchedScore((prev) => ({ ...prev, queryMade: false }));
      }
      if (findBy === "byScore") {
        console.log("seachedScore: ");
        console.log(seachedScore);
        seachingConditionInfo = seachedScore;
        setSearchedScore((prev) => ({ ...prev, queryMade: true }));
        setSearchedDate((prev) => ({ ...prev, queryMade: false }));
      }
    } else {
      findBy = "all";
    }
    console.log("seachingConditionInfo: ");
    console.log(seachingConditionInfo);
    Axios({
      method: "GET",
      withCredentials: true,
      url:
        SERVER_URL +
        "find/" +
        findBy +
        "?from=" +
        seachingConditionInfo.from +
        "&to=" +
        seachingConditionInfo.to,
    }).then((res) => {
      console.log(res.data);
      setDiaries(res.data);
    });
  };

  const deleteDiary = (e) => {
    let queryType;
    Axios({
      method: "DELETE",
      withCredentials: true,
      url: SERVER_URL + "remove/" + e.target.name,
    }).then((res) => {
      console.log(res.data);
      if (setSearchedDate.queryMade) {
        queryType = "byDate";
      }
      if (setSearchedDate.queryMade) {
        queryType = "byScore";
      }
      acquireDiaries(queryType);
    });
  };

  useEffect(() => {
    acquireDiaries(null);
  }, []);

  if (diaries === "Unauthenticated") {
    navigate("/login");
  } else if (diaries === []) {
    return <div></div>;
  } else {
    return (
      <div>
        <Header />
        <div className="container">
          <div>
            <h5>Search by date</h5>
            <label>from</label>
            <input type="date" name="from" onChange={handleDateChange} />
            <label>to</label>
            <input type="date" name="to" onChange={handleDateChange} />
            <button name="byDate" onClick={acquireDiaries}>
              Search
            </button>
          </div>

          <div>
            <h5>Search by score</h5>
            <label>from</label>
            <input type="number" name="from" onChange={handleScoreChange} />
            <label>to</label>
            <input type="number" name="to" onChange={handleScoreChange} />
            <button name="byScore" onClick={acquireDiaries}>
              Search
            </button>
          </div>

          <div class="container-fluid py-2 ">
            <div class="card-columns">
              {diaries.map((diary, diaryNum) => {
                return (
                  <div class="card card-body card-block">
                    <h5 class="card-title">
                      <button
                        class="close"
                        name={diary.date.numericDate}
                        onClick={deleteDiary}
                      >
                        ×
                      </button>
                      <div class="container">
                        <div class="row">{diary.date.stringDate}</div>
                        <div class="row">{diary.date.day}</div>
                        <div class="row">Score: {diary.score}</div>
                      </div>
                    </h5>
                    <p class="card-text">
                      {diary.content.slice(0, 200)}
                      <a href={"/write/" + diary.date.numericDate}>...mroe</a>
                    </p>
                    <p class="card-text">
                      <small class="text-muted">
                        {diary.hashTags.map((tag) => {
                          return "#" + tag + " ";
                        })}
                      </small>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ManageDiary;
