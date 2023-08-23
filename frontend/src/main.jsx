import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./App.css";

import { BrowserRouter } from "react-router-dom";
import BeerProvider from "./Provider/BeerProvider.jsx";
import BeerContext from "./contexts/BeerContext.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <BeerContext.Provider value={filter}> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </BeerContext.Provider> */}
  </React.StrictMode>
);
