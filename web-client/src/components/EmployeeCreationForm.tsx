import { FormEvent } from "react";

export default function EmployeeCreationForm() {
  const handleCreation = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target;
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
              defaultValue="Obshtak"
              className="select-lg select w-full -mt-1.5"
            >
              <option>Obshtak</option>
              <option>Maistor</option>
            </select>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[16px]">Name:</legend>
            <input
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
              type="number"
              className="input-lg w-full input -mt-1.5"
              placeholder="200"
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
