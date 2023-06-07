import React from "react";
import ReactDOM from "react-dom/client";
import {AuthProvider} from "react-auth-kit";
import Router from "./components/router"
import { BrowserRouter } from "react-router-dom";


const domNode = document.getElementById("root");
const root = ReactDOM.createRoot(domNode);
  
root.render(
<React.StrictMode>
  <AuthProvider
          authType={"cookie"}
          authName={"_auth"}
          cookieDomain="https://keep-it-all-dude-myfriend.onrender.com"
          cookieSecure={window.location.protocol === "https:"} 
        >  
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  </AuthProvider>
</React.StrictMode>
);
