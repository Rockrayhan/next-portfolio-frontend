"use client";


import { createProject } from "@/actions/create";
import Form from "next/form";

const CreateProjectPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Project</h1>

        <Form
          action={createProject}
          className="space-y-5"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="thumbnail">
              Thumbnail URL
            </label>
            <input
              type="url"
              id="thumbnail"
              name="thumbnail"
              placeholder="https://i.ibb.co/example-thumbnail.jpg"
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Project Link */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="projectLink">
              Project Link (GitHub)
            </label>
            <input
              type="url"
              id="projectLink"
              name="projectLink"
              placeholder="https://github.com/username/project"
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Live Site */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="liveSite">
              Live Site URL
            </label>
            <input
              type="url"
              id="liveSite"
              name="liveSite"
              placeholder="https://project.vercel.app"
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="features">
              Features (comma-separated)
            </label>
            <input
              type="text"
              id="features"
              name="features"
              placeholder="Responsive design, Dark mode, Contact form"
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default CreateProjectPage;
