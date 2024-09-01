'use client'
import { FaRegEdit } from "react-icons/fa";
import ProfileCategory from "./ProfileCategory";
import { useUserStore } from "@/state";
import { updateArtisanDescription } from "@/actions";
import { FormMessage, FormButton } from "@/components";
import UserAuth from "@/components/server/UserAuth";
import AppInput from "@/components/ui/AppInput";
import { AlertDialog } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { IoClose } from "react-icons/io5";

export default function Description() {
    const artisan = useUserStore(s=>s.artisan);
    return (
        <ProfileCategory
        title="Description"
        action={
          <DescriptionModal />
        }
      >
        <p className="text-black-400">{artisan?.description}</p>
      </ProfileCategory>
    );
}

function DescriptionModal(){
    const artisan = useUserStore(s=>s.artisan);
    const setArtisan = useUserStore(s=>s.setArtisan);
    const [open, setOpen] = useState(false);
  const [res, action] = useFormState(updateArtisanDescription, {});
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
              <h2 className="font-semibold">{"Edit description / bio"}</h2>
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
                value={artisan?.description}
                placeholder="Description / bio"
                type="text"
                name="description"
                error={res.fieldErrors && res.fieldErrors['description']}
              />
              
              <FormButton
                className="btn-dark-tiny py-2 max-md:w-full w-60 px-6 mx-auto"
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