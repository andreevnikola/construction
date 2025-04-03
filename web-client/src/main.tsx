// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Main from "./layouts/Main";
import LandingAnalitics from "./pages/LandingAnalitics";
import Projects from "./pages/Projects";
import Employees from "./pages/Employees";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<LandingAnalitics />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/projects" element={<Projects />} />
      </Route>
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);
