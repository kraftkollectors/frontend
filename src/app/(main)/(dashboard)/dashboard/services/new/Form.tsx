"use client";

import { newService } from "@/actions";
import { FormButton, FormMessage, UseCurrentLocation } from "@/components";
import UserAuth from "@/components/server/UserAuth";
import AppFilePicker from "@/components/ui/AppFilePicker";
import AppInput from "@/components/ui/AppInput";
import AppSelect from "@/components/ui/AppSelect";
import { debugLog } from "@/functions/helpers";
import { useLayoutEffect } from "react";
import { useFormState } from "react-dom";
import { MdMyLocation } from "react-icons/md";

import {
  FileSizeValidator,
  FileTypeValidator,
} from "use-file-picker/validators";
export default function ServicesForm() {
  const [res, action] = useFormState(newService, {});

  useLayoutEffect(()=>{
    if(!res.success) return;
    
  }, [res])
  
  return (
    <form action={action}>
      <div className="flex flex-col gap-4">
        <div className="md:grid md:grid-cols-12 gap-4">
          <label className="col-span-3 text-black-800 font-semibold" htmlFor="">
            Title
          </label>
          <div className="col-span-5">
            <AppInput
              textarea
              error={res.fieldErrors && res.fieldErrors['title']} name="title"
              placeholder="Example: I will plan and manage your event...."
              rows={2}
            />
          </div>
          <p className="col-span-4 text-label text-black-300">
            Use relevant keywords is crucial for potential buyers to find your
            service easily. Ensure it reflects the essence of your offering
            effectively.
          </p>
        </div>
        <div className="md:grid md:grid-cols-12 gap-4">
          <label className="col-span-3 text-black-800 font-semibold" htmlFor="">
            Category
          </label>
          <div className="col-span-5  flex flex-col gap-2">
            <AppSelect error={res.fieldErrors && res.fieldErrors['category']} name="category" options={["select a category"]} />
            <AppSelect error={res.fieldErrors && res.fieldErrors['subCategory']} name="subCategory" options={["Select A Subcategory"]} />
          </div>
          <p className="col-span-4 text-label text-black-300">
            Select the most appropriate category that aligns with your service.
            This helps users navigate and discover your offering efficiently.
            Choose wisely to attract the right audience.
          </p>
        </div>
        <div className="md:grid md:grid-cols-12 gap-4">
          <label className="col-span-3 text-black-800 font-semibold" htmlFor="">
            Description
          </label>
          <div className="col-span-5">
            <AppInput
              textarea
              error={res.fieldErrors && res.fieldErrors['description']} name="description"
              placeholder="Example: I will plan and manage your event...."
              rows={2}
            />
          </div>
          <p className="col-span-4 text-label text-black-300">
            Provide a concise yet comprehensive overview of your service. Craft
            your description thoughtfully to entice and inform your audience
            effectively
          </p>
        </div>
        <div className="md:grid md:grid-cols-12 gap-4">
          <label className="col-span-3 text-black-800 font-semibold" htmlFor="">
            Estimated Price (&#8358;)
          </label>
          <div className="col-span-5 flex flex-col gap-2">
            <AppInput error={res.fieldErrors && res.fieldErrors['estimatedPrice']} name="estimatedPrice" placeholder="Example: 20,000" type="number" />
            <div className="flex gap-2">
              <input
              name="charge"
                type="radio"
                hidden
                className="radio-group hidden"
                id="fixed"
                value="fixed"
                defaultChecked
              />
              <label htmlFor="fixed" className="bg-light px-3 rounded">
                fixed
              </label>
              <input
              name="charge"
                type="radio"
                hidden
                className="radio-group hidden"
                id="hourly"
                value="hourly"
              />
              <label htmlFor="hourly" className="bg-light px-3 rounded">
                Hourly
              </label>
            </div>
          </div>
        </div>

        <div className="md:grid md:grid-cols-12 gap-4">
          <label className="col-span-3 text-black-800 font-semibold" htmlFor="">
            Service Location
          </label>
          <div className="col-span-5  flex flex-col gap-2">
            <AppSelect error={res.fieldErrors && res.fieldErrors['state']} name="state" options={["select State"]} />
            <AppInput error={res.fieldErrors && res.fieldErrors['address']} name="address" type="text" placeholder="Egbu" />
            <UseCurrentLocation />
          </div>
        </div>
        <div className="md:grid md:grid-cols-12 gap-4">
          <label className="col-span-3 text-black-800 font-semibold" htmlFor="">
            Cover photo
          </label>
          <div className="col-span-4">
            <AppFilePicker
            name="coverPhoto"
              title="cover Photo"
              onSelect={(_) => {}}
              accept="image/*"
              validators={[
                new FileTypeValidator(["jpg", "png", "jpeg"]),
                new FileSizeValidator({
                  maxFileSize: 2 * 1024 * 1024 /* 2 MB */,
                }),
              ]}
            />
          </div>
        </div>
        <div className="md:grid md:grid-cols-12 gap-4">
          <label className="col-span-3 text-black-800 font-semibold" htmlFor="">
            Portfolio
          </label>
          <div className="col-span-4">
            <AppFilePicker
            name="portfolio"
              accept=""
              title="cover Photo"
              subtitle="JPG, GIF, WebM, MP4, PNG, up to 5MB"
              onSelect={(_) => {}}
              validators={[
                new FileTypeValidator([
                  "jpg",
                  "png",
                  "webm",
                  "png",
                  "gif",
                  "mp4",
                ]),
                new FileSizeValidator({
                  maxFileSize: 5 * 1024 * 1024 /* 5 MB */,
                }),
              ]}
            />
          </div>
        </div>

        <div className="md:grid md:grid-cols-12 gap-4">
          <div className="col-span-3 max-md:hidden"></div>
          <div className="col-span-5">
            <FormMessage res={res} />
          </div>
        </div>
        <div className="md:grid md:grid-cols-12 gap-4">
          <div className="col-span-3 max-md:hidden"></div>
          <FormButton className="btn-primary w-full md:w-60">Submit</FormButton>
        </div>
      </div>
      <UserAuth />
    </form>
  );
}
