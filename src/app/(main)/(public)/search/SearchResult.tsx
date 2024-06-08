'use client'

import { sanitizeSearch } from "@/functions/helpers";
import { useParams } from "next/navigation";

export default function SearchResult() {
  let {query} = useParams();
  if(query && typeof query !== 'string'){
    query = query.join('');
  }else if(!query) query = ''
  
  return (
    <div className="">
      {query && <p className="text-black">
        Search Result for <span className="font-semibold"> {sanitizeSearch(query)} (12,000)</span>
      </p>}
    </div>
  );
}
