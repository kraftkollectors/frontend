"use client";

import { updateUserPassword } from "@/actions";
import { FormButton, FormMessage } from "@/components";
import AppToast from "@/components/Toast";
import UserAuth from "@/components/server/UserAuth";
import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import { paths } from "@/utils";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useMemo } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { z } from "zod";

export default function Form() {
  const {replace} = useRouter()
  const [res, action] = useFormState(updateUserPassword, {});
  useLayoutEffect(()=>{
    if(res.success){
      toast(<AppToast.success message={res.success}/>);
      replace(paths.dashboard);
    }
  }, [res])
  
  const formFields: AppInputProps[] = useMemo(()=>[
    {
      name: "password",
      title: "Password",
      type: "password",
      placeholder: "Password",
      schema: z.string(),
    },
    {
      name: "confirmPassword",
      title: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password",
      schema: z.string(),
    },
  ], []);

  return (
    <form action={action} className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
      <div className="col-span-full"><FormMessage res={res} /></div>
      {formFields.map(item => {
        return <AppInput key={item.name} {...item} error={res.fieldErrors && res.fieldErrors[item.name]}/>;
      })}
     <UserAuth />
      <div className="col-span-full"><FormButton className="btn-primary w-full md:w-60">Save Changes</FormButton></div>
    </form>
  );
}



