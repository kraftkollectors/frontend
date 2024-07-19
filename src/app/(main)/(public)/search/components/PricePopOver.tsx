"use client";

import { Popover } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import Price from "./price";
import { FormButton } from "@/components";
import AppToast from "@/components/Toast";
import { formDataToObject } from "@/functions/helpers";
import { useChangeSearchParams } from "@/hooks";
import { toast } from "react-toastify";

export default function PricePopOver() {
  const { pushParams, params } = useChangeSearchParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  function handleSubmit(e: any) {
    e.preventDefault();
    const data = formDataToObject<{
      minPrice?: string;
      maxPrice?: string;
    }>(new FormData(e.target));

    if (
      !data.minPrice ||
      !data.maxPrice
    ) return toast(<AppToast.error message="Invalid price range" />);
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
          Price <FaChevronDown />
        </button>
      </Popover.Trigger>
      <Popover.Content
        style={{
          maxWidth: 340,
        }}
      >
        <form
          onSubmit={handleSubmit} >
          <Price />

          <FormButton loading={loading} className="btn-dark-tiny py-2 w-full">Apply</FormButton>
        </form>
      </Popover.Content>
    </Popover.Root>
  );
}
