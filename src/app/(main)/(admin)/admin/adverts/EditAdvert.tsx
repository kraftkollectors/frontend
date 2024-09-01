/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { newAdvert } from "@/actions";
import { FormButton, FormMessage } from "@/components";
import { AdminAuth } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import SmallComponents from "@/components/SmallComponents";
import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import AppSelect from "@/components/ui/AppSelect";
import { useChangeSearchParams } from "@/hooks";
import { apis, tags } from "@/utils";
import { ADVERT_DURATIONS } from "@/utils/constants";
import { Advert } from "@/utils/types/advert";
import { Dialog, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { FaX } from "react-icons/fa6";

export default function EditAdvert() {
  const { back } = useRouter();
  const { params } = useChangeSearchParams();
  const [open, setOpen] = useState(false);
  const { isLoading, data, refetch, error } = useQuery({
    queryFn: async () => {
      const adId = params.get("advertId");
      return fetch(apis.singleAdvert(adId!)).then((v) =>
        v.json().then(v=>v.data.existingAd)
      ) as Promise<Advert>;
    },
    refetchOnMount: false,
    queryKey: ["edit_advert", params, tags.adverts],
  });
  const fields: AppInputProps[] = useMemo(
    () => [
      {
        name: "title",
        placeholder: "Title",
        title: "Title",
        value: data?.title,
      },
      {
        name: "file",
        placeholder: "Select Photo",
        title: "Image",
        type: "file",
        inputProps: {
          accept: "image/*, video/*",
        },
      },
      {
        name: "url",
        placeholder: "URL Link",
        title: "URL Link",
        type: "url",
        value: data?.url,
      },
      {
        name: "startDate",
        placeholder: "Start date",
        title: "Start Date",
        type: "date",
        readonly: false,
        value: data?.startDate,
        inputProps: {
          min: new Date().toISOString().split("T")[0],
        },
      },
    ],
    [data]
  );

  useLayoutEffect(() => {
    if (params.get("advertId")) {
      setOpen(true);
      refetch();
    } else {
      setOpen(false);
    }
  }, [params]);

  function closeModal() {
    back();
  }

  const [res, action] = useFormState(newAdvert, {});
  useEffect(() => {
    if (res.success) closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);

  return (
    <Dialog.Root open={open}>
      <Dialog.Content
        style={{
          maxWidth: 500,
        }}
      >
        <div className="flex flex-col gap-4 relative">
          <button
            onClick={closeModal}
            className="absolute icon-btn p-2 -right-2 -top-2"
          >
            <FaX />
          </button>
          <div className="aspect-square inline-flex p-3 bg-black-50 items-center rounded-full justify-center size-10 self-center">
            <AppIcons.AdminAdverts />
          </div>
          <h2 className="font-bold text-black-500 text-center">Edit Advert</h2>
          {isLoading ? (
            <SmallComponents.Loading />
          ) : error || !data ? (
            <div className="info-box">Connection failed</div>
          ) : (
            <form
              action={action}
              className="flex gap-4 flex-col [&_#Image-input]:!py-0  [&_label]:font-semibold [&_#Image-input]:pointer-events-auto [&_#Image-input]:opacity-100 "
            >
              {fields.map((field) => (
                <AppInput
                  key={field.name}
                  {...field}
                  error={res.fieldErrors && res.fieldErrors[field.name]}
                />
              ))}
              <AppSelect
                name="duration"
                title="Dutation"
                value={data.duration}
                options={ADVERT_DURATIONS}
                error={res.fieldErrors && res.fieldErrors["duration"]}
              />
              <FormMessage res={res} />
              <AdminAuth />
              <input
                type="hidden"
                name="advertId"
                value={data._id}
              />
              <input
                type="hidden"
                name="image"
                value={data.image}
              />
              <div className="pt-6 flex justify-end">
                <FormButton className="btn-dark-tiny flex-shrink-0 px-10 font-semibold py-2">
                  Save Changes
                </FormButton>
              </div>
            </form>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
