"use server"

import { debugLog, formDataToObject } from "@/functions/helpers"
import { apis, paths, tags, validators } from "@/utils"
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes"
import { z } from "zod"
import { uploadSingleFile } from "../misc/uploadSingleFile"
import { JsonFile, createFileFromObject } from "@/functions/file"
import { ServerApiRequest } from "@/utils/serverApiRequest"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

const schema = z.object({
    title: validators.name,
    description: z.string().min(10, "must be 10 or more letters"),
    address: z.string().min(1, "location is required"),
    state: validators.name,
    estimatedPrice: z.string().min(1, "estimated price is required").regex(/^[0-9]+$/, "must be numbers"),
    charge: z.string().min(1, "charge is required"),
    category: z.string().min(1, "category is required"),
    subCategory: z.string().min(1, "sub category is required"),
})

type ServiceFormData = z.infer<typeof schema> & {
    userId: string;
    portfolio?: any;
    coverPhoto?: any;
}

export async function updateService(_: ActionResponse, formData: FormData): Promise<ActionResponse> {
    const data = formDataToObject<ServiceFormData>(formData);
    debugLog(data)
    const tryParse = schema.safeParse(data);

    if (!tryParse.success) return { fieldErrors: tryParse.error.flatten().fieldErrors, error: "Fix errors and submit" };

    let _formData = new FormData();
    let coverPhotoUrl: string;
    let proceed = false;
    try {
        const blob = createFileFromObject(JSON.parse(data.coverPhoto)[0]);
        _formData.append('file', blob);
        let coverPhoto = await uploadSingleFile(_formData)
        if (typeof coverPhoto === 'string') return { error: coverPhoto }
        coverPhotoUrl = coverPhoto.url;
    } catch (error) {
        debugLog(error)
        return { error: "Failed to upload cover photo" }
    }

    const portfolioUrls: string[] = [];
    const portfolios = JSON.parse(data.portfolio) as JsonFile[];
    debugLog(portfolios.length)
    await Promise.all(portfolios.map(async (item) => {
        try {
                const blob = createFileFromObject(item);
                _formData = new FormData()
                _formData.append('file', blob);
                let portfolio = await uploadSingleFile(_formData)
                if (typeof portfolio === 'string') return { error: portfolio }
                portfolioUrls.push(portfolio.url);
    
        } catch (error) {
            debugLog(error)
            return {
                error: "Failed to upload portfolio",
            }
        }
    }));
    
    const _data = { ...data, coverPhoto: coverPhotoUrl, portfolio: portfolioUrls };

    try {
        const req = await ServerApiRequest.post(apis.services, _data);
        const res = (await req?.json()) as ApiResponse;
        debugLog(res);

        if(res.statusCode === 201){
            revalidateTag(tags.myServices);
            revalidatePath(paths.dashboardServices);
            proceed = true;
        }
        else return {error: res.data ?? "Something went wrong"}
    } catch (error) {
        debugLog(error);
        return { error: "Something went wrong" }
    }
    if(proceed){
        redirect(paths.dashboardServices);
    }
    return { error: "Unknown error" }
}