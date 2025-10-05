import { IProject } from "@/types";
import React from "react";
import ProjectCard from "../projects/ProjectCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FeaturedProjects = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
    next: { tags: ["PROJECTS"] },
  });
  const projects: IProject[] = await res.json();

  return (
    <section className="py-20 bg-slate-900 text-gray-100" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          Featured Projects
        </h2>
        <div className="mt-2 flex justify-center">
          <span className="block w-24 h-1 bg-indigo-600 rounded-full"></span>
        </div>

        {/* Projects Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.slice(0, 3).map((project: IProject) => (
              <div
                key={project._id}
                className="transform hover:-translate-y-2 transition-all duration-300"
              >
                <ProjectCard project={project} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400 mt-10">
              No projects found.
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center">
        <Link href="/projects">
          <Button className="px-16 mt-12 py-6 bg-indigo-600"> See More </Button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProjects;
