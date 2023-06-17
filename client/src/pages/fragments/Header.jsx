import React from "react";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
function Authentication(props){
  console.log("isLogin: "+props.isLogin);
  
    if (props.isLogin){
        return (
            
            <div>
            
                <li >Hi {props.username}</li>
                <li ><Link>Logout</Link></li>
            </div>
        )
    } else{
        return (
        <div>
            <li ><Link to="/login">Login</Link></li>
            <li ><Link>Register</Link></li>
        </div>
        )
    }
}

function Header(props){
    // const [authentication, setAuthentication] = useState({
    //     userName:null,
    //     isLogin:false
    // });
    console.log("header called")
  
    // useEffect(() => {
    //   console.log("header called2")
    //   const fetchLoginInfo = async () => {
    //     try {
    //       const res = await axios.get("http://localhost:8080");
    //       setAuthentication(res.data);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    //   fetchLoginInfo();
    // }, []);
    return (
        
        <div>
        
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <p class="navbar-brand">DIARY</p>
        </div>
        <ul class="nav navbar-nav">
<Authentication
isLogin={props.isLogin}
username={props.username}
/>

        </ul>
          <ul class="nav navbar-nav navbar-right">
            <li ><Link>HOME</Link></li>
            <li ><Link>ABOUT</Link></li>
            <li ><Link>CONTACT</Link></li>
          </ul>
      </div>
    </nav>
        </div>
        )

}

export default Header;