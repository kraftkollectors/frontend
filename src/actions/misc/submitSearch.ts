'use server'

import { buildUrlQuery, formDataToObject, sanitizeSearch } from "@/functions/helpers";
import { Location } from "@/utils/types/location";
import { redirect } from "next/navigation";

type SearchParams = Location & { address?: string; type: string; query: string; location?: string }

export async function submitSearch(formData: FormData) {
    const { query, type, latitude, longitude, address } = formDataToObject<SearchParams>(formData);
    const queryParams = buildUrlQuery({latitude, longitude, address});
    redirect(`/${type}/${sanitizeSearch(query)}${queryParams}`);
}