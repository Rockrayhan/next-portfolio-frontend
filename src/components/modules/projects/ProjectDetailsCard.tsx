/* eslint-disable @typescript-eslint/no-explicit-any */

import { IProject } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function ProjectDetailsCard({ project }: { project: IProject }) {
  if (!project) {
    return (
      <div className="py-20 text-center text-gray-500">Project not found.</div>
    );
  }

  
  
  return (
    <main className="max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-5xl font-bold mb-6">{project?.title}</h1>

      <div className="flex items-center gap-4 mb-8">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
          alt="project-author"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <p className="text-gray-500 text-sm">
            {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {project.thumbnail && (
        <div className="relative h-80 w-full overflow-hidden mb-6">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="rounded-lg object-cover shadow-md"
          />
        </div>
      )}

      {project.description && (
        <article className="prose prose-lg max-w-none mb-6">
          <p>{project.description}</p>
        </article>
      )}

      {project.features && project.features.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Features:</h2>
          <ul className="list-disc list-inside">
            {project.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-4">
        {project.projectLink && (
          <Link
            href={project.projectLink}
            target="_blank"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            View Code
          </Link>
        )}
        {project.liveSite && (
          <Link
            href={project.liveSite}
            target="_blank"
            className="text-green-600 dark:text-green-400 font-semibold hover:underline"
          >
            Live Demo
          </Link>
        )}
      </div>
    </main>
  );
}
