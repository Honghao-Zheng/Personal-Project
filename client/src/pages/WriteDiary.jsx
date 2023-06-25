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
  let { selectedDate } = useParams();
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
    navigate("/write/" + e.target.value);
    acquireDiary(e.target.value);
  };
  const handleChange = (e) => {
    if (e.target.name === "hashtag") {
      setHashtag(e.target.value);
    } else {
      setdiary((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const Paragraphs = (props) => {
    var paragraphs = props.article.split("\n\n");

    return (
      <div>
        {paragraphs.map((p, pIndex) => {
          return <p key={pIndex}>{p}</p>;
        })}
      </div>
    );
  };

  const addHashtag = (e) => {
    let newHashtags = diary.hashTags;
    newHashtags.push(hashtag);
    setdiary((prev) => ({ ...prev, [e.target.name]: newHashtags }));
  };

  const deleteTag = (e) => {
    let newHashtags = diary.hashTags;
    newHashtags.splice(e.target.id, 1);
    setdiary((prev) => ({ ...prev, [e.target.name]: newHashtags }));
  };

  const acquireDiary = (date) => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: SERVER_URL + "read/" + date,
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
      url: SERVER_URL + "write",
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
              <div class="col">
                <h5>{diary.date.stringDate}</h5>
              </div>
              <div class="col">
                <h5>{diary.date.day}</h5>
              </div>
              <div class="col">
                <h5>
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
                </h5>
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
                  <p class="card-text hashtag">
                    <small class="text-muted hashtag">
                      {diary.hashTags.map((tag) => {
                        return "#" + tag + " ";
                      })}
                    </small>
                  </p>
                  <Paragraphs article={diary.content} />
                </article>
              )}
            </div>
            <div className="row">
              <div className="col">
                {writtingMode ? (
                  <button
                    className=" btn btn-outline-primary centre"
                    onClick={(e) => {
                      setWrittingMode(false);
                      sendDiary(e);
                    }}
                  >
                    save
                  </button>
                ) : (
                  <button
                    class="btn btn-outline-primary centre"
                    onClick={() => setWrittingMode(true)}
                  >
                    Start Writing
                  </button>
                )}
              </div>
              <div className="col">
                <h5>Select a different date</h5>
                <input type="date" name="date" onChange={changeDate} />
              </div>
              <div className="col">
                {writtingMode ? (
                  <div>
                    <label>Hashtag: </label>
                    <input name="hashtag" type="text" onChange={handleChange} />
                    <button id="add" name="hashTags" onClick={addHashtag}>
                      +
                    </button>
                    {diary.hashTags.map((hashtag, hashtagNum) => {
                      return (
                        <div
                          className="hashtag"
                          id={hashtagNum}
                          name="hashTags"
                          onClick={deleteTag}
                        >
                          # {hashtag}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default WriteDiary;
