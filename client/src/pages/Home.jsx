import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Header from "./fragments/Header"
import querystring from "querystring";
const date = require("../logicFunctions/date.js");
const Home = () => {
  
let todayDate = date.numericDate();
const [writeRoute, setRoute] = useState("");
  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8080/user",
    }).then((res) => {
      res.data?setRoute("write/"+todayDate):setRoute("login")
      console.log(res.data);
    });
  };
    useEffect(() => {
      getUser();
 
    }, []);
    return (
      <div>
      <Header />
      <div class="container">
      <Link to={"/"+writeRoute}><button type="button" class="btn btn-primary btn-lg btn-block" >Write Diary</button></Link>
    </div>
    <div class="container">
      <Link to="/manage"><button type="button" class="btn btn-secondary btn-lg btn-block" >Manage Diary</button></Link>
    </div>
      </div>
    );
  };
  
  export default Home;