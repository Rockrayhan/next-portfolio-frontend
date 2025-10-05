"use server";

import { FieldValues } from "react-hook-form";

export const Register = async (data: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res?.ok) {
    console.error("User Ragistration Failed", await res.text());
  }
  return await res.json();
};

export const Login = async (data: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res?.ok) {
    console.error("User Login Failed", await res.text());
  }
  return await res.json();
};
