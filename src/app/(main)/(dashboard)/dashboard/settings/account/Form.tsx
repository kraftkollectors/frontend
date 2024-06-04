"use client";

import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import AppSelect from "@/components/ui/AppSelect";
import { useNigerianStates } from "@/hooks/useNigerianStates";
import { useState, useMemo, useEffect, useLayoutEffect } from "react";
import { z } from "zod";
import { State } from "@/utils/types/location";
import { useFormState } from "react-dom";
import { updateArtisanProfile } from "@/actions";
import { FormButton, FormMessage } from "@/components";
import UserAuth from "@/components/server/UserAuth";
import { useUserStore } from "@/state";
import { useRouter } from "next/navigation";
import { paths } from "@/utils";
import AppToast from "@/components/Toast";
import { toast } from "react-toastify";



export default function Form() {
  const { replace } = useRouter()
  const { artisan, setArtisan } = useUserStore(({ artisan, setArtisan }) => ({ artisan, setArtisan }));
  const [lgas, setLgas] = useState<string[]>([])
  const { data: states, isLoading: statesLoading, error: statesError } = useNigerianStates();
  const allStates = useMemo(() => {
    return statesLoading ? null : statesError ? null :
      (states && states !== 'error' && states.length) ? states : null
  }, [states, statesLoading, statesError]);

  useEffect(() => {
    if (!allStates!! || !artisan) return;
    const state = artisan?.state ? artisan.state : allStates[0].name
    const i = allStates.filter(i => i.name == state)[0]
    setLgas(i.lgas)
  }, [allStates, artisan]);
  function changeLga(e: string) {
    if (!allStates) return
    setLgas(allStates.filter(i => i.name == e)[0].lgas)

  }


  const formFields: AppInputProps[] = [
    {
      name: "businessName",
      title: "Business Name",
      type: "text",
      placeholder: "Business Name",
      schema: z.string(),
      value: artisan?.businessName
    },
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "number",
      placeholder: "Phone Number",
      schema: z.string(),
      value: artisan?.phoneNumber
    },
    {
      name: "areaOfSpecialization",
      title: "Area of specialization",
      type: "text",
      placeholder: "Area of specialization",
      schema: z.string(),
      value: artisan?.areaOfSpecialization
    },
  ];

  const [res, action] = useFormState(updateArtisanProfile, {});
  useLayoutEffect(() => {
    if (!res.success) return;
    setArtisan(res.data)
    toast(<AppToast.success message={res?.success} />);
    replace(paths.dashboard)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res])

  if (!artisan) return <div className="skeleton h-60 w-full"></div>;
  return (
    <form action={action} className="grid sm:grid-cols-2 gap-6 items-start">
      <div className="col-span-full"><FormMessage res={res} /></div>
      {formFields.map(item => {
        return <AppInput key={item.name} {...item} error={res.fieldErrors && res.fieldErrors[item.name]} />;
      })}
      <i />
      <AppSelect
        readonly={!!(typeof states !== 'object' || !states || statesLoading || statesError)}
        name="state"
        error={res.fieldErrors && res.fieldErrors['state']}

        value={artisan?.state}
        onChange={changeLga}
        options={allStates ? allStates.map((state: State) => state.name) : ['loading...']}
      />
      <AppSelect
        name="lga"
        value={artisan?.lga}
        error={res.fieldErrors && res.fieldErrors['lga']}
        readonly={!!(!lgas || statesLoading || statesError || !lgas.length)}
        options={lgas ? lgas : ["loading..."]}
      />
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2">
          <AppInput
            inputProps={{
              step: "60",
            }}
            type="time" placeholder="" value={artisan?.workHourFrom} name="workHourFrom" error={res.fieldErrors && res.fieldErrors['workHourFrom']} title="open" />
          <AppInput
            inputProps={{
              step: "60",
            }}
            type="time" placeholder="" value={artisan?.workHourTo} name="workHourTo" error={res.fieldErrors && res.fieldErrors['workHourTo']} title="close" />
        </div>
        <div className="flex gap-2 items-center">
          <input name="showContact" defaultChecked={artisan?.showContact} type="checkBox" id="checkbox" value="true" className="rounded " />
          <label htmlFor="checkbox">
            Don&apos;t show contact after work hour
          </label>
        </div>
      </div>

      <UserAuth />
      <div className="col-span-full"><FormButton className="btn-primary w-full md:w-60">Save Changes</FormButton></div>
    </form>
  );
}
