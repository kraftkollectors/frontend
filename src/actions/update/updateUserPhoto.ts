'use server'

import { debugLog, formDataToObject } from "@/functions/helpers";
import { apis, paths, tags, validators } from "@/utils";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { uploadSingleFile } from "../misc/uploadSingleFile";

type UpdateFormData = {
    file?: any;
    delete?: string;
    userId: string;
};

export async function updateUserPhoto(_: any, formData: FormData): Promise<ActionResponse> {
    const data = formDataToObject<UpdateFormData>(formData);
    // debugLog(data);

    if (!data.file && !data.delete) return {
        error: "Please select a photo",
    }
    try {
        let img: any;
        let del = data.delete == 'true';
        if (!del) {
            img = await uploadSingleFile(formData);
            if (typeof img === 'string') return { error: img ?? "Image Upload failed" }
        }

        const req = await ServerApiRequest.patch(apis.updateUserProfile(data.userId), { image: del ? '' : img.url, ...data });
        const res = (await req?.json()) as ApiResponse;
        debugLog(res);

        if (res.statusCode == 201) {
            revalidateTag(tags.user);
            revalidatePath(paths.dashboard);
            return { success: "Profile Photo Updated", data: res.data.data };
        }

        return {
            error: res.data ?? "Something went wrong"
        }

    } catch (error) {
        debugLog(error);
        return { error: 'Something went wrong' }
    }
}