'use client'

import { becomeAnArtisan } from "@/actions";
import { FormButton, FormMessage } from "@/components";
import UserAuth from "@/components/server/UserAuth";
import AppInput from "@/components/ui/AppInput";
import { debugLog, joinFormData, objectToFormData } from "@/functions/helpers";
import { useRunOnce } from "@/hooks";
import { useBecomeArtisanStore, useUserStore } from "@/state";
import { paths } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function IDForm() {
  const {replace, refresh} = useRouter();
  const user = useUserStore(s=>s.user);
  const {artisan, updateArtisan} = useBecomeArtisanStore();
  useRunOnce(()=>{
    if(!artisan?.areaOfSpecialization) replace(paths.becomeASellerPersonalInfo);
    if(!artisan?.businessName) replace(paths.becomeASellerPersonalDetails);
  })
  const [res, action] = useFormState(becomeAnArtisan, {});

  useEffect(()=>{
    if(res.data === 'refresh') refresh();
  }, [res]);
  
  return (
    <form action={(f)=>{
        const formData = joinFormData(objectToFormData(artisan), f);
        action(formData)
    }}>
      <div className=" flex flex-col md:grid grid-cols-11 gap-5 md:gap-6 py-6">
        <p className="text-black-800 col-span-3">NIN (National ID number) <i className="text-red-800">*</i></p>

        <div className="col-span-5  flex flex-col gap-4">
          <AppInput
          type="number"
            name="nin" error={res.fieldErrors && res.fieldErrors['nin']}
            placeholder="eg: Electrician, Mechanic, Engineer"
        />
        </div>
        <div className="col-span-3 max-md:hidden"></div>

       

        <div className="col-span-3 max-md:hidden"></div>
        <div className="col-span-5 ">
          <FormMessage res={res} />
        </div>
        <div className="col-span-3 max-md:hidden"></div>

        <div className="col-span-3 max-md:hidden"></div>
        {/* <div className="col-span-3 max-md:hidden"></div> */}
        <div className="">
          <FormButton className="btn-primary py-2 px-6  max-md:w-full min-w-40">
            Next
          </FormButton>
        </div>
      </div>
      <UserAuth />
      <input type="hidden" hidden name="firstName" value={user?.firstName} />
      <input type="hidden" hidden name="lastName" value={user?.lastName} />
    </form>
  );
}
