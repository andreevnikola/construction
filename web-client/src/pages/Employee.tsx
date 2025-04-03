import { Link, useNavigate, useParams } from "react-router";
import { IEmployee } from "../types/employee";
import { useEffect, useState } from "react";
import pb from "../lib/pocketbase";

export default function Employee() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  const [employee, setEmployee] = useState<IEmployee | null | false>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const employeeData = await pb
          .collection("employees")
          .getOne<IEmployee>(id || "");
        setEmployee(employeeData);
      } catch (error: any) {
        if (error.response.status === 404) setEmployee(false);
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, []);

  const handleDelete = async () => {
    if (employee) {
      const confirmation = confirm(
        `Are you sure you want to delete ${employee.name}?`
      );
      if (!confirmation) return;
      try {
        await pb.collection("employees").delete(employee.id || "");
        alert(`Employee ${employee.name} has been deleted!`);
        navigate("/employees");
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to={"/"}>Records</Link>
          </li>
          <li>
            <Link to={"/employees"}>Employees</Link>
          </li>
          <li>{employee && employee.name ? employee.name : "Employee"}</li>
        </ul>
      </div>
      {employee !== null ? (
        employee === false ? (
          <p>There is no such employee!</p>
        ) : (
          <>
            <section className="flex flex-col items-center gap-5 border-2 border-primary w-full px-10 py-10 rounded-xl bg-base-100">
              <div className="flex flex-col gap-6  w-fit ">
                <h2 className="text-3xl font-semibold border-l-8 -ml-6 pl-3 border-accent pr-20">
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
                <div className="flex w-full gap-2">
                  <button className="btn flex grow " disabled>
                    Update
                  </button>
                  <button
                    className="btn btn-error flex grow"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </section>
          </>
        )
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
