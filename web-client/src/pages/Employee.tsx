import { Link, useParams } from "react-router";
import { IEmployee } from "../types/employee";
import { useEffect, useState } from "react";
import pb from "../lib/pocketbase";

export default function Employee() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  const [employee, setEmployee] = useState<IEmployee | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const employeeData = await pb
          .collection("employees")
          .getOne<IEmployee>(id || "");
        setEmployee(employeeData);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, []);

  return (
    <>
      {employee ? (
        <>
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to={"/"}>Records</Link>
              </li>
              <li>
                <Link to={"/employees"}>Employees</Link>
              </li>
              <li>{employee.name}</li>
            </ul>
          </div>
          <section className="flex flex-col items-center gap-5 border-2 border-primary w-full px-10 py-10 rounded-xl bg-base-100">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-semibold border-l-8 -ml-6 pl-3 border-accent">
                Employee{" "}
                <u className="decoration-primary font-extrabold">details</u>:
              </h2>
              <div className="flex flex-col gap-5 text-lg">
                <p className="flex justify-between">
                  <strong>Name:</strong> <span>{employee.name}</span>
                </p>
                <p className="flex justify-between">
                  <strong>Position:</strong> <span>{employee.position}</span>
                </p>
                <p className="flex justify-between">
                  <strong>Wage:</strong> <span>{employee.wage} BGN</span>
                </p>
                <p className="flex justify-between">
                  <strong>Baseline Income:</strong>{" "}
                  {employee.baseline_income
                    ? employee.baseline_income + " BGN"
                    : "N/A"}
                </p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
