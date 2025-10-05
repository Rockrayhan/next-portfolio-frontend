import ProjectCard from "@/components/modules/projects/ProjectCard";
import { IProject } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Projects | Portfolio CMS",
  description: "Browse all portfolio projects.",
};

const AllProjectsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
    next: { tags: ["PROJECTS"] },
  });

  const projects = await res.json();
  // const projects = result?.data ;

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl py-5 font-bold">All Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.length > 0 ? (
          projects.map((project: IProject) => (
            <ProjectCard key={project._id} project={project} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default AllProjectsPage;
