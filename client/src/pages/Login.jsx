import React, { useState } from "react";
import Header from "./fragments/Header";
import Axios from "axios";
import { useEffect } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";

function Login() {

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
  const login = () => {
   
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:8080/login",
    }).then((res) => console.log(res))
  };

  
  return (
    <div className="App">
       <Header />
      <div>
        <h1>Login</h1>
        <input
          placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Submit</button>
      </div>


      {/* {data ? <Navigate to="/login" replace={true}/>:null} */}
    </div>


      
    
  );
}

export default Login;









// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import {axios ,Axios}from "axios";
// import Header from "./fragments/Header";
// import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
// import querystring from "querystring";
// const Login = () => {
  
//   const [user, setUser] = useState({
//     username: null,
//     password: null
//   });

//   const [authentication, setAuthen] = useState({
//     username: null,
//     isLogin: false
//   });

//   const [data, setData] = useState(null);

//   const navigate = useNavigate();

//   const login = () => {
//     Axios({
//       method: "POST",
//       data: {
//         username: user.username,
//         password: user.password,
//       },
//       withCredentials: true,
//       url: "http://localhost:8080/login",
//     }).then((res) => console.log(res));
//   };
//   const getUser = () => {
//     Axios({
//       method: "GET",
//       withCredentials: true,
//       url: "http://localhost:8080/user",
//     }).then((res) => {
//       setData(res.data);
//       console.log(res.data);
//     });
//   };

//   const handleChange = (e) => {
    
//     setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // let test=async (e) => {

    //   try {
    //     let res=await axios.get("http://localhost:8080");
    //     console.log("onchange get root:")
    //     console.log(res.data);

  
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // test();
  // };
  // const login = async (e) => {

  //   e.preventDefault();
  //   try {
  //     let authen=await axios.post("http://localhost:8080/login", querystring.stringify(user),
      
  //     {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     }
  //   );
  //   console.log(authen);
  //   // setAuthen(authen.data);
    

  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  //   return (
  //     <div>
  //     <Header
  //     username={authentication.username}
  //     isLogin={authentication.isLogin}
  //     />
  //     <div class="container">
  // <h1>Login</h1>

  // <div class="row">
  //         <form>
  //           <div class="form-group">
  //             <label >Username</label>
  //             <input  
  //              type="text" 
  //             name="username"
  //             onChange={handleChange}
  //             />
  //           </div>
  //           <div class="form-group">
  //             <label >Password</label>
  //             <input 
  //             type="password"  
  //             name="password"
  //             onChange={handleChange}
  //             />
  //           </div>
  //           <button onClick={login} type="submit" class="btn btn-dark">Login</button>
  //         </form>
  //         {authentication.isLogin && (
  //         <Navigate to="/login" replace={true} />
  //       )}
  //   </div>

  // </div>
  // <div>
  //       <h1>Get User</h1>
  //       <button onClick={getUser}>Submit</button>
  //       {data ? <h1>Welcome Back {data.username}</h1> : null}
  //     </div>
  //     </div>
  //   );
  // };
  
  // export default Login;