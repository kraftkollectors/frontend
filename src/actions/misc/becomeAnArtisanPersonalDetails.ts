'use server'

import { debugLog, formDataToObject } from "@/functions/helpers"
import { appCookies, validators } from "@/utils";
import { ActionResponse } from "@/utils/types/basicTypes";
import { cookies } from "next/headers";
import { z } from "zod";

const schema = z.object({
    businessName: validators.name,
    phoneNumber: validators.phoneNumber,
    description: validators.name,
    facebook: validators.url, 
    instagram: validators.url,
    twitter: validators.url,
    linkedin: validators.url,
    state: z.string().min(1, 'select 1'),
    lga: z.string().min(1, 'select 1'),
})

export type BecomeAnArtisanPersonalDetails = z.infer<typeof schema>

export async function becomeAnArtisanPersonalDetails(res: ActionResponse, formData: FormData): Promise<ActionResponse>{
    const data = formDataToObject<BecomeAnArtisanPersonalDetails>(formData);
    debugLog({res})
    const tryParse = schema.safeParse(data);
    if(!tryParse.success) return {fieldErrors: tryParse.error.flatten().fieldErrors}

    try {
        const {set} = cookies();
        set(appCookies.registerData, JSON.stringify(data), {
            httpOnly: true,
            maxAge: 60 * 60 * 10
        })

        return {success: "Proceed to next stage", data: data}
    } catch (error) {
        debugLog(error);
        return {error: 'Something went wrong'}
    }
}