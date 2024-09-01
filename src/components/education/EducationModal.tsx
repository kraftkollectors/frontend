"use client";
import { AlertDialog } from "@radix-ui/themes";
import { IoClose } from "react-icons/io5";
import AppInput from "../ui/AppInput";
import AppSelect from "../ui/AppSelect";
import { useEffect, useState } from "react";
import { Education } from "@/utils/types/education";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import UserAuth from "../server/UserAuth";
import { FormButton } from "../ui/FormButton";
import { FormMessage } from "../ui/FormMessage";
import { getYearsBeforeToday } from "@/functions/date";
import { ARTISAN_DEGREE_TYPES } from "@/utils/constants";
import { newEducation } from "@/actions";

export type EducationModalProps = {
  children: React.ReactNode;
  data?: Education;
  // onSubmit: (data: Education) => void;
  isNew?: boolean;
};

export default function EducationModal({
  children,
  data,
  // onSubmit,
  isNew = true,
}: EducationModalProps) {
  const [open, setOpen] = useState(false);
  let [res, action] = useFormState(newEducation, {});
  const { refresh } = useRouter()
  useEffect(() => {
    if (res.data === 'success') {
      setOpen(false);
    }
    return () => {res = {}};
  }, [res])

  return (
    <div>
      <AlertDialog.Root open={open} onOpenChange={(_) => setOpen(_)}>
        <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
        <AlertDialog.Content>
          <form
            action={action}
            className=" flex flex-col gap-3"
          >
            {!isNew && <input type="hidden" name="_id" value={data?._id} />}
            <div className="flex justify-between w-full">
            <h2 className="font-semibold">{isNew ? "Add education" : "Edit education"}</h2>
              <AlertDialog.Cancel>
                <button className="icon-btn text-lg p-2">
                <IoClose />
                </button>
              </AlertDialog.Cancel>
            </div>
            <FormMessage res={res} />
            <UserAuth />
            <div className="w-full flex flex-col gap-3 ">
              <AppInput
                value={data?.university}
                placeholder="University name"
                type="text"
                name="university"
                error={res.fieldErrors && res.fieldErrors['university']}
              />
              <div className="w-full">
                <AppSelect
                  value={data?.degree}
                  name="degree"
                  options={ARTISAN_DEGREE_TYPES}
                />
              </div>
              <AppInput
                value={data?.areaOfStudy}
                placeholder="Area of study"
                type="text"
                name="areaOfStudy"
                error={res.fieldErrors && res.fieldErrors['areaOfStudy']}
              />
            </div>
            <div className="flex w-full gap-2">
              <div className="w-full">
                <AppSelect
                  value={data?.year}
                  name="year"
                  options={getYearsBeforeToday()}
                />
              </div>
              <FormButton
                className="btn-dark-tiny py-2 max-md:w-full px-6"
              >
                <span>Done</span>
              </FormButton>
            </div>
          </form>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
}
