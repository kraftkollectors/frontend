"use client";

import { FormButton } from "@/components";
import AppCheckTile from "@/components/ui/AppCheckTile";
import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import AppSelect, { AppSelectProps } from "@/components/ui/AppSelect";
import { z } from "zod";

export default function Form() {
  return (
    <form className="grid sm:grid-cols-2 gap-6 items-end">
      {formFields.map(item => {
        return <AppInput key={item.name} {...item} />;
      })}
      <div>
        <h1 className="pb-1 font-[500]">Work hour</h1>
        <div className="grid grid-cols-2 gap-4 pb-1">
          {workHours.map(item => <AppSelect key={item.name} {...item} />)}
        </div>
        <AppCheckTile name="show" title="Don't show contact after work hours" />
      </div>
      <div className="col-span-full flex justify-end items-center">
        <FormButton className="btn-primary px-6 max-sm:w-full">
          Save Changes
        </FormButton>
      </div>
    </form>
  );
}

const formFields: AppInputProps[] = [
  {
    name: "facebook",
    title: "Facebook Link",
    type: "url",
    placeholder: "Facebook Link",
    schema: z.string()
  },
  {
    name: "x",
    title: "X Link",
    type: "url",
    placeholder: "X Link",
    schema: z.string()
  },
  {
    name: "instagram",
    title: "Instagram Link",
    type: "url",
    placeholder: "Instagram Link",
    schema: z.string()
  },
  {
    name: "website",
    type: "url",
    title: "Website Link",
    placeholder: "Website Link",
    schema: z.string()
  }
];

const workHours: AppSelectProps[] = [
  {
    title: "Open",
    name: "open",
    options: ["8am", "9am"]
  },
  {
    title: "Close",
    name: "close",
    options: ["8am", "9am"]
  }
];
