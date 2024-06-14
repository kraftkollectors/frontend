'use client'

import { formatNumber, sanitizeSearch } from "@/functions/helpers";
import { useParams } from "next/navigation";

export default function SearchResult({ count }: { count: number }) {
  let { query } = useParams();
  if (query && typeof query !== 'string') {
    query = query.toString();
  } else if (!query) query = ''

  return (
    <div className="">
      {query && <p className="text-black">
        {count == 0 ? 'No' : formatNumber(count)} Search Result{count == 1 ? '' : 's'} for <span className="font-semibold"> {sanitizeSearch(query)}</span>
      </p>}
    </div>
  );
}
