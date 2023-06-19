import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./pages/fragments/Header"
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import WriteDiary from "./pages/WriteDiary";
import ManageDiary from "./pages/ManageDiary";
import Register from "./pages/Register";
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
          <Route path="/register" element={<Register />} />
          <Route path="/write" element={<WriteDiary />} />
          <Route path="/manage" element={<ManageDiary />} />
   
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
