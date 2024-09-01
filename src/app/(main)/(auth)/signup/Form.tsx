"use client";

import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import { FormButton, FormMessage } from "@/components";
import { useFormState } from "react-dom";
import { register } from "@/actions";

export default function Form() {
  const [res, action] = useFormState(register, {});

  return (
    <form action={action} className="flex flex-col gap-4 py-3">
      <FormMessage res={res} />
      {loginFields.map((item) => {
        return (
          <AppInput
            key={item.name}
            {...item}
            error={res.fieldErrors ? res.fieldErrors[item.name] : undefined}
          />
        );
      })}
      <FormButton className="btn-primary">Continue</FormButton>
    </form>
  );
}

const loginFields: AppInputProps[] = [
  {
    name: "userName",
    title: "User Name",
    type: "text",
    placeholder: "User Name",
  },
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
  },
];
