import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./pages/fragments/Header";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import WriteDiary from "./pages/WriteDiary";
import ManageDiary from "./pages/ManageDiary";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./pages/fragments/Footer";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/write" element={<WriteDiary />} /> */}
          <Route path="/write/:selectedDate" element={<WriteDiary />} />
          <Route path="/manage" element={<ManageDiary />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}
export default App;
