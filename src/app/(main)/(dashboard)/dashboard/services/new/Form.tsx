"use client";

import AppFilePicker from "@/components/ui/AppFilePicker";
import AppInput from "@/components/ui/AppInput";
import AppSelect from "@/components/ui/AppSelect";
import { MdMyLocation } from "react-icons/md";
import {
  FileSizeValidator,
  FileTypeValidator,
} from "use-file-picker/validators";
export default function ServicesForm() {
  return (
    <form action="">
      <div className="flex flex-col gap-4">
        <div className="md:grid md:grid-cols-12 gap-4">
          <label className="col-span-3 text-black-800 font-semibold" htmlFor="">
            Title
          </label>
          <div className="col-span-5">
            {" "}
            <AppInput
              textarea
              name="title"
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
            category
          </label>
          <div className="col-span-5  flex flex-col gap-2">
            {" "}
            <AppSelect name="category" options={["select a category"]} />
            <AppSelect name="category" options={["Select A Subcategory"]} />
          </div>
          <p className="col-span-4 text-label text-black-300">
            Select the most appropriate category that aligns with your service.
            This helps users navigate and discover your offering efficiently.
            Choose wisely to attract the right audience.
          </p>
        </div>
        <div className="md:grid md:grid-cols-12 gap-4">
          <label className="col-span-3 text-black-800 font-semibold" htmlFor="">
            description
          </label>
          <div className="col-span-5">
            {" "}
            <AppInput
              textarea
              name="title"
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
            description
          </label>
          <div className="col-span-5 flex flex-col gap-2">
            {" "}
            <AppInput name="title" placeholder="Example: 20,000" rows={2} />
            <div className="flex gap-2">
              <input
                type="radio"
                hidden
                className="radio-group hidden"
                name="fixed"
                id="fixed"
                value="fixed"
              />
              <label htmlFor="fixed" className="bg-light px-3 rounded">
                fixed
              </label>
              <input
                type="radio"
                hidden
                className="radio-group hidden"
                name="hourly"
                id="hourly"
                value="hourly"
              />
              <label htmlFor="d" className="bg-light px-3 rounded">
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
            {" "}
            <AppSelect name="category" options={["select State"]} />
            <AppInput name="location" type="text" placeholder="Egbu" />
            <button className="text-primary hover:text-primary-dark flex items-center">
              <MdMyLocation />
              <span>Use Current location</span>
            </button>
          </div>
        </div>
        <div className="md:grid md:grid-cols-12 gap-4">
          <label className="col-span-3 text-black-800 font-semibold" htmlFor="">
            Cover photo
          </label>
          <div className="col-span-4">
            <AppFilePicker
              title="cover Photo"
              onSelect={(_) => {}}
              accept="image/*"
              validators={[
                new FileTypeValidator(["jpg", "png"]),
                new FileSizeValidator({
                  maxFileSize: 5 * 1024 * 1024 /* 5 MB */,
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
      </div>
    </form>
  );
}
