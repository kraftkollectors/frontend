'use client'

import { AlertDialog } from "@radix-ui/themes";
import { IoClose } from "react-icons/io5";
import AppInput from "./ui/AppInput";
import { ReactNode, useLayoutEffect, useState } from "react";
import { FormButton } from "./ui/FormButton";
import { useParams, useRouter } from "next/navigation";
import { useUserStore } from "@/state";
import { useFormState } from "react-dom";
import { reportService } from "@/actions";
import { toast } from "react-toastify";
import AppToast from "./Toast";
import { FormMessage } from "./ui/FormMessage";
import { paths } from "@/utils";
import UserAuth from "./server/UserAuth";

export type ReportDialogProps = {
  children: ReactNode;
  reportedId: string;
};
export default function ReportDialog({ children, reportedId }: ReportDialogProps) {
  const {push} = useRouter();
  const [key, setKey] = useState('-');
  const [open, setOpen] = useState(false);
  const {slug} = useParams();
  const user = useUserStore(s=>s.user);
  const [res, action] = useFormState(reportService, {});
  useLayoutEffect(()=>{
    if(res.error?.includes('not logged in')){
      setTimeout(() => {
        push(paths.login)
      }, 2000);
    }
    if(!res.success) return;
    setKey(key + '-');
    toast(<AppToast.success message={res.success} />)
    setOpen(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res])
  
  return (
    <AlertDialog.Root onOpenChange={setOpen} open={open}>
      <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
      <AlertDialog.Content>
        <form action={action} className=" flex flex-col gap-3 text-center items-center">
          <div className="flex justify-between w-full">
            <h1></h1>
            <h1 className="text-center text-title font-semibold">
              Write report
            </h1>
            <AlertDialog.Cancel>
              <button className="icon-btn p-2"><IoClose /></button>
            </AlertDialog.Cancel>
          </div>

          <p>Please type your report below to report the artisan.</p>

          <FormMessage res={res} />
          <div className="w-full">
            <AppInput
              placeholder="Write Report"
              type="text"
              textarea
              name="text"
              error={res.fieldErrors && res.fieldErrors.text}
            />
          </div>
          <FormButton className="btn-dark-tiny py-3 md:w-40 max-md:w-full px-6">
            Submit
          </FormButton>
          <input type="hidden" name="reporterId" value={user?._id} />
          <input type="hidden" name="reportedId" value={reportedId} />
          <input type="hidden" name="postId" value={slug} />
          <UserAuth />
        </form>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
