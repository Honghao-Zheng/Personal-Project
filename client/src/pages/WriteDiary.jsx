import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./fragments/Header";
import querystring from "querystring";
import { useParams } from "react-router";
import { SERVER_URL } from "../env";

const WriteDiary = (props) => {
  let {selectedDate} = useParams();
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
    score: 0,
  });

  const [writtingMode, setWrittingMode] = useState(false);
  const [hashtag, setHashtag] = useState("");

  const changeDate = (e) => {
    navigate("/write/"+e.target.value)
    acquireDiary(e.target.value);
  };
  const handleChange = (e) => {
    if (e.target.name === "hashtag") {
      setHashtag(e.target.value);
    } else {
      setdiary((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const Paragraphs=(props)=>{
    var paragraphs = props.article.split('\n\n');
    
    return(
      <div>
      {paragraphs.map((p, pIndex) => {
        return (
          <p key={pIndex}>
            {p}
          </p>
        )
      })}
      </div>
    )
  }

  const addHashtag = (e) => {
   
    let newHashtags = diary.hashTags;
    newHashtags.push(hashtag);
    setdiary((prev) => ({ ...prev, [e.target.name]: newHashtags }));
  };

  const deleteTag=(e)=>{
    
    let newHashtags = diary.hashTags;
    newHashtags.splice(e.target.id,1)
    setdiary((prev) => ({ ...prev, [e.target.name]: newHashtags }));
  }

  const acquireDiary = (date) => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: SERVER_URL+"read/" + date,
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
      url: SERVER_URL+"write",
    }).then((res) => {
      console.log(res.data);
    });
  };

  
  useEffect(() => {
    acquireDiary(selectedDate);
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
                {writtingMode ? (
                  <input
                    name="score"
                    type="number"
                    size="3"
                    onChange={handleChange}
                    value={diary.score}
                  />
                ) : (
                  diary.score
                )}
              </div>
            </div>
          </div>

          <div>
            {writtingMode ? (
              <textarea
                type="text"
                name="content"
                rows="8"
                cols="130"
                onChange={handleChange}
                value={diary.content}
              />
            ) : (
              <article>
              <Paragraphs article={diary.content}/>
              </article>
            )}
          </div>

          <div>
            {writtingMode ? (
              <button
                onClick={(e) => {
                  setWrittingMode(false);
                  sendDiary(e);
                }}
              >
                save
              </button>
            ) : (
              <button onClick={() => setWrittingMode(true)}>
                Start Writing
              </button>
            )}
          </div>
          <div>
            <div>
              <label># Hashtag: </label>
              <input name="hashtag" type="text" onChange={handleChange} />
              <button id="add" name="hashTags" onClick={addHashtag}>
                +
              </button>
              {diary.hashTags.map((hashtag, hashtagNum) => {
                return (<button id={hashtagNum}  name="hashTags" onClick={deleteTag}># {hashtag}</button>);
              })}
            </div>
          </div>

          <div>
            <h5>Select a different date</h5>
            <input type="date" name="date" onChange={changeDate} />
          </div>
        </div>
      </div>
    );
  }
};

export default WriteDiary;
