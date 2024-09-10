"use client";

import { newService, updateService } from "@/actions";
import {
  FormButton,
  FormMessage,
  ServiceChargePicker,
  UseCurrentLocation,
} from "@/components";
import { GoogleLocationInput } from "@/components/maps";
import { GoogleLocation } from "@/components/maps/GoogleLocationInput";
import UserAuth from "@/components/server/UserAuth";
import AppFilePicker from "@/components/ui/AppFilePicker";
import AppInput from "@/components/ui/AppInput";
import AppSelect from "@/components/ui/AppSelect";
import FileInput from "@/components/ui/NewFilePicker";
import { ServiceCharge } from "@/components/ui/ServiceChargePicker";
import { useCategories, useLocation } from "@/hooks";
import { useNigerianStates } from "@/hooks/useNigerianStates";
import {
  ALLOWED_IMAGE_EXTENSIONS,
  $1MB,
  ALLOWED_VIDEO_EXTENSIONS,
} from "@/utils/constants";
import { Service } from "@/utils/types/service";
import { useLayoutEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";

import {
  FileSizeValidator,
  FileTypeValidator,
} from "use-file-picker/validators";
export default function ServicesForm({ service }: { service: Service }) {
  const [file, setFile] = useState<File>();
  const [files, setFiles] = useState<File[]>([]);
  const {
    data: states,
    isLoading: statesLoading,
    error: statesError,
  } = useNigerianStates();
  const allStates = useMemo(() => {
    return statesLoading
      ? null
      : statesError
        ? null
        : states && states !== "error" && states.length
          ? states
          : null;
  }, [states, statesLoading, statesError]);
  const [res, action] = useFormState(newService, {});
  const { data, isLoading, error, cats, subCats, onCatChange } =
    useCategories();
  const {
    location: loc,
    setLocation: setLoc,
    isLoaded,
  } = useLocation({
    address: service.address,
    latitude: Number(service.latitude),
    longitude: Number(service.longitude),
  });

  return (
    <form 
    // action={action}
    action={async (formData)=>{
      formData.append("file", file as any);
      files.forEach((file) => {
        formData.append("files", file as any);
      });
      const a = await action(formData);
      // console.log({a});
    }}
    >
      <input
        type="hidden"
        name="_id"
        value={service._id}
        className="hidden"
        hidden
      />
      <div className="flex flex-col gap-4">
        <div className="gap-4 md:grid md:grid-cols-12">
          <label className="col-span-3 font-semibold text-black-800" htmlFor="">
            Title
          </label>
          <div className="col-span-5">
            <AppInput
              textarea
              error={res.fieldErrors && res.fieldErrors["title"]}
              value={service.title}
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
        <div className="gap-4 md:grid md:grid-cols-12">
          <label className="col-span-3 font-semibold text-black-800" htmlFor="">
            Category
          </label>
          <div className="col-span-5 flex flex-col gap-2">
            <AppSelect
              error={res.fieldErrors && res.fieldErrors["category"]}
              value={service.category}
              name="category"
              onChange={onCatChange}
              readonly={isLoading || !!error || !data}
              options={cats}
            />
            <AppSelect
              error={res.fieldErrors && res.fieldErrors["subCategory"]}
              value={service.subCategory}
              name="subCategory"
              readonly={isLoading || !!error || !data}
              options={subCats}
            />
          </div>
          <p className="col-span-4 text-label text-black-300">
            Select the most appropriate category that aligns with your service.
            This helps users navigate and discover your offering efficiently.
            Choose wisely to attract the right audience.
          </p>
        </div>
        <div className="gap-4 md:grid md:grid-cols-12">
          <label className="col-span-3 font-semibold text-black-800" htmlFor="">
            Description
          </label>
          <div className="col-span-5">
            <AppInput
              textarea
              error={res.fieldErrors && res.fieldErrors["description"]}
              value={service.description}
              name="description"
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
        <div className="gap-4 md:grid md:grid-cols-12">
          <label className="col-span-3 font-semibold text-black-800" htmlFor="">
            Estimated Price (&#8358;)
          </label>
          <div className="col-span-5 flex flex-col gap-2">
            <AppInput
              error={res.fieldErrors && res.fieldErrors["estimatedPrice"]}
              value={service.estimatedPrice}
              name="estimatedPrice"
              placeholder="Example: 20,000"
              type="number"
            />
            <ServiceChargePicker value={service.charge as ServiceCharge} />
          </div>
        </div>

        <div className="gap-4 md:grid md:grid-cols-12">
          <label className="col-span-3 font-semibold text-black-800" htmlFor="">
            Service Location
          </label>
          <div className="col-span-5 flex flex-col gap-2">
            <AppSelect
              readonly={!allStates}
              error={res.fieldErrors && res.fieldErrors["state"]}
              name="state"
              options={
                allStates
                  ? allStates.map((s) => s.name)
                  : [statesLoading ? "loading..." : "error"]
              }
            />
            {isLoaded && <GoogleLocationInput onChange={setLoc} value={loc} />}
            <input type="hidden" name="address" value={loc?.address ?? ""} />
            <input type="hidden" name="latitude" value={loc?.latitude ?? ""} />
            <input
              type="hidden"
              name="longitude"
              value={loc?.longitude ?? ""}
            />
            <UseCurrentLocation onChange={setLoc} />
          </div>
        </div>
        <div className="gap-4 md:grid md:grid-cols-12">
          <label className="col-span-3 font-semibold text-black-800" htmlFor="">
            Cover photo
          </label>
          <div className="col-span-5">
            <AppFilePicker
              value={[service.coverPhoto]}
              max={1}
              name="coverPhoto"
              title="cover Photo"
              subtitle="Select 1 image up to 2MB"
              onSelect={(f) => {
                setFile(f[0]);
              }}
              notVerbose
              accept=""
              validators={[
                new FileTypeValidator(ALLOWED_IMAGE_EXTENSIONS),
                new FileSizeValidator({
                  maxFileSize: 2 * $1MB /* 2 MB */,
                }),
              ]}
            />
          </div>
        </div>
        <div className="gap-4 md:grid md:grid-cols-12">
          <label className="col-span-3 font-semibold text-black-800" htmlFor="">
            Portfolio
          </label>
          {/* <FileInput /> */}
          <div className="col-span-5">
            <AppFilePicker
              value={service.portfolio}
              name="portfolio"
              accept=""
              title="Portfolio images"
              subtitle="Select up to 5, JPG, GIF, WebM, MP4, PNG, up to 5MB"
              onSelect={(f) => {
                setFiles(f);
              }}
              notVerbose
              max={5}
              validators={[
                new FileTypeValidator([
                  ...ALLOWED_IMAGE_EXTENSIONS,
                  ...ALLOWED_VIDEO_EXTENSIONS,
                ]),
                new FileSizeValidator({
                  maxFileSize: 5 * $1MB /* 5 MB */,
                }),
              ]}
            />
          </div>
        </div>

        <div className="gap-4 md:grid md:grid-cols-12">
          <div className="col-span-3 max-md:hidden"></div>
          <div className="col-span-5">
            <FormMessage res={res} />
          </div>
        </div>
        <div className="gap-4 md:grid md:grid-cols-12">
          <div className="col-span-3 max-md:hidden"></div>
          <FormButton className="btn-primary w-full md:w-60">Submit</FormButton>
        </div>
      </div>
      <UserAuth />
    </form>
  );
}
