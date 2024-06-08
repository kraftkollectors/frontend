'use server'

import { sanitizeSearch } from "@/functions/helpers";
import { paths } from "@/utils";
import { redirect } from "next/navigation";

export async function submitSearch(formData: FormData){
    const query = formData.get('query')
    if(!query) return;
    redirect(paths.search(sanitizeSearch(query.toString())))
}