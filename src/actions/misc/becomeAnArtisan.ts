'use server'

import { debugLog, formDataToObject } from "@/functions/helpers"
import { apis, appCookies, paths, tags, validators } from "@/utils";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { Artisan } from "@/utils/types/artisan";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
    nin: validators.nin,
})

export type BecomeAnArtisan = z.infer<typeof schema>

export async function becomeAnArtisan(_: ActionResponse, formData: FormData): Promise<ActionResponse>{
    const data = formDataToObject<BecomeAnArtisan>(formData);
    debugLog(data)
    const tryParse = schema.safeParse(data);
    if(!tryParse.success) return {fieldErrors: tryParse.error.flatten().fieldErrors}

    let proceed = false;
    try {
        const {delete:del, get} = cookies();
        const cookieArtisan = get(appCookies.registerData)?.value;
        if(!cookieArtisan) {
            del(appCookies.registerData);
            return {data: 'refresh'}
        }
        const cookieArtisanJson:Artisan = JSON.parse(cookieArtisan);
        if(!cookieArtisanJson.areaOfSpecialization || !cookieArtisanJson.businessName) {
            del(appCookies.registerData);
            return {data: 'refresh'}
        }

        const req = await ServerApiRequest.post(apis.artisan, data);
        const res = (await req?.json()) as ApiResponse;
        debugLog(res);

        if(res.statusCode == 201){
            del(appCookies.registerData);
            proceed = true;
        } else return {error: res.data ?? "An error occurred"}
    } catch (error) {
        debugLog(error);
        return {error: 'Something went wrong'}
    }

    if(proceed){
        revalidatePath(paths.dashboard);
        revalidateTag(tags.artisan);
        revalidateTag(tags.user);
        redirect(paths.dashboard, RedirectType.replace);
    }
    return { data: 'refresh'}
}