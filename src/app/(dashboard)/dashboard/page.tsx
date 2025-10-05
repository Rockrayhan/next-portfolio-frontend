import Link from "next/link";
import { getUserSession } from "@/helpers/getUserSession";

const DashboardHomePage = async () => {
  const session = await getUserSession();

  // Fetch blogs and projects count
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

  const [blogsRes, projectsRes] = await Promise.all([
    fetch(`${baseUrl}/blogs`, { cache: "no-store" }),
    fetch(`${baseUrl}/projects`, { cache: "no-store" }),
  ]);

  const blogsData = await blogsRes.json();
  console.log(blogsData);
  
  const projectsData = await projectsRes.json();
  console.log(projectsData);
  
  const blogsCount = blogsData?.length || 0;
  const projectsCount = projectsData?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Dashboard Home</h1>
        <p className="text-gray-600">
          Welcome <b>{session?.user?.name}</b> 👋
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* Blogs Card */}
        <Link
          href="/dashboard/manage-all-blogs"
          className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center justify-center"
        >
          <h2 className="text-xl font-semibold mb-2">Blogs</h2>
          <p className="text-4xl font-bold text-blue-600">{blogsCount}</p>
          <span className="text-gray-500 mt-2">Total Blogs</span>
        </Link>

        {/* Projects Card */}
        <Link
          href="/dashboard/manage-all-projects"
          className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center justify-center"
        >
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <p className="text-4xl font-bold text-green-600">{projectsCount}</p>
          <span className="text-gray-500 mt-2">Total Projects</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHomePage;
