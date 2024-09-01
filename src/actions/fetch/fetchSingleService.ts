'use server'

import { debugLog } from "@/functions/helpers"
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { ActionApiResponse, ApiResponse } from "@/utils/types/basicTypes";
import { ServerActionParams } from "@/utils/types/actions";
import { ApiRequest } from "@/utils/apiRequest";
import { ServiceDetails } from "@/utils/types/service";



export async function fetchSingleService(serviceId: string, { throwsError = true, isPublic = false }: ServerActionParams = {}): Promise<ActionApiResponse<ServiceDetails>> {
    try {
        const req = await (isPublic ? ApiRequest.getJson(apis.getSingleArtisanService(serviceId), {next: { revalidate: 0 },}) : ServerApiRequest.get(apis.getSingleArtisanService(serviceId), {
            next: { revalidate: 0 },
        }));
        if (!req) return null;
        const res = (await req.json()) as ApiResponse<{existingRecord:ServiceDetails}>;
        // debugLog(res);

        if (res.statusCode == 404) return null;
        else if (res.statusCode === 201) return res.data.existingRecord;
        else if (throwsError) throw new Error("Unable to connect")
        return 'error';
    } catch (error) {
        debugLog(error)
        if (throwsError) throw new Error("Something went wrong")
        return "error";
    }
    return 'error'
}