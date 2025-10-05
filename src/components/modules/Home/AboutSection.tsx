import Image from "next/image";

export const revalidate = 3600; // Revalidate every hour (optional)

export const metadata = {
  title: "About Me | Portfolio",
  description: "Learn more about me, my skills, and my background.",
};

// Simulating static content fetch (SSG)
async function getAboutData() {
  return {
    name: "Khayrul Alam",
    role: "Full Stack Developer",
    email: "khayrulalamdict@gmail.com",
    phone: "+88 01682 011307",
    location: "Dhaka, Bangladesh",
    bio: `I am a passionate Full Stack Developer with experience in building 
    modern, scalable web applications using technologies like Next.js, 
    Node.js, Express, MongoDB, and TypeScript. I love clean design, 
    meaningful UX, and solving real-world problems with code.`,
    image: "/about-me.webp", // Replace with your actual image path
    skills: ["Next.js", "TypeScript", "Express", "MongoDB", "Tailwind CSS"],
  };
}

export default async function AboutSection() {
  const about = await getAboutData();

  return (
    <section className="bg-slate-900 text-gray-100 min-h-screen flex items-center" id="about">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Profile Image */}
        <div className="flex justify-center">
          <Image
            src={about.image}
            alt={about.name}
            width={400}
            height={400}
            className="rounded-2xl shadow-lg object-cover w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 border border-gray-700"
            priority
          />
        </div>

        {/* About Content */}
        <div className="space-y-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-indigo-400">
            {about.name}
          </h2>
          <p className="text-lg text-gray-300">{about.role}</p>

          <p className="text-gray-400 leading-relaxed">{about.bio}</p>

          <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-300 pt-4">
            <p>
              <span className="font-semibold text-white">📍 Location:</span>{" "}
              {about.location}
            </p>
            <p>
              <span className="font-semibold text-white">📧 Email:</span>{" "}
              <a
                href={`mailto:${about.email}`}
                className="text-indigo-400 hover:underline"
              >
                {about.email}
              </a>
            </p>
            <p>
              <span className="font-semibold text-white">📞 Phone:</span>{" "}
              {about.phone}
            </p>
          </div>

          <div className="pt-6">
            <h3 className="text-xl font-semibold text-indigo-400 mb-3">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {about.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-1.5 bg-gray-800 text-gray-200 rounded-full border border-gray-700 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
