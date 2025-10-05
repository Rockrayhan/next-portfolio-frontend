"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/Loading";

interface IProject {
  title: string;
  thumbnail: string;
  projectLink: string;
  liveSite: string;
  description: string;
  features: string[];
}

const EditProjectPage = () => {
  const { projectId } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<IProject>({
    title: "",
    thumbnail: "",
    projectLink: "",
    liveSite: "",
    description: "",
    features: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch project details by ID
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/projects/${projectId}`
        );
        const result = await res.json();
        const data = result.data || result;

        setProject({
          title: data.title || "",
          thumbnail: data.thumbnail || "",
          projectLink: data.projectLink || "",
          liveSite: data.liveSite || "",
          description: data.description || "",
          features: Array.isArray(data.features)
            ? data.features
            : data.features
            ? data.features.split(",").map((f: string) => f.trim())
            : [],
        });
      } catch (error) {
        console.error("Failed to load project:", error);
        alert("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) fetchProject();
  }, [projectId]);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  // Update project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updatedProject = {
        ...project,
        features:
          typeof project.features === "string"
            ? (project.features as string)
                .split(",")
                .map((f) => f.trim())
            : project.features,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/projects/${projectId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProject),
        }
      );

      if (!res.ok) throw new Error("Failed to update project");

      alert("✅ Project updated successfully!");
      router.push("/dashboard/manage-all-projects");
      router.refresh();
    } catch (error) {
      console.error("Error updating project:", error);
      alert("❌ Failed to update project.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading/>;

  return (
    <div className="flex justify-center items-center  bg-gray-50 w-full">
      <div className=" bg-white p-8 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Project</h1>

        <form onSubmit={handleSubmit} className="space-y-5 w-full">
          {/* Title */}
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={project.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Thumbnail */}
          <div>
            <Label>Thumbnail URL</Label>
            <Input
              type="url"
              name="thumbnail"
              placeholder="https://i.ibb.co/example-thumbnail.jpg"
              value={project.thumbnail}
              onChange={handleChange}
              required
            />
          </div>

          {/* Project Link */}
          <div>
            <Label>Project Link (GitHub)</Label>
            <Input
              type="url"
              name="projectLink"
              placeholder="https://github.com/username/project"
              value={project.projectLink}
              onChange={handleChange}
              required
            />
          </div>

          {/* Live Site */}
          <div>
            <Label>Live Site URL</Label>
            <Input
              type="url"
              name="liveSite"
              placeholder="https://project.vercel.app"
              value={project.liveSite}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              rows={4}
              value={project.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Features */}
          <div>
            <Label>Features (comma-separated)</Label>
            <Input
              type="text"
              name="features"
              placeholder="Responsive design, Dark mode, Contact form"
              value={
                Array.isArray(project.features)
                  ? project.features.join(", ")
                  : project.features
              }
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            disabled={saving}
            className="px-12"
          >
            {saving ? "Updating..." : "Update Project"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProjectPage;
