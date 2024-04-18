import { FormButton } from "@/components";
import { CertificationSelector } from "@/components/certificate";
import { EducationSelector } from "@/components/education";
import AppInput from "@/components/ui/AppInput";
import AppSelect from "@/components/ui/AppSelect";

export default function EducationForm() {
  return (
    <form action="">
      <div className=" flex flex-col md:grid grid-cols-11 gap-5 md:gap-6 py-6">
        <p className="text-black-800 col-span-3">Area of specialization *</p>

        <div className="col-span-5  flex flex-col gap-4">
          <AppSelect
            name="location"
            value="location"
            options={["select a category"]}
          />
          <AppSelect
            name="location"
            value="location"
            options={["select a subcategory"]}
          />
        </div>
        <div className="col-span-3"></div>

        <p className="text-black-800 col-span-3">Certifications</p>

        <div className="col-span-5  flex flex-col gap-4">
          <CertificationSelector />
        </div>
        <div className="col-span-3"></div>

        <p className="text-black-800 col-span-3">Education</p>

        <div className="col-span-5  flex flex-col gap-4">
          <EducationSelector />
        </div>
        <div className="col-span-3"></div>

        <p className="text-black-800 col-span-3">Work Hour</p>

        <div className="col-span-5  flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            <AppSelect options={["00:00Am"]} name="open" title="open" />
            <AppSelect options={["00:00Am"]} name="open" title="close" />
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkBox" id="checkbox" className="rounded " />
            <label htmlFor="checkbox">
              Don&apos;t show contact after work hour
            </label>
          </div>
        </div>
        <div className="col-span-3"></div>
        <p className="text-black-800 col-span-3">Personal Website</p>

        <div className="col-span-5  flex flex-col gap-4">
          <AppInput type="url" name="link" placeholder="Website Link" />
        </div>

        <div className="col-span-3"></div>
        <div className="col-span-3"></div>
        <div className="col-span-5">
          <FormButton className="btn-primary py-2 px-6 w-fit">Next</FormButton>
        </div>
      </div>
    </form>
  );
}
