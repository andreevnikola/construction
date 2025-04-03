import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("scrolling to top");
    window.scrollTo({ top: 0, behavior: "smooth" }); // or "auto"
  }, [pathname]);

  return null;
}
