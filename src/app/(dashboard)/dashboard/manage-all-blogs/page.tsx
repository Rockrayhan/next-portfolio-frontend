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

interface IBlog {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

const ManageAllBlogs = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`);
    const data: IBlog[] = await res.json();
    setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
        method: "DELETE",
      });
      // Remove deleted blog from state
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Failed to delete blog:", error);
      alert("Failed to delete blog. Try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Manage All Blogs</h1>

      <div className="mb-6">
        <Link href="/dashboard/create-blog">
          <Button> Add Blog </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell className="font-bold">{blog.title}</TableCell>
                <TableCell className="line-clamp-2">{blog.content}</TableCell>
                <TableCell>{blog.tags.join(", ")}</TableCell>
                <TableCell>
                  {new Date(blog.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Link href={`/dashboard/manage-all-blogs/edit/${blog._id}`}>
                    <Button size="sm">Edit</Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(blog._id)}
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

export default ManageAllBlogs;
