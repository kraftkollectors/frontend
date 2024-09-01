"use client";

import { useReadMore } from "@/hooks";
import { HTMLAttributes } from "react";

export function ReadMoreReadLess({
  children,
  className,
  maxWords = 20,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  maxWords?: number;
}) {
  const {displayText, hasMore,isExpanded,showLess,showMore} = useReadMore(String(children), maxWords);

  return (
    <div {...props} >
      {displayText}
      {hasMore && !isExpanded && "..."}
    {hasMore && <button onClick={isExpanded ? showLess : showMore} className="link-btn">&nbsp;{isExpanded ? "Read Less" : "Read More"}</button>}
    </div>
  );
}
