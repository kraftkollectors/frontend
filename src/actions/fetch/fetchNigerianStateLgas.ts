'use server'

import { debugLog } from "@/functions/helpers";
import { apis } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import { ServerActionParams } from "@/utils/types/actions";
import { ActionApiResponse } from "@/utils/types/basicTypes";
import { LGA } from "@/utils/types/location";


export async function fetchNigerianStateLgas(state:string, { throwsError = true }: ServerActionParams = {}): Promise<ActionApiResponse<LGA[]>> {
    try {
        const req = await ApiRequest.getJson(apis.getStateLgas(state), {});
        const res = (await req.json()) as LGA[];
        debugLog(res);

        if(res && res.length > 0) return res;
        return null;
    } catch (error) {
        debugLog(error)
        if (throwsError) throw new Error("Something went wrong")
        return "error";
    }
}