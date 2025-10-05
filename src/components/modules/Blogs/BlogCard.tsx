/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ post }: { post: any }) {
  return (
    <Link
      href={`/blogs/${post._id}`}
      className="block group transform hover:-translate-y-2 transition-transform duration-300"
    >
      <div className="bg-gray-00 dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
        {/* Image */}
        {post.image ? (
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        ) : (
          <div className="h-64 w-full bg-gray-700 flex items-center justify-center text-gray-300">
            No Image
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col justify-between h-52">
          <div>
            <h3 className="text-2xl font-semibold mb-3 group-hover:text-indigo-400 transition-colors">
              {post.title}
            </h3>

            <p className="text-gray-900 mb-4 line-clamp-4 text-sm sm:text-base">
              {post.content}
            </p>
          </div>

          <div className="mt-3 text-right">
            <span className="text-indigo-400 font-semibold text-sm hover:underline transition-colors">
              Read More →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
