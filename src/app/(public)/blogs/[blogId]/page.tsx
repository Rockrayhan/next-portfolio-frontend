import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";
import { IBlog } from "@/types";
import React from "react";

export const revalidate = 60;

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
    next: {
      tags: ["BLOGS"],
    },
  });
  const blogs = await res.json();

  return blogs.slice(0, 2).map((blog: IBlog) => ({
    blogId: String(blog._id),
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blogs/${blogId}`
  );
  const blog = await res.json();

  return {
    title: blog?.title,
  };
};

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blogs/${blogId}`
  );
  const blog = await res.json();
  return (
    <div className="px-4 max-w-7xl mx-auto">

      <h1> blog details page  {blogId}  </h1>

      <BlogDetailsCard blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;
