"use server"

import { formDataToObject } from "@/functions/helpers"
import { validators } from "@/utils"
import { ActionResponse } from "@/utils/types/basicTypes"
import { z } from "zod"
import { uploadSingleFile } from "../misc/uploadSingleFile"

const schema = z.object({
    title: validators.name,
    description: z.string().min(10, "must be 10 or more letters"),
    location: z.string().min(1, "location is required"),
    state: validators.name,
    estimatedPrice: z.string().min(1, "estimated price is required").regex(/^[0-9]+$/, "must be numbers"),
    charge: z.string().min(1, "charge is required"),
    category: z.string().min(1, "category is required"),
    subCategory: z.string().min(1, "sub category is required"),
})

type ServiceFormData = z.infer<typeof schema> & {
    userId: string;
    portfolio?:any;
    coverPhoto?:any;
}

export async function newService(_: ActionResponse, formData: FormData): Promise<ActionResponse> {
    const data = formDataToObject<ServiceFormData>(formData);
    const tryParse = schema.safeParse(data);

    if (!tryParse.success) return {fieldErrors: tryParse.error.flatten().fieldErrors, error: "Fix errors and submit"};

    // let _formData = new FormData();
    // _formData.append('file', formData.get('coverPhoto') as Blob);
    // const coverPhoto = await uploadSingleFile(_formData)
    // if(typeof coverPhoto === 'string') return {error: coverPhoto}

    // for (const [key, value] of formData.entries()) {
    //     if (key === 'portfolio') {
    //       for (let i = 0; i < (value as any).length; i++) {
    //         const file:File = (value as any)[i];
    //         console.log(file.name);
    //       }
    //     }
    //   }
    
    return { error: "Unknown error" }
}