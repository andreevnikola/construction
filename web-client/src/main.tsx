import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Main from "./layouts/Main";
import LandingAnalitics from "./pages/LandingAnalitics";
import Workers from "./pages/Workers";
import Projects from "./pages/Projects";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<LandingAnalitics />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/projects" element={<Projects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
