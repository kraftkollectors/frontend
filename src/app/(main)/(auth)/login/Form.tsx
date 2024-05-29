"use client";

import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import { FormButton, FormMessage } from "@/components";
import Link from "next/link";
import { login } from "@/actions";
import { useFormState } from "react-dom";

export default function LoginForm() {
    const [res, action] = useFormState(login, {});

  return (
    <form action={action} className="flex flex-col gap-3 py-3">
      <FormMessage res={res} />
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
  },
  {
    name: "password",
    title: "Password",
    type: "password",
    placeholder: "Enter your Password",
  }
];
