"use client";

import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import { FormButton } from "@/components";
import Link from "next/link";
import { z } from "zod";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-3 py-3">
      {loginFields.map(item => {
        return <AppInput key={item.name} {...item} />;
      })}
      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-primary r-font-semibold text-sm"
        >
          Forgot Password?
        </Link>
      </div>
      <FormButton className="btn-primary">Login</FormButton>
    </form>
  );
}

const loginFields: AppInputProps[] = [
  {
    name: "email",
    title: "Email",
    type: "email",
    placeholder: "Email Address",
    schema: z.string()
  },
  {
    name: "password",
    title: "Password",
    type: "password",
    placeholder: "Enter your Password",
    schema: z.string()
  }
];
