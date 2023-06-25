import React, { useState } from "react";
import Header from "./fragments/Header";
import Axios from "axios";
import { useEffect } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { SERVER_URL } from "../env";
function Login() {
  const [data, setData] = useState(null);
  const [loginUser, setLoginUser] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUser.username,
        password: loginUser.password,
      },
      withCredentials: true,
      url: SERVER_URL + "login",
    }).then((res) => {
      console.log(res);
      setData(res.data);
    });
  };

  return (
    <div className="App">
      <Header />

      <div className="authenGroup">
        <div>
          <h1>Login</h1>
          <label>username</label>
          <input
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>password</label>
          <input
            placeholder="password"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </div>
        <button onClick={login} className="navButton">
          Submit
        </button>
      </div>
      {data === "Authenticated" ? <Navigate to="/" replace={true} /> : null}
    </div>
  );
}

export default Login;
