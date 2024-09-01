"use client";

import { updateUserNotificationSettings } from "@/actions";
import { FormButton, FormMessage } from "@/components";
import AppToast from "@/components/Toast";
import UserAuth from "@/components/server/UserAuth";
import AppCheckTile from "@/components/ui/AppCheckTile";
import { useUserStore } from "@/state";
import { paths } from "@/utils";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function Form() {
  const user = useUserStore(s => s.user);
  const setUser = useUserStore(s => s.setUser);
  const { replace } = useRouter()
  const [res, action] = useFormState(updateUserNotificationSettings, {});
  useLayoutEffect(() => {
    if (res.success) {
      setUser(res.data);
      toast(<AppToast.success message={res.success} />);
      replace(paths.dashboard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res])

  if(user)
  return (
    <form action={action} className="flex flex-col gap-4">
      <FormMessage res={res} />
      {/* <AppCheckTile name="system" title="System notifications" /> */}
      <AppCheckTile value="true" checked={user?.notify} name="notify" title="Messages" />
      <AppCheckTile value="true" checked={user?.notifyReview} name="notifyReview" title="Reviews" />
      <UserAuth />
      <div className=" flex justify-end items-center">
        <FormButton className="btn-primary px-6 max-sm:w-full">
          Save Changes
        </FormButton>
      </div>
    </form>
  );
}
