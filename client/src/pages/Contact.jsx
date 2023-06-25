import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Header from "./fragments/Header";
import querystring from "querystring";

const Contact = () => {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="container">
          <p className="row">E-mail: Honghao@workmail.com</p>
          <p className="row">
            GitHub:{" "}
            <a href="https://github.com/Honghao-Zheng">
              {" "}
              https://github.com/Honghao-Zheng
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
