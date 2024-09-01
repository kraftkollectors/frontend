"use client";

import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import { FormButton, FormMessage } from "@/components";
import { useFormState } from "react-dom";
import { registerDetails } from "@/actions";
import AppSelect from "@/components/ui/AppSelect";
import { GENDERS } from "@/utils/constants";

export default function Form() {
  const [res, action] = useFormState(registerDetails, {});

  return (
    <form action={action} className="flex flex-col gap-4 py-3">
      <FormMessage res={res} />
      {loginFields.map(item => {
        return <AppInput key={item.name} {...item} error={res.fieldErrors ? res.fieldErrors[item.name] : undefined} />;
      })}
      <AppSelect title="Gender" name="gender" value="male" options={GENDERS} />
      <FormButton className="btn-primary">Sign Up</FormButton>
    </form>
  );
}

const loginFields: AppInputProps[] = [
  {
    name: "firstName",
    title: "First Name",
    type: "text",
    placeholder: "First Name",
  },
  {
    name: "lastName",
    title: "Last Name",
    type: "text",
    placeholder: "Last Name",
  },
];
