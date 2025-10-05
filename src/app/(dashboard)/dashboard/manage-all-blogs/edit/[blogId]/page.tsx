"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IBlog } from "@/types";

const EditBlogPage = () => {
  const { blogId } = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState<IBlog | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/blogs/${blogId}`
      );
      const data = await res.json();
      setBlog(data);
      setTitle(data.title);
      setContent(data.content);
      setTags(data.tags.join(", "));
      setImage(data.image || "");
    };
    fetchBlog();
  }, [blogId]);

  const handleUpdate = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${blogId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        tags: tags.split(",").map((t) => t.trim()),
        image,
      }),
    });
    router.push("/dashboard/manage-all-blogs");
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="px-4 py-10 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>
      <div className="space-y-4">
        <div>
          <label>Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content</label>
          <textarea
            className="w-full border rounded-md p-2"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label>Tags (comma separated)</label>
          <Input value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <div>
          <label>Image URL</label>
          <Input value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <Button onClick={handleUpdate}>Update Blog</Button>
      </div>
    </div>
  );
};

export default EditBlogPage;
