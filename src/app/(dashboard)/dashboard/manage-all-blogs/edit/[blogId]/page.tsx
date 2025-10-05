"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IBlog } from "@/types";
import Loading from "@/components/ui/Loading";
import toast from "react-hot-toast";

const EditBlogPage = () => {
  const { blogId } = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState<IBlog | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/blogs/${blogId}`
        );
        const data = await res.json();
        setBlog(data);
        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags.join(", "));
        setImage(data.image || "");
      } catch (error) {
        console.error("Failed to fetch blog:", error);
        toast.error("Failed to load blog details");
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${blogId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(",").map((t) => t.trim()),
          image,
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      toast.success("Blog updated successfully!");
      router.push("/dashboard/manage-all-blogs");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update blog");
    } finally {
      setUpdating(false);
    }
  };

  if (!blog) return <Loading />;

  return (
    <div className="w-4/6 mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Blog</h1>

      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            Content
          </label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            placeholder="Write your blog content here..."
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            Tags (comma separated)
          </label>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. React, Next.js, Web Development"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            Image URL
          </label>
          <Input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <Button
          onClick={handleUpdate}
          disabled={updating}
          className="w-full"
        >
          {updating ? "Updating..." : "Update Blog"}
        </Button>
      </div>
    </div>
  );
};

export default EditBlogPage;
