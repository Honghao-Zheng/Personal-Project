import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./fragments/Header"

const Home = () => {
    const [authentication, setAuthentication] = useState({
        userName:null,
        isLogin:false
    });
  

    useEffect(() => {
      const fetchLoginInfo = async () => {
        try {
          const res = await axios.get("http://localhost:8080");
          setAuthentication(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchLoginInfo();
    }, []);
  
    
  
  
    return (
      <div>
      <Header
        isLogin={authentication.isLogin}
        userName={authentication.userName}
      />

      </div>
    );
  };
  
  export default Home;