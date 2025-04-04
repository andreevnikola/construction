import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { IProject } from "../types/project";
import pb from "../lib/pocketbase";
import formatDate from "../lib/formatDate";

export default function Project() {
  let { id } = useParams();
  const [project, setProject] = useState<IProject | undefined | false>(
    undefined
  );

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await pb
          .collection("projects")
          .getOne<IProject>(id || "");
        setProject(projectData);
      } catch (error: any) {
        if (error.response.status === 404) setProject(false);
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, []);

  return (
    <>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to={"/"}>Records</Link>
          </li>
          <li>
            <Link to={"/projects"}>Projects</Link>
          </li>
          <li>{project ? project.name : id}</li>
        </ul>
      </div>
      {project === undefined && <p>Loading Project...</p>}
      {project === false && <p>There is no such project!</p>}
      {project && (
        <section
          style={{
            borderColor: project.is_active
              ? "var(--color-primary)"
              : "var(--color-secondary)",
          }}
          className="border-2 relative px-8 py-14 w-full rounded-xl bg-base-100 flex items-center justify-center"
        >
          <div className=" absolute top-2 right-4 flex flex-col justify-center items-right">
            <p className="w-full text-right text-sm text-base-content/60 -mb-1">
              created at:
            </p>
            <p
              className={
                project.is_active
                  ? "font-black text-xl text-primary"
                  : "font-black text-xl text-secondary"
              }
            >
              {formatDate(project.created!)}
            </p>
          </div>
          <div className="max-w-md w-full">
            <div className="flex flex-row justify-between">
              <h2
                style={{
                  borderLeftColor: project.is_active
                    ? "var(--color-primary)"
                    : "var(--color-secondary)",
                }}
                className="text-3xl font-semibold border-l-8 -ml-6 pl-3 pr-20"
              >
                Project{" "}
                <u
                  className={
                    project.is_active
                      ? "font-extrabold decoration-primary"
                      : "decoration-secondary font-extrabold"
                  }
                >
                  details
                </u>
                :
              </h2>
            </div>
            <div className="flex flex-col gap-5 mt-5">
              <div className="flex flex-row justify-between">
                <h3 className="text-lg font-semibold">Project name:</h3>
                <p className="text-lg">{project.name}</p>
              </div>
              <div className="flex flex-row justify-between">
                <h3 className="text-lg font-semibold">Pricetag:</h3>
                <p className="text-lg">{project.pricetag} лв.</p>
              </div>
              <div className="flex flex-row justify-between">
                <h3 className="text-lg font-semibold">Status:</h3>
                <p
                  className={
                    project.is_active
                      ? "text-lg text-primary font-bold"
                      : "text-lg text-secondary font-bold"
                  }
                >
                  {project.is_active
                    ? "Currently in progress"
                    : "Waiting to start work / Finished"}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
