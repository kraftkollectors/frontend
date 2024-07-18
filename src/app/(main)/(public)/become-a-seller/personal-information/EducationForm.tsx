'use client'

import { becomeAnArtisanPersonalInfo } from "@/actions";
import { FormButton, FormMessage } from "@/components";
import AppInput from "@/components/ui/AppInput";
import { debugLog } from "@/functions/helpers";
import { useRunOnce } from "@/hooks";
import { useBecomeArtisanStore } from "@/state";
import { paths } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function EducationForm() {
  const {replace, push} = useRouter();
  const {artisan, updateArtisan} = useBecomeArtisanStore();
  useRunOnce(()=>{
    if(!artisan?.businessName) replace(paths.becomeASellerPersonalDetails);
  })
  const [res, action] = useFormState(becomeAnArtisanPersonalInfo, {});

  useEffect(()=>{
    debugLog(res.data);
    if(res.success){
      updateArtisan({...artisan, ...res.data});
      push(paths.becomeASellerIdVerification)
    }
  }, [res]);
  
  return (
    <form action={action}>
      <div className=" flex flex-col md:grid grid-cols-11 gap-5 md:gap-6 py-6">


        <p className="text-black-800 col-span-3">Work Hour</p>

        <div className="col-span-5  flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            <AppInput 
            inputProps={{
              step: "60",
            }}
            type="time" placeholder="" value="09:00" name="workHourFrom" error={res.fieldErrors && res.fieldErrors['workHourFrom']} title="open" />
            <AppInput 
            inputProps={{
              step: "60",
            }}
            type="time" placeholder="" value="17:00" name="workHourTo" error={res.fieldErrors && res.fieldErrors['workHourTo']} title="close" />
          </div>
          <div className="flex gap-2 items-center">
            <input name="showContact" type="checkBox" id="checkbox" value="true" className="rounded " />
            <label htmlFor="checkbox">
              Don&apos;t show contact after work hour
            </label>
          </div>
        </div>
        <div className="col-span-3 max-md:hidden"></div>
        <p className="text-black-800 col-span-3">Personal Website</p>

        <div className="col-span-5  flex flex-col gap-4">
          <AppInput type="url" name="website" error={res.fieldErrors && res.fieldErrors['website']} placeholder="Website Link" />
        </div>

        <div className="col-span-3 max-md:hidden"></div>
        <div className="col-span-3 max-md:hidden"></div>
        <div className="col-span-5 ">
          <FormMessage res={res} />
        </div>

        <div className="col-span-3 max-md:hidden"></div>
        <div className="col-span-3 max-md:hidden"></div>
        <div className="">
          <FormButton className="btn-primary py-2 px-6  max-md:w-full min-w-40">
            Next
          </FormButton>
        </div>
      </div>
    </form>
  );
}
