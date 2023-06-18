import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function Authentication(props){
    const [data, setData] = useState(null);

    // const logout=()=>{
    //     Axios({
    //       method: "GET",
    //       withCredentials: true,
    //       url: "http://localhost:8080/logout",
    //     }).then((res) => {
    //       setData(res.data);
    //       console.log(res.data);
    //     });
    //   }
    if (props.username){
        return (
            <div>
                <li >Hi {props.username}</li>
                {/* <li ><element onClick={logout}>logout</element></li> */}
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

export default Authentication;