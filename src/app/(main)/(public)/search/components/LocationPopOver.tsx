'use client'

import { FormButton, UseCurrentLocation } from "@/components";
import { Popover } from "@radix-ui/themes";
import { MdMyLocation } from "react-icons/md";
import Location from "./Location";
import AppToast from "@/components/Toast";
import { formDataToObject } from "@/functions/helpers";
import { useChangeSearchParams } from "@/hooks";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaChevronDown } from "react-icons/fa6";

export default function LocationPopOver() {
  const { pushParams, params } = useChangeSearchParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  function handleSubmit(e: any) {
    e.preventDefault();
    const data = formDataToObject<{
      latitude?: string;
      longitude?: string;
      address?: string;
      radius?: string;
    }>(new FormData(e.target));

    if (
      !data.latitude ||
      !data.longitude ||
      !data.address ||
      !data.radius
    ) return toast(<AppToast.error message="Invalid location selected" />);
    setLoading(true)
    pushParams(data);
    setTimeout(() => {
      setOpen(false)
      setLoading(false)
    }, 3000)
  }

  useEffect(() => {
    setOpen(false)
    setLoading(false)
  }, [params])

  return (
    <Popover.Root onOpenChange={setOpen} open={open}>
      <Popover.Trigger>
        <button className="search-filter-btn">
          Distance <FaChevronDown />
        </button>
      </Popover.Trigger>
      <Popover.Content style={{minWidth: 320, maxWidth: 400}}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
        >
          <Location />

          <FormButton loading={loading} className="btn-dark-tiny py-2 w-full">Apply</FormButton>
        </form>
      </Popover.Content>
    </Popover.Root>
  );
}
