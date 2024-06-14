'use server'

import { debugLog, formDataToObject } from "@/functions/helpers";
import { apis, paths, tags, validators } from "@/utils";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { revalidatePath, revalidateTag } from "next/cache";

type AvailableFormData = {
    userId?: string;
    value: string;
};

export async function toggleAvailability(_: any, formData: FormData): Promise<ActionResponse> {
    const data = formDataToObject<AvailableFormData>(formData);

    try {
        if(!data.userId) return {error: "Invalid User"}
        const req = await ServerApiRequest.patch(apis.updateArtisanProfile(data.userId), {...data, available: data.value === 'true' });
        const res = (await req?.json()) as ApiResponse;
        debugLog(res);

        if(res.statusCode == 201) {
            revalidateTag(tags.user);
            revalidatePath(paths.dashboard);
            return {success: "Artisan Profile Updated", data: res.data.data};
        }

        return {
            error: res.data ?? "Something went wrong"
        }

    } catch (error) {
        debugLog(error);
        return {error: 'Something went wrong'}
    }
}