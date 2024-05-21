"use client";
import Sort from "@/app/(main)/(public)/search/components/Sort";
import Price from "@/app/(main)/(public)/search/components/price";
import Location from "@/app/(main)/(public)/search/components/Location";
import AppIcons from "../AppIcons";
import Category from "@/app/(main)/(public)/search/components/Category";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function SearchMobile() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (document)
      if (open) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "auto";
  }, [open]);
  return (
    <>
      <>
        <button className="p-1 md:hidden text-primary hover:text-primary-hover" onClick={() => setOpen(true)}>
          <AppIcons.Filter />
        </button>
      </>
      <div
        className={`fixed top-0 left-0 h-screen w-screen bg-light z-50 flex flex-col justify-stretch ${
          open ? "" : "hidden"
        }`}
      >
        <div className="flex justify-end p-4 flex-shrink-0">
          <button onClick={() => setOpen(false)}>
            <IoCloseSharp />
          </button>
        </div>
        <form className=" h-2 flex flex-col gap-2 flex-grow p-5 ">
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
          <button className="btn-dark-tiny py-2 w-full flex-shrink-0">
            Apply
          </button>
        </form>
      </div>
    </>
  );
}
