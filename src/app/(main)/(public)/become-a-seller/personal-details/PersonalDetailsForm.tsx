'use client'
import { becomeAnArtisanPersonalDetails } from "@/actions";
import { FormButton, FormMessage } from "@/components";
import AppInput from "@/components/ui/AppInput";
import AppSelect from "@/components/ui/AppSelect";
import { debugLog } from "@/functions/helpers";
import { useNigerianStates } from "@/hooks/useNigerianStates";
import { useBecomeArtisanStore } from "@/state";
import { paths } from "@/utils";
import {  State } from "@/utils/types/location";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";

export default function PersonalDetailsForm() {
  const {push} = useRouter();
  const [lgas, setLgas] = useState<string[]>([])
  const {data:states, isLoading:statesLoading, error:statesError} = useNigerianStates();
  debugLog({states});
  const allStates = useMemo(() => {
    return statesLoading ? null : statesError ? null :
    (states && states !== 'error' && states.length) ? states : null
  }, [states, statesLoading, statesError]);

  useEffect(()=>{
    if(allStates) setLgas(allStates[0].lgas)
  }, [allStates]);
  
  function changeLga(e:string){
    if(!allStates) return
    setLgas(allStates.filter(i=>i.name == e)[0].lgas)
  }

  const {artisan, updateArtisan} = useBecomeArtisanStore();
  const [res, action] = useFormState(becomeAnArtisanPersonalDetails, {});
  useEffect(()=>{
    if(res.success){
      updateArtisan(res.data);
      push(paths.becomeASellerPersonalInfo);
    }
  }, [res])

  return (
    <form action={action}>
      <div className=" flex flex-col md:grid grid-cols-11 gap-5 md:gap-6 py-6">

        <p className="text-black-800 col-span-3">
          Display Name / Business Name <i className="text-red-800">*</i>
        </p>

        <div className="col-span-8 grid md:grid-cols-2 gap-4">
          <AppInput name="businessName"
          error={res.fieldErrors && res.fieldErrors['businessName']}
           placeholder="eg Andy" />
        </div>
        <p className="text-black-800 col-span-3">Phone Number <i className="text-red-800">*</i></p>

        <div className="col-span-8 grid md:grid-cols-2 gap-4">
          <AppInput name="phoneNumber"
          error={res.fieldErrors && res.fieldErrors['phoneNumber']}
           placeholder="081XXXXXXXX" />
        </div>

        <p className="text-black-800 col-span-3">Location <i className="text-red-800">*</i></p>

        <div className="col-span-8 grid md:grid-cols-2 gap-4">
          <AppSelect
            readonly={!!(typeof states !== 'object' || !states || statesLoading || statesError)}
            name="state"
            error={res.fieldErrors && res.fieldErrors['state']}
            
            value="location"
            onChange={changeLga}
            options={allStates ? allStates.map((state:State) => state.name) : ['loading...'] }
          />
          <AppSelect
            name="lga"
            error={res.fieldErrors && res.fieldErrors['lga']}
            readonly={!!(!lgas || statesLoading || statesError || !lgas.length)}
            options={lgas ? lgas : ["loading..."] }
          />
        </div>

        <p className="text-black-800 col-span-3">Description <i className="text-red-800">*</i></p>

        <div className="col-span-8 grid md:grid-cols-2 gap-4">
          <AppInput
            name="description"
            error={res.fieldErrors && res.fieldErrors['description']}
            
            textarea
            placeholder="Write about yourself"
          />
        </div>
        <p className="text-black-800 col-span-3">facebook Link</p>

        <div className="col-span-8 grid md:grid-cols-2 gap-4">
          <AppInput name="facebook"
          error={res.fieldErrors && res.fieldErrors['facebook']}
           placeholder="Facebook.com/" />
        </div>

        <p className="text-black-800 col-span-3">instagram Link</p>

        <div className="col-span-8 grid md:grid-cols-2 gap-4">
          <AppInput name="instagram"
          error={res.fieldErrors && res.fieldErrors['instagram']}
           placeholder="instagram.com/" />
        </div>

        <p className="text-black-800 col-span-3">(x) twitter Link</p>

        <div className="col-span-8 grid md:grid-cols-2 gap-4">
          <AppInput name="twitter"
          error={res.fieldErrors && res.fieldErrors['twitter']}
           placeholder="twitter.com/" />
        </div>

        <p className="text-black-800 col-span-3">linkedin Link</p>

        <div className="col-span-8 grid md:grid-cols-2 gap-4">
          <AppInput name="linkedin"
          error={res.fieldErrors && res.fieldErrors['linkedin']}
           placeholder="linkedin.com/" />
        </div>

        <div className="col-span-3 max-md:hidden"></div>
        <div className="col-span-8 grid md:grid-cols-2 gap-4">
          <FormMessage res={res} />
        </div>

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
