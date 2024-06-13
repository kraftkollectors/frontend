'use client'

import { Popover } from "@radix-ui/themes";
import Category from "./Category";
import { FaChevronDown } from "react-icons/fa6";
import { useChangeSearchParams } from "@/hooks";
import { FormEvent, useEffect, useState } from "react";
import { formDataToObject } from "@/functions/helpers";
import { toast } from "react-toastify";
import AppToast from "@/components/Toast";
import { FormButton } from "@/components";

export default function CategoryPopOver() {
  const {pushParams, params} = useChangeSearchParams();
  const [loading, setLoading] = useState(false);
  function handleSubmit(e:any){
    e.preventDefault();
    const data = formDataToObject<{
      category?:string;
      subCategory?:string;
    }>(new FormData(e.target));

    if(!data.category || !data.subCategory) toast(<AppToast.error message="select a category and sub-category" />);
    setLoading(true)
    pushParams(data);
    setTimeout(()=>setLoading(false), 2000)
  }

  useEffect(()=>{
    setLoading(false)
  }, [params])
  
  return (
    <Popover.Root>
      <Popover.Trigger>
        <button className="search-filter-btn">
          Category <FaChevronDown />
        </button>
      </Popover.Trigger>
      <Popover.Content
        style={{
          minWidth: 280,
        }}
      >
        <form
        onSubmit={handleSubmit}
         className="flex flex-col gap-2">
          <Category />
          <FormButton loading={loading} className="btn-dark-tiny py-2 w-full">Apply</FormButton>
        </form>
      </Popover.Content>
    </Popover.Root>
  );
}
