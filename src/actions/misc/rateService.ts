'use server'

import { debugLog, formDataToObject } from "@/functions/helpers"
import { apis, tags, validators } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { Artisan } from "@/utils/types/artisan";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const schema = z.object({
    review: validators.name,
})

export type RateServiceFormData = z.infer<typeof schema> & {
    userId: string;
    serviceId: string;
    rating: string;
};

export async function rateService(_: ActionResponse, formData: FormData): Promise<ActionResponse>{
    const data = formDataToObject<RateServiceFormData>(formData);
    debugLog(data)
    const tryParse = schema.safeParse(data);
    if(!tryParse.success) return {fieldErrors: tryParse.error.flatten().fieldErrors}

    if(!data.userId) return {error: "You are not logged in"}
    if(![1,2,3,4,5].includes(Number(data.rating))) return {error: "You must rate at least 1 star"}

    try {
        const req = await ServerApiRequest.post(apis.rateService, {...data, reviewerId: data.userId});
        const res = (await req?.json()) as ApiResponse;
        debugLog(res);

        if(res.statusCode == 201){
            revalidateTag(tags.serviceReviews(data.serviceId));
            return {success: "Your review has been saved!"}
        } else return {error: res.data ?? "An error occurred"}
    } catch (error) {
        debugLog(error);
        return {error: 'Something went wrong'}
    }
    return { data: 'refresh'}
}