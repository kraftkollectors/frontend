'use client'

import { Popover } from "@radix-ui/themes";
import { LuArrowDownUp } from "react-icons/lu";
import Sort from "./Sort";
import { FormButton } from "@/components";
import AppToast from "@/components/Toast";
import { formDataToObject } from "@/functions/helpers";
import { useChangeSearchParams } from "@/hooks";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SORT_OPTIONS } from "@/utils/constants";

export default function SortBy() {
  const { pushParams, params } = useChangeSearchParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  function handleSubmit(e: any) {
    e.preventDefault();
    const data = formDataToObject<{
      sort?: string;
    }>(new FormData(e.target));

    if (!data.sort) return toast(<AppToast.error message="Invalid sort option" />);
    setLoading(true)
    pushParams(data);
    setTimeout(() => {
      setOpen(false)
      setLoading(false)
    }, 3000)
  }

  const sort = ()=>{
    const _sort = params.get('sort');
    if(!_sort) return SORT_OPTIONS[0].title
    return SORT_OPTIONS.filter(i=>i.value == _sort)[0].title;
  }

  useEffect(() => {
    setOpen(false)
    setLoading(false)
  }, [params])
  return (
    <Popover.Root onOpenChange={setOpen} open={open}>
      <Popover.Trigger>
        <button className=" flex gap-2 items-center text-black-500 font-semibold">
          <LuArrowDownUp />
          <p>{sort()}</p>
        </button>
      </Popover.Trigger>
      <Popover.Content>
        <form
        className="grid gap-3"
          onSubmit={handleSubmit}>

          <Sort />

          <FormButton loading={loading} className="btn-dark-tiny py-2 w-full">Apply</FormButton>
        </form>
      </Popover.Content>
    </Popover.Root>
  );
}
