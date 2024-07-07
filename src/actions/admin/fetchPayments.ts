'use server'

import { debugLog } from "@/functions/helpers"
import apis from "@/utils/apis";
import { tags } from "@/utils";
import { ActionApiResponse, ApiResponse, Paginated } from "@/utils/types/basicTypes";
import { ServerActionParams } from "@/utils/types/actions";
import { ApiRequest } from "@/utils/apiRequest";
import { Payment } from "@/utils/types/payment";


export async function fetchPayments({ throwsError = false}: ServerActionParams<string> = {}): Promise<ActionApiResponse<Paginated<Payment>>> {
    try {
        const req = await ApiRequest.getJson(apis.transactions, {next: {tags: [tags.payments]}}) 
        const res = (await req?.json()) as ApiResponse<Paginated<Payment>>;
        debugLog(res);

        if (res.statusCode === 201) return res.data;
        if (throwsError) throw new Error("Unable to connect")
        return 'error';
    } catch (error) {
        debugLog(error)
        if (throwsError) throw new Error("Something went wrong")
        return "error";
    }
}