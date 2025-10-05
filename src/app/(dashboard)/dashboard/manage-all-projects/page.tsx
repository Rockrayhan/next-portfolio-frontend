"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IProject } from "@/types";

const ManageAllProjects = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`);
    const data: IProject[] = await res.json();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
        method: "DELETE",
      });

      // Remove deleted project from state
      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Failed to delete project. Try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Manage All Projects</h1>

      <div className="mb-6">
        <Link href="/dashboard/create-project">
          <Button>Add Project</Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Project Link</TableHead>
              <TableHead>Live Site</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((project) => (
              <TableRow key={project._id}>
                <TableCell className="font-bold">{project.title}</TableCell>
                <TableCell>
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>
                  <a
                    href={project.projectLink}
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    View Repo
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    href={project.liveSite}
                    target="_blank"
                    className="text-green-600 underline"
                  >
                    Live Site
                  </a>
                </TableCell>
                <TableCell>
                  {new Date(project.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Link href={`/dashboard/manage-all-projects/edit/${project._id}`}>
                    <Button size="sm">Edit</Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageAllProjects;
