import { AlertDialog } from "@radix-ui/themes";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import AppInput from "../ui/AppInput";
import AppSelect from "../ui/AppSelect";
import { Certificate } from "./CertificateCard";
import { useState } from "react";

export type CertificateModalProps = {
  children: React.ReactNode;
  data?: Certificate;
  onSubmit: (data: Certificate) => void;
  isNew?: boolean;
};

export default function CertificateModal({
  children,
  data,
  onSubmit,
  isNew = true,
}: CertificateModalProps) {
  const [open, setOpen] = useState(false);
  function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const _data = data as Certificate;
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
            <div className="w-full flex flex-col gap-3">
              <AppInput
                value={data?.certificate}
                placeholder="Certificate"
                type="text"
                name="certificate"
              />
              <AppInput
                value={data?.certifiedBy}
                placeholder="certified by"
                type="text"
                name="certifiedBy"
              />
            </div>
            <div className="flex w-full gap-2">
              <div className="w-full">
                <AppSelect value={data?.year} name="year" options={["Year"]} />
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
