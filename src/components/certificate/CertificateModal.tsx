'use client'

import { AlertDialog } from "@radix-ui/themes";
import { IoClose } from "react-icons/io5";
import AppInput from "../ui/AppInput";
import AppSelect from "../ui/AppSelect";
import { Certificate } from "./CertificateCard";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { newCertificate } from "@/actions";
import { FormMessage } from "../ui/FormMessage";
import { FormButton } from "../ui/FormButton";
import UserAuth from "../server/UserAuth";
import { getYearsBeforeToday } from "@/functions/date";

export type CertificateModalProps = {
  children: React.ReactNode;
  data?: Certificate;
  isNew?: boolean;
};


export default function CertificateModal({
  children,
  data,
  isNew = true,
}: CertificateModalProps) {
  const [open, setOpen] = useState(false);
  const [res, action] = useFormState(newCertificate, {});
  useEffect(()=>{
    if(res.data === 'success'){
      setOpen(false);
    }
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
              <h2 className="font-semibold">{isNew ? "Add certificate" : "Edit certificate"}</h2>
              <AlertDialog.Cancel>
                <button className="icon-btn text-lg p-2">
                <IoClose />
                </button>
              </AlertDialog.Cancel>
            </div>
            <div className="w-full flex flex-col gap-3">
            <FormMessage res={res} />
            <UserAuth />
              <AppInput
                value={data?.certificate}
                placeholder="Certificate"
                type="text"
                name="certificate"
                error={res.fieldErrors && res.fieldErrors['certificate']}
              />
              <AppInput
                value={data?.certifiedBy}
                placeholder="certified by"
                type="text"
                name="certifiedBy"
                error={res.fieldErrors && res.fieldErrors['certifiedBy']}
              />
            </div>
            <div className="flex w-full gap-2">
              <div className="w-full">
                <AppSelect value={data?.year} name="year" options={getYearsBeforeToday()} />
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
