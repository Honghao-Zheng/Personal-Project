import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Header from "./fragments/Header"
import querystring from "querystring";

const WriteDiary = () => {

    
    
    return (
      <div>
      
      <Header/>
      {/* <div class="container-fluid">

<div class="container">
  <div class="row">
    <div class="col">
      <%= stringDate%>
    </div>
    <div class="col">
    <%= day%>
    </div>
  </div>

</div>
<form action="/write" method="post">
<div >
    <textarea type="text" name="content" rows="8" cols="130"><%= post%></textarea>
</div>

<div >
  <button type="submit" name="numericDate" value="<%= numericDate%> ">save</button>
</div>
</form>
</div> */}
      </div>
    );
  };
  
  export default WriteDiary;


// <%- include("partials/footer") -%>
