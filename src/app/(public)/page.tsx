import BlogCard from "@/components/modules/Blogs/BlogCard";
import Hero from "@/components/modules/Home/Hero";
import { IBlog } from "@/types";

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
    next: {
      tags: ["BLOGS"],
    },
  });
  const blogs = await res.json();
  console.log(blogs);

  return (
    <div>
      <Hero />
      <h2 className="text-center my-5 text-4xl">Featured Posts</h2>

      <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
        {blogs.slice(0, 3).map((blog: IBlog) => (
          <BlogCard key={blog._id} post={blog} />
        ))}
      </div>
    </div>
  );
}
