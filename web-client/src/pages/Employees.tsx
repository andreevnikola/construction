import { useEffect, useRef, useState } from "react";
import EmployeeCreationForm from "../components/EmployeeCreationForm";
import { IEmployee } from "../types/employee";
import pb from "../lib/pocketbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import formatDate from "../lib/formatDate";

export default function Employees() {
  const [employeesList, setEmployeesList] = useState<IEmployee[]>([]);
  const [refetches, setRefetches] = useState(0);
  const visited = new Map<string, boolean>();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employees = await pb
          .collection("employees")
          .getFullList<IEmployee>({
            sort: "-created",
          });
        if (employees.length === 0) {
          alert("No employees found");
        }
        setEmployeesList(employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [refetches]);

  return (
    <div className="flex flex-col gap-8 pb-10">
      <EmployeeCreationForm
        onCreation={() => setRefetches((refetches) => refetches + 1)}
      />
      <h2 className="text-4xl font-semibold border-l-8 pl-2 border-primary mt-10">
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
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {employeesList.map((employee) => {
              console.log(employee.name + " " + visited.get(employee.name));
              const tableLine = (
                <tr
                  key={employee.id}
                  // className={visited.get(employee.name) ? "contrast-[30%]" : ""}
                >
                  <td>
                    <div className="flex w-full justify-between">
                      <span
                        className={
                          visited.get(employee.name)
                            ? "line-through decoration-2"
                            : ""
                        }
                      >
                        {employee.name}
                      </span>
                      <Link to={`/employees/${employee.name}`}>
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
                  <td className="flex flex-row justify-between">
                    <p>{formatDate(employee.created!)}</p>
                    {visited.get(employee.name) && (
                      <span className="text-base-content/50">
                        <u>archived record</u>{" "}
                        <FontAwesomeIcon icon={faBoxArchive} />
                      </span>
                    )}
                  </td>
                </tr>
              );
              visited.set(employee.name, true);
              return tableLine;
            })}
          </tbody>
        </table>
      ) : (
        <p>Loading employees...</p>
      )}
    </div>
  );
}
