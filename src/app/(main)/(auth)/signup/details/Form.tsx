"use client";

import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import { FormButton, FormMessage } from "@/components";
import { useFormState } from "react-dom";
import { registerDetails } from "@/actions";

export default function Form() {
  const [res, action] = useFormState(registerDetails, {});

  return (
    <form action={action} className="flex flex-col gap-4 py-3">
      <FormMessage res={res} />
      {loginFields.map(item => {
        return <AppInput key={item.name} {...item} error={res.fieldErrors ? res.fieldErrors[item.name] : undefined} />;
      })}
      <FormButton className="btn-primary">Sign Up</FormButton>
    </form>
  );
}

const loginFields: AppInputProps[] = [
  {
    name: "first_name",
    title: "First Name",
    type: "text",
    placeholder: "First Name",
  },
  {
    name: "last_name",
    title: "Last Name",
    type: "text",
    placeholder: "Last Name",
  },
  {
    name: "other_names",
    title: "Other Names",
    type: "text",
    placeholder: "Other Names",
  },
];
