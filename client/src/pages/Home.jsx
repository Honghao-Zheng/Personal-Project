import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Header from "./fragments/Header";
import querystring from "querystring";
import { SERVER_URL } from "../env";
import Footer from "./fragments/Footer";

const date = require("../logicFunctions/date.js");
const Home = () => {
  let todayDate = date.numericDate();
  const [writeRoute, setRoute] = useState("");
  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: SERVER_URL + "user",
    }).then((res) => {
      res.data ? setRoute("write/" + todayDate) : setRoute("login");
      console.log(res.data);
    });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <Header />
      <div class="homeButtons">
        <div class="container ">
          <Link to={"/" + writeRoute}>
            <button
              type="button"
              class="btn btn-primary btn-lg btn-block navButton"
            >
              Write Diary
            </button>
          </Link>
        </div>
        <div class="container">
          <Link to="/manage">
            <button
              type="button"
              class="btn btn-secondary btn-lg btn-block navButton"
            >
              Manage Diary
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
