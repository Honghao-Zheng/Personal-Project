import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Header from "./fragments/Header"
import querystring from "querystring";

const Contact = () => {

    return(
        <div>
            <Header />
            <p>E-mail: Honghao@workmail.com</p>
        </div>
    )
}

export default Contact