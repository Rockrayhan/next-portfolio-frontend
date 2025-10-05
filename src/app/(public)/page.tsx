import BlogCard from "@/components/modules/Blogs/BlogCard";
import AboutSection from "@/components/modules/Home/AboutSection";
import Banner from "@/components/modules/Home/Banner";
import FeaturedProjects from "@/components/modules/Home/FeaturedProjects";
import { Button } from "@/components/ui/button";
import { IBlog } from "@/types";
import Link from "next/link";

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
      <Banner />

      <AboutSection />

      {/* Featured Blog Section */}
      <section className="py-16 bg-gray-600 text-gray-100" id="blogs">
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold mb-12 text-indigo-400">
          Featured Posts
        </h2>
        <div className="mt-2 flex justify-center">
          <span className="block w-24 h-1 bg-indigo-600 rounded-full"></span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {blogs.slice(0, 3).map((blog: IBlog) => (
            <BlogCard key={blog._id} post={blog} />
          ))}
        </div>

        <div className="flex justify-center items-center">
          <Link href="/blogs">
            <Button className="px-16 mt-12 py-6"> See More </Button>
          </Link>
        </div>
      </section>

      <FeaturedProjects />
    </div>
  );
}
