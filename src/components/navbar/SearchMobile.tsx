"use client";

import Sort from "@/app/(main)/(public)/search/components/Sort";
import Price from "@/app/(main)/(public)/search/components/price";
import Location from "@/app/(main)/(public)/search/components/Location";
import AppIcons from "../AppIcons";
import Category from "@/app/(main)/(public)/search/components/Category";
import { IoCloseSharp, IoFilterOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { formDataToObject } from "@/functions/helpers";
import { useChangeSearchParams } from "@/hooks";
import { toast } from "react-toastify";
import AppToast from "../Toast";
import { FormButton } from "../ui/FormButton";
import { SearchPageParams } from "@/utils/types/search";
import { useParams } from "next/navigation";
import { paths } from "@/utils";

export default function SearchMobile() {
  const { query } = useParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (document)
      if (open) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "auto";
  }, [open]);
  const q = typeof query == 'string' ? query : (query ?? []).join(' ')
  const { pushParams, params } = useChangeSearchParams(q ? paths.search(q) : paths.search());
  const [loading, setLoading] = useState(false);
  function handleSubmit(e: any) {
    e.preventDefault();
    const data = formDataToObject<SearchPageParams>(new FormData(e.target));
    setLoading(true)
    pushParams(data as any);
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
    <>
      <button className="filter-btn" onClick={() => setOpen(true)}>
        <IoFilterOutline />
        <span>Filter</span>
      </button>
      <div
        className={`fixed top-0 left-0 h-[100dvh] w-screen bg-light z-50 flex flex-col justify-stretch ${open ? "" : "hidden"
          }`}
      >
        <div className="flex justify-end items-end px-4 py-2 flex-shrink-0 shadow-[0_0_40px_5px_#358FAB14]">
          <button className="icon-btn p-2 text-lg" onClick={() => setOpen(false)}>
            <IoCloseSharp />
          </button>
        </div>
        <form
          onSubmit={handleSubmit} className=" h-2 flex flex-col flex-grow">
          <div className="divide-y divide-black-50 flex flex-col gap-2  h-full overflow-y-auto">
            <div className="search-mobile-group [&_label]:!text-black-800 [&_label]:font-semibold pt-4">
              <Category />
            </div>
            <div className="search-mobile-group">
              <p className="pb-2">Sort By</p>
              <Sort />
            </div>

            <div className="search-mobile-group">
              <p>Price</p>
              <Price />
            </div>
            <div className="search-mobile-group">
              <p className="pb-2">Distance</p>
              <Location />
            </div>
          </div>
          <div className="p-4 border-t border-black-50 shadow-[0_0_40px_5px_#358FAB14]">
            <FormButton loading={loading} className="btn-dark-tiny py-2 w-full">Apply</FormButton>
          </div>
        </form>
      </div>
    </>
  );
}
