import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Header from "./fragments/Header"
import querystring from "querystring";

const About = () => {


    return(
        
        <div>
        <Header />
        <p>
            You can write your diary with this web application
        </p>
        </div>
    )
}

export default About