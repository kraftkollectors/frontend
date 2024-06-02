'use server'

import { debugLog } from "@/functions/helpers";
import { apis } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import { ServerActionParams } from "@/utils/types/actions";
import { ActionApiResponse, ApiResponse } from "@/utils/types/basicTypes";
import { State } from "@/utils/types/location";

export type NigerianStatesResponse = State[];

export async function fetchNigerianStates({ throwsError = true }: ServerActionParams = {}): Promise<ActionApiResponse<State[]>> {
    try {
        const req = await ApiRequest.getJson(apis.nigerianStates, {
            headers: {
                'x-access-token': "6Xt9Dy4Hw7Nj0Ps3Mz8Qg1Vo5Kc2FbLr"
            }
        });
        const res = (await req.json()) as ApiResponse<NigerianStatesResponse>;
        // debugLog(res);

        if(res.statusCode === 200) return res.data;
        return null;
    } catch (error) {
        debugLog(error)
        if (throwsError) throw new Error("Something went wrong")
        return "error";
    }
}