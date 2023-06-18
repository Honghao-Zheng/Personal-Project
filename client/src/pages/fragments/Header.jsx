import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
function Authentication(props){
  const logout = () => {
    Axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:8080/logout",
    }).then((res) => {
      console.log(res);
    });
  };
  
    if (props.username){
        return (
            
            <div>
            
                <li >Hi {props.username}</li>
                <li onClick={logout}><Link to="/">Logout</Link></li>
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

function Header(){
  
  const [data, setData] = useState(null);
  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8080/user",
    }).then((res) => {
      setData(res.data);
      console.log(res);
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
          <Authentication
          username={data?data.username:null}
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