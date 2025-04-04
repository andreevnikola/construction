import { useEffect, useState } from "react";
import ProjectCreationForm from "../components/ProjectCreationForm";
import { IProject } from "../types/project";
import pb from "../lib/pocketbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import formatDate from "../lib/formatDate";

export default function Projects() {
  const [projectsList, setProjectsList] = useState<IProject[]>([]);
  const [refetches, setRefetches] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await pb.collection("projects").getFullList<IProject>({
          sort: "-created",
        });
        if (projects.length === 0) {
          alert("No projects found");
        }
        setProjectsList(projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [refetches]);

  return (
    <div className="flex flex-col gap-8 pb-10">
      <ProjectCreationForm
        onCreation={() => setRefetches((refetches) => refetches + 1)}
      />
      <h2 className="text-4xl font-semibold border-l-8 pl-2 border-primary mt-10">
        Current <u className="decoration-primary font-extrabold">projects</u>:
      </h2>
      {projectsList.length > 0 ? (
        <table>
          <thead>
            <tr className="bg-primary/30 border-b-2 border-primary">
              <th>Name</th>
              <th>Pricetag</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {projectsList
              .filter((prj) => prj.is_active)
              .map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className="flex w-full justify-between">
                      <span>{project.name}</span>
                      <Link to={`/projects/${project.id}`}>
                        <FontAwesomeIcon
                          className="text-primary"
                          icon={faArrowUpRightFromSquare}
                        />
                      </Link>
                    </div>
                  </td>
                  <td>{project.pricetag} лв.</td>
                  <td>{formatDate(project.created!)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>Loading projects...</p>
      )}

      <h2 className="text-4xl font-semibold border-l-8 pl-2 border-secondary mt-10">
        Archived/Future{" "}
        <u className="decoration-primary font-extrabold">projects</u>:
      </h2>
      {projectsList.length > 0 ? (
        <table>
          <thead>
            <tr className="bg-secondary/30 border-b-2 border-primary">
              <th>Name</th>
              <th>Pricetag</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {projectsList
              .filter((prj) => !prj.is_active)
              .map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className="flex w-full justify-between">
                      <span>{project.name}</span>
                      <Link to={`/projects/${project.id}`}>
                        <FontAwesomeIcon
                          className="text-primary"
                          icon={faArrowUpRightFromSquare}
                        />
                      </Link>
                    </div>
                  </td>
                  <td>{project.pricetag} лв.</td>
                  <td>{formatDate(project.created!)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>Loading projects...</p>
      )}
    </div>
  );
}
