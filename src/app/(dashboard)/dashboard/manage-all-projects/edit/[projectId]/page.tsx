"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/Loading";
import toast from "react-hot-toast";

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
        toast.error("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) fetchProject();
  }, [projectId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

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

      toast.success("Project updated successfully!");
      router.push("/dashboard/manage-all-projects");
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="w-4/6 mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Project</h1>

      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={project.title}
              onChange={handleChange}
              placeholder="Project title"
              required
            />
          </div>

          {/* Thumbnail */}
          <div>
            <Label>Thumbnail URL</Label>
            <Input
              type="url"
              name="thumbnail"
              value={project.thumbnail}
              onChange={handleChange}
              placeholder="https://i.ibb.co/example-thumbnail.jpg"
              required
            />
          </div>

          {/* Project Link */}
          <div>
            <Label>Project Link (GitHub)</Label>
            <Input
              type="url"
              name="projectLink"
              value={project.projectLink}
              onChange={handleChange}
              placeholder="https://github.com/username/project"
              required
            />
          </div>

          {/* Live Site */}
          <div>
            <Label>Live Site URL</Label>
            <Input
              type="url"
              name="liveSite"
              value={project.liveSite}
              onChange={handleChange}
              placeholder="https://project.vercel.app"
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
              placeholder="Project description..."
              required
            />
          </div>

          {/* Features */}
          <div>
            <Label>Features (comma-separated)</Label>
            <Input
              type="text"
              name="features"
              value={
                Array.isArray(project.features)
                  ? project.features.join(", ")
                  : project.features
              }
              onChange={handleChange}
              placeholder="Responsive design, Dark mode, Contact form"
            />
          </div>

          <Button type="submit" disabled={saving} className="w-full">
            {saving ? "Updating..." : "Update Project"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProjectPage;
