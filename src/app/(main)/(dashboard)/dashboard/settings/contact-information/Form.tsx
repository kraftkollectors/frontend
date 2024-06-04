"use client";

import { updateArtisanSocials } from "@/actions";
import { FormButton, FormMessage } from "@/components";
import AppToast from "@/components/Toast";
import UserAuth from "@/components/server/UserAuth";
import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import { useUserStore } from "@/state";
import { paths } from "@/utils";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { z } from "zod";

export default function Form() {

  const { replace } = useRouter()
  const { artisan, setArtisan } = useUserStore(({ artisan, setArtisan }) => ({ artisan, setArtisan }));


  const [res, action] = useFormState(updateArtisanSocials, {});
  useLayoutEffect(() => {
    if (!res.success) return;
    setArtisan(res.data)
    toast(<AppToast.success message={res?.success} />);
    replace(paths.dashboard)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res])

  if (!artisan) return <div className="skeleton h-60 w-full"></div>;
  return (
    <form action={action} className="grid sm:grid-cols-2 gap-6 items-end">

      <div className="col-span-full"><FormMessage res={res} /></div>
      {formFields.map(item => {
        return <AppInput key={item.name} {...item} value={(artisan as any)[item.name] ?? ''} />;
      })}

      <UserAuth />
      <div className="col-span-full"><FormButton className="btn-primary w-full md:w-60">Save Changes</FormButton></div>
    </form>
  );
}

const formFields: AppInputProps[] = [
  {
    name: "facebook",
    title: "Facebook Link",
    type: "url",
    placeholder: "Facebook Link",
    schema: z.string()
  },
  {
    name: "twitter",
    title: "Twitter/X Link",
    type: "url",
    placeholder: "Twitter/X Link",
    schema: z.string()
  },
  {
    name: "linkedin",
    title: "LinkedIn Link",
    type: "url",
    placeholder: "LinkedIn Link",
    schema: z.string()
  },
  {
    name: "instagram",
    title: "Instagram Link",
    type: "url",
    placeholder: "Instagram Link",
    schema: z.string()
  },
  {
    name: "website",
    type: "url",
    title: "Website Link",
    placeholder: "Website Link",
    schema: z.string()
  }
];


