'use client'

import { useChangeSearchParams } from "@/hooks";
// import { Radio } from "@radix-ui/themes";
import { SORT_OPTIONS } from "@/utils/constants";
import { useState } from "react";
export default function Sort() {
  const {params} = useChangeSearchParams()
  const [opt, setOpt] = useState(params.get('sort') ?? SORT_OPTIONS[0].value);

  return (
    <div className="flex gap-2 flex-col">
      {SORT_OPTIONS.map(({ title, value }) => {
        const id = title.toLowerCase().replaceAll(" ", "-");
        return (
          <div key={value} className="flex gap-1 items-center">
            <input onChange={()=>setOpt(value)} checked={opt == value} type="radio" name="sort" id={id} value={value} />
            <label onClick={()=>setOpt(value)} className=" cursor-pointer" htmlFor={id} key={title}>
              {title}
            </label>
          </div>
        );
      })}
    </div>
  );
}


