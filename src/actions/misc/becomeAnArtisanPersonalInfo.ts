'use server'

import { debugLog, formDataToObject } from "@/functions/helpers"
import { appCookies, validators } from "@/utils";
import { ActionResponse } from "@/utils/types/basicTypes";
import { cookies } from "next/headers";
import { z } from "zod";

const schema = z.object({
    workHourFrom: validators.timeHour,
    workHourTo: validators.timeHour,
    areaOfSpecialization: validators.name,
    website: validators.url,
})

export type BecomeAnArtisanPersonalInfo = z.infer<typeof schema>

export async function becomeAnArtisanPersonalInfo(res: ActionResponse, formData: FormData): Promise<ActionResponse>{
    const data = formDataToObject<BecomeAnArtisanPersonalInfo>(formData);
    debugLog(data)
    const tryParse = schema.safeParse(data);
    if(!tryParse.success) return {fieldErrors: tryParse.error.flatten().fieldErrors}

    try {
        const {set} = cookies();
        set(appCookies.registerData, JSON.stringify({...data, ...res.data}), {
            httpOnly: true,
            maxAge: 60 * 60 * 10
        })

        return {success: "Proceed to next stage", data: data}
    } catch (error) {
        debugLog(error);
        return {error: 'Something went wrong'}
    }
}