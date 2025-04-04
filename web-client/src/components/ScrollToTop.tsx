import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      console.log("scrolling to top");
      window.scrollTo({ top: 0, behavior: "smooth" }); // or "auto"
    }, 100);
  }, [pathname]);

  return null;
}
