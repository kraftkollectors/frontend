"use client";

import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import { FormButton, FormMessage } from "@/components";
import { useFormState } from "react-dom";
import { registerToken } from "@/actions";

export default function Form() {
  const [res, action] = useFormState(registerToken, {});

  return (
    <form action={action} className="flex flex-col gap-4 py-3">
      <FormMessage res={res} />
      {loginFields.map(item => {
        return <AppInput key={item.name} {...item} error={res.fieldErrors ? res.fieldErrors[item.name] : undefined} />;
      })}
      <FormButton className="btn-primary">Submit</FormButton>
    </form>
  );
}

const loginFields: AppInputProps[] = [
  {
    name: "token",
    title: "Verification Token",
    type: "number",
    placeholder: "Verification token",
  }
];
