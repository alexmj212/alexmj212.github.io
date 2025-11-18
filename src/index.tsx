import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/tailwind.css";
import "./styles/resume.css";
import App from "./App";
import Resume from "./components/Resume";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
