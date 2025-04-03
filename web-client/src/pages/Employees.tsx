import { useEffect, useRef, useState } from "react";
import EmployeeCreationForm from "../components/EmployeeCreationForm";
import { IEmployee } from "../types/employee";
import pb from "../lib/pocketbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

export default function Employees() {
  const [employeesList, setEmployeesList] = useState<IEmployee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employees = await pb
          .collection("employees")
          .getFullList<IEmployee>();
        setEmployeesList(employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-10">
      <EmployeeCreationForm />
      <h2 className="text-4xl font-semibold border-l-8 pl-2 border-primary mt-16">
        Current <u className="decoration-primary font-extrabold">employees</u>:
      </h2>
      {employeesList.length > 0 ? (
        <table>
          <thead>
            <tr className="bg-primary/30 border-b-2 border-primary">
              <th>Name</th>
              <th>Position</th>
              <th>Wage</th>
              <th>Baseline Income</th>
            </tr>
          </thead>
          <tbody>
            {employeesList.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <div className="flex w-full justify-between">
                    <span>{employee.name}</span>
                    <Link to={`/employees/${employee.id}`}>
                      <FontAwesomeIcon
                        className="text-primary"
                        icon={faArrowUpRightFromSquare}
                      />
                    </Link>
                  </div>
                </td>
                <td>{employee.position}</td>
                <td>{employee.wage + " BGN "}</td>
                <td>
                  {employee.baseline_income
                    ? employee.baseline_income + " BGN"
                    : "non specified"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading employees...</p>
      )}
    </div>
  );
}
