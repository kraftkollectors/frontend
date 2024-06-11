"use client";

import { updateUserPhoto } from "@/actions";
import { FormButton, FormMessage, ImagePicker } from "@/components";
import AppToast from "@/components/Toast";
import UserAuth from "@/components/server/UserAuth";
import { useUserStore } from "@/state";
import { paths } from "@/utils";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function Form() {
  const {replace} = useRouter()
  const user = useUserStore(s=>s.user);
  const setUser = useUserStore(s=>s.setUser);
  const [res, action] = useFormState(updateUserPhoto, {});
  useLayoutEffect(()=>{
    if(res.success){
      setUser(res.data);
      toast(<AppToast.success message={res.success}/>);
      replace(paths.dashboard);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res])


  return (
    <form action={action} className="flex flex-col gap-6 items-center max-md:justify-center">
      <div className="col-span-full max-w-[400px]"><FormMessage res={res} /></div>
      <ImagePicker placeholder={user?.image} />
     <UserAuth />
      <FormButton className="btn-primary w-full md:w-60">Save Changes</FormButton>
    </form>
  );
}



