"use client";
import { becomeAnArtisan } from "@/actions";
import { FormButton, FormMessage } from "@/components";
import UserAuth from "@/components/server/UserAuth";
import AppInput from "@/components/ui/AppInput";
import { useUserStore } from "@/state";
import { paths } from "@/utils";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useFormState } from "react-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function PersonalDetailsForm() {
  const { replace } = useRouter();
  const [res, action] = useFormState(becomeAnArtisan, {});
  const { user, artisan } = useUserStore(({ user, artisan }) => ({
    user,
    artisan,
  }));
  useLayoutEffect(() => {
    if (artisan) replace(paths.dashboard);
    if (!user) replace(paths.login);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <form action={action}>
      <div className="flex grid-cols-11 flex-col gap-5 py-6 md:grid md:gap-6">
        <p className="col-span-3 text-black-800">
          Occupation <i className="text-red-800">*</i>
        </p>

        <div className="col-span-5 flex flex-col gap-4">
          <AppInput
            name="areaOfSpecialization"
            error={res.fieldErrors && res.fieldErrors["areaOfSpecialization"]}
            placeholder="eg: Electrician, Mechanic, Engineer"
          />
        </div>
        <div className="col-span-3 max-md:hidden"></div>

        <p className="col-span-3 text-black-800">
          Phone Number <i className="text-red-800">*</i>
        </p>

        <div className="col-span-5 flex flex-col gap-4">
          <AppInput
            name="phoneNumber"
            error={res.fieldErrors && res.fieldErrors["phoneNumber"]}
            placeholder="081XXXXXXXX"
          />
          <div className="flex items-center justify-start gap-2 text-label text-secondary">
            <HiOutlineExclamationCircle />
            <p>Provide the phone number linked to your NIN</p>
          </div>
        </div>
        <div className="col-span-3 max-md:hidden"></div>

        <p className="col-span-3 text-black-800">
          NIN (National ID number) <i className="text-red-800">*</i>
        </p>

        <div className="col-span-5 flex flex-col gap-4">
          <AppInput
            type="number"
            name="nin"
            error={res.fieldErrors && res.fieldErrors["nin"]}
            placeholder="Enter NIN"
          />
        </div>
        <div className="col-span-3 max-md:hidden"></div>

        <div className="col-span-3 max-md:hidden"></div>
        <div className="col-span-5">
          <FormMessage res={res} />
        </div>

        <div className="col-span-3 max-md:hidden"></div>
        <div className="">
          <FormButton className="btn-primary min-w-40 px-6 py-2 max-md:w-full">
            Submit
          </FormButton>
        </div>
      </div>
      <UserAuth withNames />
    </form>
  );
}
