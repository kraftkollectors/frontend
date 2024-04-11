"use client";

import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import AppSelect, { AppSelectProps } from "@/components/ui/AppSelect";
import { z } from "zod";

export default function Form() {
  return (
    <form className="grid sm:grid-cols-2 gap-6 items-end">
      {formFields.map(item => {
        return <AppInput key={item.name} {...item} />;
      })}
      <i />
      {selectFields.map(item => {
        return <AppSelect key={item.name} {...item} />;
      })}
    </form>
  );
}

const formFields: AppInputProps[] = [
  {
    name: "firstname",
    title: "First Name",
    type: "text",
    placeholder: "First Name",
    schema: z.string()
  },
  {
    name: "lastname",
    title: "Last Name",
    type: "text",
    placeholder: "Last Name",
    schema: z.string()
  },
  {
    name: "displayname",
    title: "Display Name",
    type: "text",
    placeholder: "Display Name",
    schema: z.string()
  }
];

const selectFields: AppSelectProps[] = [
  {
    name: "state",
    title: "Location",
    options: ["hello", "hi"]
  },
  {
    name: "lga",
    title: "",
    options: ["hello", "hi"]
  }
];
