'use server'

import { debugLog } from "@/functions/helpers";
import { apis } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import { ServerActionParams } from "@/utils/types/actions";
import { ActionApiResponse } from "@/utils/types/basicTypes";
import { State } from "@/utils/types/location";

export type NigerianStatesResponse = State[];

export async function fetchNigerianStates({ throwsError = true }: ServerActionParams = {}): Promise<ActionApiResponse<State[]>> {
    try {
        const req = await ApiRequest.getJson(apis.nigerianStates, {});
        const res = (await req.json()) as NigerianStatesResponse;
        // debugLog(res);

        if(res && res.length > 0) return res;
        return null;
    } catch (error) {
        debugLog(error)
        if (throwsError) throw new Error("Something went wrong")
        return "error";
    }
}