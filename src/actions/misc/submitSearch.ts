'use server'

import { sanitizeSearch } from "@/functions/helpers";
import { paths } from "@/utils";
import { redirect } from "next/navigation";

export async function submitSearch(formData: FormData){
    const query = formData.get('query') ?? ''
    redirect(paths.search(sanitizeSearch(query.toString())))
}