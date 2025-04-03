import { Link, Outlet, useLocation } from "react-router";

export default function Main() {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isWorker = location.pathname === "/workers";
  const isProject = location.pathname === "/projects";

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <p className="text-xl font-semibold">Construction Manager</p>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/"}>
                <u className="decoration-primary decoration-2 font-bold ">
                  Records
                </u>
              </Link>
            </li>
            <li>
              <Link to={"/workers"}>Workers</Link>
            </li>
            <li>
              <Link to={"/projects"}>Projects</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-base-200/40 min-h-screen">
        <Outlet />
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
