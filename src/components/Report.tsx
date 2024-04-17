import { Theme, AlertDialog } from "@radix-ui/themes";
import { IoClose } from "react-icons/io5";
import AppInput from "./ui/AppInput";
import { ReactNode } from "react";

export type ReportDialogProps = {
  children: ReactNode;
};
export default function ReportDialog({ children }: ReportDialogProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
      <AlertDialog.Content>
        <form className=" flex flex-col gap-3 text-center items-center">
          <div className="flex justify-between w-full">
            <h1></h1>
            <h1 className="text-center text-title font-semibold">
              Write report
            </h1>
            <AlertDialog.Cancel>
              <IoClose />
            </AlertDialog.Cancel>
          </div>

          <p>Please type your report below to report the artisan.</p>

          <div className="w-full">
            <AppInput
              placeholder="Write Report"
              type="text"
              textarea
              name="report"
            />
          </div>
          <button className="btn-dark-tiny py-2 max-md:w-full px-6">
            Submit
          </button>
        </form>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
