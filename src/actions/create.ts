"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const createBlog = async (data: FormData) => {
  const blogInfo = Object.fromEntries(data.entries());

  const modifiedData = {
    ...blogInfo,
    tags: blogInfo.tags
      .toString()
      .split(",")
      .map((tag) => tag.trim()),
  };
  console.log(modifiedData);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedData),
  });
  const result = await res.json();
  console.log(result);

  if (result?.blog?._id) {
    revalidateTag('BLOGS');
    redirect("/dashboard/create-blog");
  }
  return result;
};


export const createProject = async (data: FormData) => {
  const projectInfo = Object.fromEntries(data.entries());

  const modifiedData = {
    ...projectInfo,
    features: projectInfo.features
      .toString()
      .split(",")
      .map((feature) => feature.trim()),
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedData),
  });

  const result = await res.json();
  console.log("Created project result:", result);

  if (result?.data?._id) {
    revalidateTag("PROJECTS");
    redirect("/dashboard");
  }

  return result;
};