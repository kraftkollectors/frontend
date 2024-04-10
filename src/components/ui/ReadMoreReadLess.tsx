"use client";

import { AppLayoutProps } from "@/utils/types/basicTypes";
import { useState } from "react";

export function ReadMoreReadLess({
  children,
  className,
  maxlineClass
}: AppLayoutProps & {
  className?: string;
  maxlineClass?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
    <div className={`${open ? "line-clamp-none" : maxlineClass ?? "line-clamp-6"} ${className}`}>
      {children}
    </div>
    <div className="flex justify-start"><button onClick={() => setOpen(!open)} className="link-btn">{open ? "Read Less" : "Read More"}</button></div>
    </>
  );
}
