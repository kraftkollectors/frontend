"use client";

import { rateService } from "@/actions";
import { FormMessage, FormButton } from "@/components";
import UserAuth from "@/components/server/UserAuth";
import AppToast from "@/components/Toast";
import AppInput from "@/components/ui/AppInput";
import Rating from "@/components/ui/Rating";
import { useUserStore } from "@/state";
import { paths } from "@/utils";
import { AlertDialog } from "@radix-ui/themes";
import { useParams,useRouter } from "next/navigation";
import { useState, useLayoutEffect } from "react";
import { useFormState } from "react-dom";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

export default function WriteReview({serviceId, ownerId}:{serviceId:string; ownerId: string}) {  
  const {push} = useRouter();
  const [key, setKey] = useState('-');
  const [open, setOpen] = useState(false);
  const [res, action] = useFormState(rateService, {});
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
    // <Theme>
    <AlertDialog.Root onOpenChange={setOpen} open={open}>
      <AlertDialog.Trigger>
        <button className="btn-dark-border !text-label max-md:!font-normal p-2"> Write a review</button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <form action={action} key={key} className=" flex flex-col gap-3 text-center items-center">
          <div className="flex justify-between w-full">
            <i></i>
            <h1 className="text-center text-title font-semibold">
              Rate service
            </h1>
            <AlertDialog.Cancel>
              <button className="icon-btn p-2">
              <IoClose />
              </button>
            </AlertDialog.Cancel>
          </div>

          <p>
            Kindly provide genuine feedback to benefit both future customers and
            the artisan in attracting more clients.
          </p>
          <FormMessage res={res} />
          <div className="text-headline text-secondary-accent flex gap-1 justify-center py-4">
            <Rating />
          </div>
          <div className="w-full">
            <AppInput
              placeholder="Write Review"
              type="text"
              textarea
              name="review"
            />
          </div>
           <FormButton className="btn-dark-tiny py-3 md:w-40 max-md:w-full px-6">
            Submit
          </FormButton>
          <UserAuth />
          <input type="hidden" name="serviceId" hidden defaultValue={serviceId} />
          <input type="hidden" name="ownerId" hidden defaultValue={ownerId} />
        </form>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
