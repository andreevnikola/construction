import { Link, Outlet, useLocation } from "react-router";

export default function Main() {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isWorker = location.pathname === "/employees";
  const isProject = location.pathname === "/projects";

  return (
    <>
      <div className="navbar bg-base-100/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
        <div className="flex-1">
          <p className="text-xl font-semibold">Construction Manager</p>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li
              className={
                isLanding
                  ? "underline decoration-primary decoration-2 font-bold "
                  : ""
              }
            >
              <Link to={"/"}>Records</Link>
            </li>
            <li
              className={
                isWorker
                  ? "underline decoration-primary decoration-2 font-bold "
                  : ""
              }
            >
              <Link to={"/employees"}>Employees</Link>
            </li>
            <li
              className={
                isProject
                  ? "underline decoration-primary decoration-2 font-bold "
                  : ""
              }
            >
              <Link to={"/projects"}>Projects</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full flex items-center justify-center bg-base-200/40">
        <div className="min-h-screen w-full max-w-[1300px] py-8 px-2">
          <Outlet />
        </div>
      </div>
      <div className="w-full bg-base-content">
        <div className="container mx-auto p-4">
          <p className=" text-center text-base-300">
            &copy; 2025 Construction Manager. All rights reserved.
          </p>
          <p className="text-base-300/60 text-center text-sm">
            developed by <strong>Nikola Andreev</strong> for{" "}
            <u>DDCommerce LTD</u>
          </p>
        </div>
      </div>
    </>
  );
}
