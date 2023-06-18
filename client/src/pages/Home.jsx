import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./fragments/Header"
import querystring from "querystring";

const Home = () => {
  const [authentication, setAuthen] = useState({
    username: null,
    isLogin: false
  });
    
    useEffect(()=>{
      const changeAuthenInfo = async () => {
        try {
    
          let authen=await axios.get("http://localhost:8080");
          console.log("authen.data: "+authen.data.username);
          setAuthen(authen.data);
    
        } catch (err) {
          console.log(err);
        }
      };
      changeAuthenInfo();
    },[]
    );
    
    
    
    return (
      <div>
      
      <Header
      username={authentication.username}
      isLogin={authentication.isLogin}
      />

      </div>
    );
  };
  
  export default Home;