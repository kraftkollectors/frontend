"use client";

import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import { FormButton } from "@/components";
import Link from "next/link";
import { z } from "zod";

export default function ResetPasswordForm() {
  return (
    <form className="flex flex-col gap-3 py-3">
      {loginFields.map(item => {
        return <AppInput key={item.name} {...item} />;
      })}
      <FormButton className="btn-primary">Reset Password</FormButton>
    </form>
  );
}

const loginFields: AppInputProps[] = [
  {
    name: "password",
    title: "Password",
    type: "password",
    placeholder: "Enter your Password",
    schema: z.string()
  },
  {
    name: "c-password",
    title: "Confirm Password",
    type: "password",
    placeholder: "Confirm Password",
    schema: z.string()
  }
];
