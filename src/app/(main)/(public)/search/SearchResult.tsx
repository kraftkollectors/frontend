'use client'

import { formatNumber, sanitizeSearch } from "@/functions/helpers";
import { useParams } from "next/navigation";

export default function SearchResult({ count }: { count: number }) {
  let { query } = useParams();
  if (query && typeof query !== 'string') {
    query = query.toString();
  } else if (!query) query = ''

  return (
    <>
      {query && <p className="text-black-300 font-bold">
        {count == 0 ? 'No' : formatNumber(count)} Search Result{count == 1 ? '' : 's'} for <span className="text-black-500"> {sanitizeSearch(query)}</span>
      </p>}
    </>
  );
}
