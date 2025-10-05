"use client";

import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="bg-black text-white lg:h-screen flex items-center">
      <div className="mx-auto max-w-screen-xl px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold sm:text-5xl leading-tight">
            Welcome to the world of
            <span className="text-indigo-500"> Khayrul Alam</span> 
          </h1>

          <p className="text-gray-300 sm:text-lg max-w-md">
            Want to build, manage, update something ?
            With your idea and my technological knowledge, lets create something amazing together.
          </p>

          <div className="flex gap-4">
            <a
              href="#about"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              About me
            </a>

            <a
              href="#blogs"
              className="inline-block border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 px-6 py-3 rounded-lg font-medium transition"
            >
              View Projects
            </a>
          </div>
        </div>

        {/* Banner Image */}
        <div className="flex justify-center">
          <Image
            src="/banner-1.jpg" // 🔹 Replace with your actual image path
            alt="Developer working on project"
            width={500}
            height={500}
            className="rounded-lg object-contain max-h-[400px] sm:max-h-[450px] lg:max-h-[500px]"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
