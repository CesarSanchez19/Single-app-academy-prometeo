import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { setupAxiosInterceptors } from "./interceptors/axios.interceptor.js";
import { App } from "./App.jsx";
import "./index.css";

setupAxiosInterceptors();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);