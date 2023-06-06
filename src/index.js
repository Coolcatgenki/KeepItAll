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
          cookieDomain={window.location.hostname}
          cookieSecure={false}
        >  
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  </AuthProvider>
</React.StrictMode>
);
