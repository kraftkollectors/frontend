'use client'
import { FaRegEdit } from "react-icons/fa";
import ProfileCategory from "./ProfileCategory";
import { useUserStore } from "@/state";
import { updateArtisanAwayMessage } from "@/actions";
import { FormMessage, FormButton } from "@/components";
import UserAuth from "@/components/server/UserAuth";
import AppInput from "@/components/ui/AppInput";
import { AlertDialog } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { IoClose } from "react-icons/io5";

export default function AwayMessage() {
    const artisan = useUserStore(s=>s.artisan);
    return (
        <ProfileCategory
        title="Away message"
        action={
          <AwayMessageModal />
        }
      >
        <p className="text-black-400">{artisan?.awayMessage}</p>
      </ProfileCategory>
    );
}

function AwayMessageModal(){
    const artisan = useUserStore(s=>s.artisan);
    const setArtisan = useUserStore(s=>s.setArtisan);
    const [open, setOpen] = useState(false);
  const [res, action] = useFormState(updateArtisanAwayMessage, {});
  useEffect(()=>{
    if(res.success){
        setArtisan(res.data);
      setOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res])

  return (
    <div>
      <AlertDialog.Root open={open} onOpenChange={(_) => setOpen(_)}>
        <AlertDialog.Trigger><button className="edit-btn">
            <FaRegEdit /> Edit
          </button></AlertDialog.Trigger>
        <AlertDialog.Content>
          <form
            action={action}
            className=" flex flex-col gap-3 items-center"
          >
            <div className="flex justify-between w-full items-center">
              <h2 className="font-semibold">{"Edit Away Message"}</h2>
              <AlertDialog.Cancel>
                <button className="icon-btn text-lg p-2">
                <IoClose />
                </button>
              </AlertDialog.Cancel>
            </div>
            <div className="w-full flex flex-col gap-3 items-stretch">
            <FormMessage res={res} />
            <UserAuth />
              <AppInput
              textarea
              rows={3}
                value={artisan?.awayMessage}
                placeholder="Away Message"
                type="text"
                name="awayMessage"
                error={res.fieldErrors && res.fieldErrors['awayMessage']}
              />
              
              <FormButton
                className="btn-dark-tiny py-2 max-md:w-full w-60 px-6 mx-auto"
              >
                <span>Save & Update</span>
              </FormButton>
            </div>
          </form>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
}