"use client";

import Sort from "@/app/(main)/(public)/search/components/Sort";
import Price from "@/app/(main)/(public)/search/components/price";
import Location from "@/app/(main)/(public)/search/components/Location";
import AppIcons from "../AppIcons";
import Category from "@/app/(main)/(public)/search/components/Category";
import { IoCloseSharp } from "react-icons/io5";
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
  const {query} = useParams();
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
      <button className="p-1 md:hidden text-primary hover:text-primary-hover" onClick={() => setOpen(true)}>
        <AppIcons.Filter />
      </button>
      <div
        className={`fixed top-0 left-0 h-[100dvh] w-screen bg-light z-50 flex flex-col justify-stretch ${open ? "" : "hidden"
          }`}
      >
        <div className="flex justify-between items-end !pb-1 shadow-md p-4 flex-shrink-0">
          <h2 className="font-semibold text-black-500">Search filters</h2>
          <button className="icon-btn p-2 text-lg" onClick={() => setOpen(false)}>
            <IoCloseSharp />
          </button>
        </div>
        <form
          onSubmit={handleSubmit} className=" h-2 flex flex-col gap-2 flex-grow p-5 ">
          <div className="divide-y-2 flex flex-col gap-2  h-full overflow-y-auto">
            <div className="search-mobile-group">
              <Category />
            </div>
            <div className="search-mobile-group">
              <p>Sort By</p>
              <Sort />
            </div>

            <div className="search-mobile-group">
              <p>Price</p>
              <Price />
            </div>
            <div className="search-mobile-group">
              <p>Location</p>
              <Location />
            </div>
          </div>

          <FormButton loading={loading} className="btn-dark-tiny py-2 w-full">Apply</FormButton>
        </form>
      </div>
    </>
  );
}
