import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Authentication(props){
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
            <li ><Link>Login</Link></li>
            <li ><Link>Register</Link></li>
        </div>
        )
    }

}


function Header(props){
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