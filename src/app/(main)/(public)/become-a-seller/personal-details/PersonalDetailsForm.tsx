import { FormButton, ImagePicker } from "@/components";
import AppInput from "@/components/ui/AppInput";
import AppSelect from "@/components/ui/AppSelect";

export default function PersonalDetailsForm() {
  return (
    <form action="">
      <div className=" flex flex-col md:grid grid-cols-11 gap-5 md:gap-6 py-6">
        <p className="text-black-800 col-span-3">Profile</p>

        <div className="col-span-8 max-md:justify-center flex">
          <ImagePicker />
        </div>

        <p className="text-black-800 col-span-3">FullName</p>

        <div className="col-span-8 grid md:grid-cols-2 gap-4">
          <AppInput name="firstname" placeholder="first Name" />
          <AppInput name="lastname" placeholder="Last Name" />
        </div>

        <p className="text-black-800 col-span-3">
          Display Name / Business Name *
        </p>

        <div className="col-span-8 grid md:grid-cols-2 gap-4">
          <AppInput name="firstname" placeholder="eg Andy" />
        </div>
        <p className="text-black-800 col-span-3">Phone Number *</p>

        <div className="col-span-8 grid md:grid-cols-2 gap-4">
          <AppInput name="firstname" placeholder="081XXXXXXXX" />
        </div>

        <p className="text-black-800 col-span-3">Location</p>

        <div className="col-span-8 grid md:grid-cols-2 gap-4">
          <AppSelect
            name="location"
            value="location"
            options={["select state"]}
          />
          <AppSelect
            name="location"
            value="location"
            options={["select area"]}
          />
        </div>

        <p className="text-black-800 col-span-3">Description *</p>

        <div className="col-span-8 grid md:grid-cols-2 gap-4">
          <AppInput
            name="firstname"
            textarea
            placeholder="Write about yourself"
          />
        </div>
        <p className="text-black-800 col-span-3">facebook Username *</p>

        <div className="col-span-8 grid md:grid-cols-2 gap-4">
          <AppInput name="firstname" placeholder="Facebook.com/" />
        </div>

        <p className="text-black-800 col-span-3">instagram Username *</p>

        <div className="col-span-8 grid md:grid-cols-2 gap-4">
          <AppInput name="firstname" placeholder="instagram.com/" />
        </div>

        <div className="col-span-3"></div>
        <div className="">
          <FormButton className="btn-primary py-2 px-6  max-md:w-full">
            Next{" "}
          </FormButton>
        </div>
      </div>
    </form>
  );
}
