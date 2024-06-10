'use server'

import { debugLog, formDataToObject } from "@/functions/helpers"
import { apis } from "@/utils";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";


export type ToggleFavouriteFormData = {
    userId: string;
    serviceId: string;
    delete?: string;
};

export async function toggleFavourite(_: ActionResponse, formData: FormData): Promise<ActionResponse>{
    const data = formDataToObject<ToggleFavouriteFormData>(formData);
    if(!data.userId) return {error: "You are not logged in"}
    try {
        const del = data.delete == 'true'
        const req = await (del ? ServerApiRequest.delete(apis.toggleFavourite(data.serviceId), data) : ServerApiRequest.post(apis.toggleFavourite(), data));
        const res = (await req?.json()) as ApiResponse;
        debugLog(res);

        if(res.statusCode == 201){
            if(del) return {success: "Remover from favourites", data: false}
            return {success: "Added to favourites", data: true}
        } else return {error: res.data ?? "An error occurred", data:false}
    } catch (error) {
        debugLog(error);
        return {error: 'Something went wrong'}
    }
    return { data: 'refresh'}
}