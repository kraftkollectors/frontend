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

export default function LocationPopOver() {
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
          location <MdMyLocation />
        </button>
      </Popover.Trigger>
      <Popover.Content>
        <form 
        onSubmit={handleSubmit}
        >
        <Location />

          <FormButton loading={loading} className="btn-dark-tiny py-2 w-full">Apply</FormButton>
        </form>
      </Popover.Content>
    </Popover.Root>
  );
}
