import { useState } from "react";
import pb from "../lib/pocketbase";
import { IEmployee } from "../types/employee";

export default function ProjectCreationForm({
  onCreation,
}: {
  onCreation: () => void;
}) {
  const [type, setType] = useState("obshtak");

  const handleCreation = async (e: any) => {
    e.preventDefault();

    const form = e.target.elements;

    const position = form.position.value;
    const name = form.name.value;
    const wage = form.wage.value;
    const baseline = form.baseline.value;

    const employee: IEmployee = {
      position,
      name,
      wage: Number(wage),
      baseline_income: Number(baseline),
    };

    let saved;
    try {
      saved = await pb.collection("employees").create(employee);
      alert(`Employee ${saved.name} (${saved.position}) has been created!`);
      onCreation();
      setType("obshtak");
      Array.from(e.target.elements).forEach((element: any) => {
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          element.value = "";
        }
      });
    } catch (error) {
      console.error("Error creating employee:", error);
      alert("Unable to create an given employee. Please contact the creator.");
      return;
    }

    console.log("Employee created:", saved);
  };

  return (
    <section className="w-full rounded-xl border-2 shadow shadow-primary/50 border-base-200 bg-base-100 py-10 px-8 flex items-center justify-center">
      <div className="w-full max-w-lg">
        <h2 className="text-3xl font-semibold border-l-4 -ml-4 pl-3 border-accent">
          Sign an <u className="decoration-primary font-extrabold">employee</u>
        </h2>
        <form onSubmit={handleCreation} className="flex flex-col gap-3 mt-5">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[16px]">Position:</legend>
            <select
              name="position"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="select-lg select w-full -mt-1.5"
            >
              <option>obshtak</option>
              <option>maistor</option>
            </select>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[16px]">Name:</legend>
            <input
              name="name"
              type="text"
              className="input-lg w-full input -mt-1.5"
              placeholder="Иван Божуков"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[16px]">
              Wage: (per day in BGN)
            </legend>
            <input
              name="wage"
              type="number"
              className="input-lg w-full input -mt-1.5"
              placeholder="110"
            />
            <p className="fieldset-label">
              How much you pay said worker for an 8 hour work day.
            </p>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[16px]">
              Baseline income: (per day in BGN)
            </legend>
            <input
              name="baseline"
              type="number"
              className="input-lg w-full input -mt-1.5"
              placeholder="200"
              disabled={type !== "maistor"}
            />
            <p className="fieldset-label">
              How much your company should be making to break even from his work
              day.
            </p>
          </fieldset>
          <button className="btn btn-accent btn-xl w-full">Sign</button>
        </form>
      </div>
    </section>
  );
}
