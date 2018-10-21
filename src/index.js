import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import customServiceWorker from "./custom_worker.js";

ReactDOM.render(<App />, document.getElementById("root"));

// To make the app work offline
customServiceWorker();
