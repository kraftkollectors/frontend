"use client";

import { updateUserProfile } from "@/actions";
import { FormButton, FormMessage } from "@/components";
import AppToast from "@/components/Toast";
import UserAuth from "@/components/server/UserAuth";
import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import AppSelect, { AppSelectProps } from "@/components/ui/AppSelect";
import { useUserStore } from "@/state";
import { paths } from "@/utils";
import { GENDERS } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useMemo } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { z } from "zod";

export default function Form() {
  const user = useUserStore(s=>s.user);
  const setUser = useUserStore(s=>s.setUser);
  const {replace} = useRouter()
  const [res, action] = useFormState(updateUserProfile, {});
  useLayoutEffect(()=>{
    if(res.success){
      setUser(res.data);
      toast(<AppToast.success message={res.success}/>);
      replace(paths.dashboard);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res])
  
  const formFields: AppInputProps[] = useMemo(()=>[
    {
      name: "firstName",
      value: user?.firstName,
      title: "First Name",
      type: "text",
      placeholder: "First Name",
      schema: z.string(),
    },
    {
      name: "lastName",
      value: user?.lastName,
      title: "Last Name",
      type: "text",
      placeholder: "Last Name",
      schema: z.string(),
    },
    {
      name: "userName",
      value: user?.userName,
      title: "User Name",
      type: "text",
      placeholder: "User Name",
      schema: z.string(),
    }
  ], [user]);

  if(!user) return <div className="skeleton h-60 w-full"></div>;
  return (
    <form action={action} className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
      <div className="col-span-full"><FormMessage res={res} /></div>
      {formFields.map(item => {
        return <AppInput key={item.name} {...item} error={res.fieldErrors && res.fieldErrors[item.name]}/>;
      })}
     <AppSelect title="Gender" name="gender" value={user?.gender} options={GENDERS} />
     <UserAuth />
      <div className="col-span-full"><FormButton className="btn-primary w-full md:w-60">Save Changes</FormButton></div>
    </form>
  );
}



