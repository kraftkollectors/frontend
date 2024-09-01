"use client";
import { becomeAnArtisan } from "@/actions";
import { FormButton, FormMessage } from "@/components";
import UserAuth from "@/components/server/UserAuth";
import AppInput from "@/components/ui/AppInput";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function PersonalDetailsForm() {
  const { push } = useRouter();
  const [res, action] = useFormState(becomeAnArtisan, {});

  return (
    <form action={action}>
      <div className=" flex flex-col md:grid grid-cols-11 gap-5 md:gap-6 py-6">
        <p className="text-black-800 col-span-3">
          Occupation <i className="text-red-800">*</i>
        </p>

        <div className="col-span-5  flex flex-col gap-4">
          <AppInput
            name="areaOfSpecialization"
            error={res.fieldErrors && res.fieldErrors["areaOfSpecialization"]}
            placeholder="eg: Electrician, Mechanic, Engineer"
          />
        </div>
        <div className="col-span-3 max-md:hidden"></div>

        <p className="text-black-800 col-span-3">
          Phone Number <i className="text-red-800">*</i>
        </p>

        <div className="col-span-5  flex flex-col gap-4">
          <AppInput
            name="phoneNumber"
            error={res.fieldErrors && res.fieldErrors["phoneNumber"]}
            placeholder="081XXXXXXXX"
          />
          <div className="flex gap-2 text-secondary items-center justify-start text-label">
            <HiOutlineExclamationCircle />
            <p>Provide the phone number linked to your NIN</p>
          </div>
        </div>
        <div className="col-span-3 max-md:hidden"></div>

        <p className="text-black-800 col-span-3">
          NIN (National ID number) <i className="text-red-800">*</i>
        </p>

        <div className="col-span-5  flex flex-col gap-4">
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
          <FormButton className="btn-primary py-2 px-6  max-md:w-full min-w-40">
            Submit
          </FormButton>
        </div>
      </div>
      <UserAuth withNames />
    </form>
  );
}
