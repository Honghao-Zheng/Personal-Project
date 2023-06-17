import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./pages/fragments/Header"
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
function App() {
//   const [authentication, setAuthentication] = useState({
//     userName:null,
//     isLogin:false
// });

// useEffect(() => {
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
    <div >

      {/* <Header
        isLogin={authentication.isLogin}
        userName={authentication.userName}
      /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
   
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
