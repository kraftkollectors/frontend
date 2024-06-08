'use server'

import { paths } from "@/utils";
import { redirect } from "next/navigation";

export async function submitSearch(formData: FormData){
    const query = formData.get('query')
    if(!query) return;
    redirect(paths.search(query.toString()))
}