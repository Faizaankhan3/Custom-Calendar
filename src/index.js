import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";


ReactDOM.render(      
  <div className="container">
    <App/>
  </div>, 
  document.getElementById("root"));
registerServiceWorker();
