import BlogCard from "@/components/modules/Blogs/BlogCard";
import { IBlog } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs | Next Blog",
  description: "Browse all blogs posts on web development.",
};

const AllBlogsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
    next: {
      tags: ["BLOGS"],
    },
  });
  const blogs = await res.json();
  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl py-5 font-bold">All Blogs</h2>

      <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
        {blogs.map((blog: IBlog) => (
          <BlogCard key={blog._id} post={blog} />
        ))}
      </div>
    </div>
  );
};

export default AllBlogsPage;
