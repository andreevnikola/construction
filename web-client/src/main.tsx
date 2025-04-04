// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Main from "./layouts/Main";
import LandingAnalitics from "./pages/LandingAnalitics";
import Employees from "./pages/Employees";
import Employee from "./pages/Employee";
import ScrollToTop from "./components/ScrollToTop";
import Projects from "./pages/Projects";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<LandingAnalitics />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:name" element={<Employee />} />
        <Route path="/projects" element={<Projects />} />
      </Route>
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);
