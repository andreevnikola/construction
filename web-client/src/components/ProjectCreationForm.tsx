import { useState } from "react";
import pb from "../lib/pocketbase";
import { IProject } from "../types/project";

export default function ProjectCreationForm({
  onCreation,
}: {
  onCreation: () => void;
}) {
  const handleCreation = async (e: any) => {
    e.preventDefault();

    const form = e.target.elements;

    const name = form.name.value;
    const pricetag = form.pricetag.value;
    const is_active = form.is_active.checked;

    const project: IProject = {
      name,
      pricetag: Number(pricetag),
      is_active,
    };

    let saved;
    try {
      saved = await pb.collection("projects").create(project);
      alert(`Project ${saved.name} (${saved.position}) has been created!`);
      onCreation();
      Array.from(e.target.elements).forEach((element: any) => {
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          element.value = "";
          element.checked = false;
        }
      });
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Unable to create an given project. Please contact the creator.");
      return;
    }

    console.log("Project created:", saved);
  };

  return (
    <section className="w-full rounded-xl border-2 shadow shadow-primary/50 border-base-200 bg-base-100 py-10 px-8 flex items-center justify-center">
      <div className="w-full max-w-lg">
        <h2 className="text-3xl font-semibold border-l-4 -ml-4 pl-3 border-accent">
          Create a <u className="decoration-primary font-extrabold">project</u>
        </h2>
        <form onSubmit={handleCreation} className="flex flex-col gap-3 mt-5">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[16px]">Name:</legend>
            <input
              name="name"
              type="text"
              className="input-lg w-full input -mt-1.5"
              placeholder="Копривщица - Къща за гости"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[16px]">
              Pricetag: (in BGN)
            </legend>
            <input
              name="pricetag"
              type="number"
              className="input-lg w-full input -mt-1.5"
              placeholder="11000"
            />
            <p className="fieldset-label">
              How much is the overall income from the given project.
            </p>
          </fieldset>
          <fieldset className="fieldset mt-3">
            <div className="flex gap-3 items-center">
              <input
                type="checkbox"
                name="is_active"
                className="toggle checked:bg-primary "
              />
              <p className="text-xl font-bold">Currently active</p>
            </div>
            <p className="fieldset-label -mt-1">
              Are you currently working on this project?
            </p>
          </fieldset>
          <button className="btn btn-accent btn-xl w-full">Create</button>
        </form>
      </div>
    </section>
  );
}
