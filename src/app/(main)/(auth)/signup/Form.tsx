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
      <FormButton className="btn-primary">Sign Up</FormButton>
    </form>
  );
}

const loginFields: AppInputProps[] = [
  {
    name: "displayName",
    title: "Display Name",
    type: "text",
    placeholder: "Display Name",
    schema: z.string().min(3, "display name too short")
  },
  {
    name: "email",
    title: "Email",
    type: "email",
    placeholder: "Email Address",
    schema: z.string().email("enter a vilad email")
  },
  {
    name: "password",
    title: "Password",
    type: "password",
    placeholder: "Enter your Password",
    schema: z.string()
  }
];
