"use client";
import { AlertDialog } from "@radix-ui/themes";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import AppInput from "../ui/AppInput";
import AppSelect from "../ui/AppSelect";
import { useState } from "react";
import { Education } from "./EducationCard";

export type EducationModalProps = {
  children: React.ReactNode;
  data?: Education;
  onSubmit: (data: Education) => void;
  isNew?: boolean;
};

export default function EducationModal({
  children,
  data,
  onSubmit,
  isNew = true,
}: EducationModalProps) {
  const [open, setOpen] = useState(false);
  function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const _data = data as Education;
    setOpen(false);
    onSubmit({
      ..._data,
      id: !isNew ? _data.id : Date.now().toString(),
    });
  }

  return (
    <div>
      <AlertDialog.Root open={open} onOpenChange={(_) => setOpen(_)}>
        <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
        <AlertDialog.Content>
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col gap-3 text-center items-center"
          >
            <input type="hidden" name="id" value={data?.id} />
            <div className="flex justify-between w-full">
              <h1></h1>
              <AlertDialog.Cancel>
                <IoClose />
              </AlertDialog.Cancel>
            </div>
            <div className="w-full flex flex-col gap-3 ">
              <AppInput
                value={data?.universityName}
                placeholder="University name"
                type="text"
                name="universityName"
              />
              <div className="w-full">
                <AppSelect
                  value={data?.degree}
                  name="degree"
                  options={["Degree"]}
                />
              </div>
              <AppInput
                value={data?.areaOfStudy}
                placeholder="Area of study"
                type="text"
                name="areaOfStudy"
              />
            </div>
            <div className="flex w-full gap-2">
              <div className="w-full">
                <AppSelect
                  value={data?.graduation}
                  name="graduation"
                  options={["2024"]}
                />
              </div>
              <button
                type="submit"
                className="btn-dark-tiny py-2 max-md:w-full px-6"
              >
                <span>Done</span>
              </button>
            </div>
          </form>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
}
