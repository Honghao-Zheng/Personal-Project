import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Header from "./fragments/Header";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import querystring from "querystring";
const Login = () => {
  
  const [user, setUser] = useState({
    username: null,
    password: null
  });

  const [authentication, setAuthen] = useState({
    username: null,
    isLogin: false
  });
  let authen;
  const navigate = useNavigate();

  const handleChange = (e) => {
    
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    let test=async (e) => {

      try {
        let res=await axios.get("http://localhost:8080");
        console.log("onchange get root:")
        console.log(res.data);
  
  
      } catch (err) {
        console.log(err);
      }
    }
    test();
  };
  const login = async (e) => {

    e.preventDefault();
    try {
      authen=await axios.post("http://localhost:8080/login", querystring.stringify(user),
      
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    setAuthen(authen.data);
    console.log(authen);

    } catch (err) {
      console.log(err);
    }
  };

    return (
      <div>
      <Header
      username={authentication.username}
      isLogin={authentication.isLogin}
      />
      <div class="container">
  <h1>Login</h1>

  <div class="row">
          <form>
            <div class="form-group">
              <label >Username</label>
              <input  
               type="text" 
              name="username"
              onChange={handleChange}
              />
            </div>
            <div class="form-group">
              <label >Password</label>
              <input 
              type="password"  
              name="password"
              onChange={handleChange}
              />
            </div>
            <button onClick={login} type="submit" class="btn btn-dark">Login</button>
          </form>
          {authentication.isLogin && (
          <Navigate to="/login" replace={true} />
        )}
    </div>

  </div>

      </div>
    );
  };
  
  export default Login;