import Link from "next/link";
import Image from "next/image";
import { IProject } from "@/types";

export default function ProjectCard({ project }: { project: IProject }) {
  console.log(project);

  return (
    <div className="block group transform hover:-translate-y-1 transition-transform duration-300">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
        {/* Thumbnail */}
        {project.thumbnail ? (
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="h-56 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
            No Thumbnail
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>

            <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
              {project.description}
            </p>

            {project.features && project.features.length > 0 && (
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-4">
                {project.features.slice(0, 3).map((f: string, idx: number) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-between items-center mt-4 gap-2">
            {project.projectLink && (
              <Link
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                View Code →
              </Link>
            )}

            {project.liveSite && (
              <Link
                href={project.liveSite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-600 dark:text-green-400 font-semibold hover:underline"
              >
                Live Demo →
              </Link>
            )}

            <div className="text-black">
              <Link href={`/projects/${project._id}`}> See details →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
