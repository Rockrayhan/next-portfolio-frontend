import ProjectDetailsCard from "@/components/modules/projects/ProjectDetailsCard";
import {  IProject } from "@/types";
import React from "react";

export const revalidate = 60;

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
    next: {
      tags: ["PROJECTS"],
    },
  });
  const blogs = await res.json();

  return blogs.slice(0, 2).map((project: IProject) => ({
    projectId: String(project._id),
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/projects/${projectId}`
  );
  const project = await res.json();

  return {
    title: project?.title,
  };
};

const ProjectDetailsPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/projects/${projectId}`
  );
  const result = await res.json();
  const project = result?.data ;
  return (
    <div className="px-4 max-w-7xl mx-auto">

      <ProjectDetailsCard project={project}/>
    </div>
  );
};

export default ProjectDetailsPage;
