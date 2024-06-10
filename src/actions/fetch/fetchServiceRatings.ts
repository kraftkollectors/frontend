'use server'

import { debugLog } from "@/functions/helpers"
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { appCookies, tags } from "@/utils";
import { ActionApiResponse, ApiResponse, Paginated } from "@/utils/types/basicTypes";
import { cookies } from "next/headers";
import { ServerActionParams } from "@/utils/types/actions";
import { Certificate } from "@/utils/types/certificate";
import { Review } from "@/utils/types/review";


export async function fetchServiceRatings(serviceId: string, { throwsError = false }: ServerActionParams = {}): Promise<ActionApiResponse<Paginated<Review>>> {
    try {
        const req = await ServerApiRequest.get(apis.getServiceRatings(serviceId), {
            next: { tags: [tags.serviceReviews(serviceId)] },
        });
        if(!req) return null;
        const res = (await req.json()) as ApiResponse;
        // debugLog(res.data.existingRecords);

        if (res.statusCode === 201) return res.data;
        else if(res.data.toString() == 'No records found') return null;
        if (throwsError) throw new Error("Unable to connect")
        return 'error';
    } catch (error) {
        debugLog(error)
        if (throwsError) throw new Error("Something went wrong")
        return "error";
    }
}