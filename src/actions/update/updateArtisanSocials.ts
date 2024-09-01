'use server'

import { debugLog, formDataToObject } from "@/functions/helpers";
import { apis, paths, tags, validators } from "@/utils";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

const schema = z.object({
    website: validators.url,
    facebook: validators.url,
    linkedin: validators.url,
    instagram: validators.url,
    twitter: validators.url,
    userId: z.string(),
});

type UpdateFormData = z.infer<typeof schema>

export async function updateArtisanSocials(_: any, formData: FormData): Promise<ActionResponse> {
    const data = formDataToObject<UpdateFormData>(formData);

    const tryParse = schema.safeParse(data)
    if (!tryParse.success) return {
        fieldErrors: tryParse.error.flatten().fieldErrors,
    }
    try {
        const req = await ServerApiRequest.patch(apis.updateArtisanProfile(data.userId), data);
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