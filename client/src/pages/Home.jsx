import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Header from "./fragments/Header"
import querystring from "querystring";

const Home = () => {

    return (
      <div>
      
      <Header/>
      <div class="container">
      <Link to="/write"><button type="button" class="btn btn-primary btn-lg btn-block" >Write Diary</button></Link>
    </div>
    <div class="container">
      <Link to="/manage"><button type="button" class="btn btn-secondary btn-lg btn-block" >Manage Diary</button></Link>
    </div>

      </div>
    );
  };
  
  export default Home;