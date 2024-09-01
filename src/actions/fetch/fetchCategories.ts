'use server'

import { debugLog } from "@/functions/helpers"
import apis from "@/utils/apis";
import { tags } from "@/utils";
import { ActionApiResponse, ApiResponse, Paginated } from "@/utils/types/basicTypes";
import { ServerActionParams } from "@/utils/types/actions";
import { ApiRequest } from "@/utils/apiRequest";
import { Category } from "@/utils/types/category";


export async function fetchCategories({ throwsError = false, params = ''}: ServerActionParams<string> = {}): Promise<ActionApiResponse<Paginated<Category>>> {
    try {
        const req = await ApiRequest.getJson(apis.category + params, {next: {tags: [tags.categories]}}) 
        const res = (await req?.json()) as ApiResponse<Paginated<Category>>;
        // debugLog({daa: res.data});

        if (res.statusCode === 201) return res.data;
        if (throwsError) throw new Error("Unable to connect")
        return 'error';
    } catch (error) {
        debugLog(error)
        if (throwsError) throw new Error("Something went wrong")
        return "error";
    }
}