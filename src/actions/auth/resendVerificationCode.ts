'use server'

import { debugLog } from "@/functions/helpers";
import { apis, appCookies } from "@/utils"
import { ApiRequest } from "@/utils/apiRequest"
import { ApiResponse } from "@/utils/types/basicTypes";
import { cookies } from "next/headers";
import bcrypt from 'bcryptjs';

export async function resendVerificationCode(email:string):Promise<boolean>{
    try {
        const req = await ApiRequest.postJson(apis.resendVerificationCode, {email});
        const res = (await req.json()) as ApiResponse;
        debugLog(res)
        if (res.statusCode === 201){
            const token = await bcrypt.hash(res.data.num, 10);
            cookies().set(appCookies.clientToken, token);
            return true;
        }
        return false;
    } catch (error:any) {
        return false;
    }
}

