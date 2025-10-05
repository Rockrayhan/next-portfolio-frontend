"use server";

import { getUserSession } from "@/helpers/getUserSession";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const create = async (data: FormData) => {
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
    redirect("/");
  }
  return result;
};
