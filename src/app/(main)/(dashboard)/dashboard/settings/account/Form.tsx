"use client";

import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import { z } from "zod";

export default function Form() {
  return (
    <form className="grid sm:grid-cols-2 gap-6 items-end">
      {formFields.map(item => {
        return <AppInput key={item.name} {...item} />;
      })}
    </form>
  );
}

const formFields: AppInputProps[] = [
  {
    name: "email",
    title: "Email",
    type: "email",
    placeholder: "Email address",
    schema: z.string()
  },
  {
    name: "phone",
    title: "Phone Number",
    type: "tel",
    placeholder: "Phone Number",
    schema: z.string()
  },
  {
    name: "password",
    title: "Change Password",
    type: "password",
    placeholder: "Old Password",
    schema: z.string()
  },
  {
    name: "newpassword",
    type: "password",
    placeholder: "New Password",
    schema: z.string()
  }
];
