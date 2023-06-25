import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../env";

function Authentication(props) {
  const logout = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: SERVER_URL + "logout",
    }).then((res) => {
      console.log(res.data);
      window.location.reload();
    });
  };

  if (props.username) {
    return (
      <div>
        <li>Hi {props.username}</li>
        <li onClick={logout}>
          <Link to="/">Logout</Link>
        </li>
      </div>
    );
  } else {
    return (
      <div>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </div>
    );
  }
}

function Header() {
  const [data, setData] = useState(null);
  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: SERVER_URL + "user",
    }).then((res) => {
      setData(res.data);

      console.log(res.data);
    });
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <nav class="navbar navbar-default">
        <div class="container">
          <div class="navbar-header">
            <p class="navbar-brand">DIARY</p>
          </div>
          <ul class="nav navbar-nav">
            <Authentication username={data ? data.username : null} />
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <Link to={"/"}>HOME</Link>
            </li>
            <li>
              <Link to={"/about"}>ABOUT</Link>
            </li>
            <li>
              <Link to={"/contact"}>CONTACT</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
