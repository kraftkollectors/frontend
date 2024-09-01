'use server'

import { debugLog } from "@/functions/helpers"
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { appCookies, tags } from "@/utils";
import { ActionApiResponse, ApiResponse, Paginated } from "@/utils/types/basicTypes";
import { cookies } from "next/headers";
import { ServerActionParams } from "@/utils/types/actions";
import { ChatMessageOld } from "@/utils/types/chat";


export async function fetchChats(guestId: string, { throwsError = true, params = '' }: ServerActionParams<string> = {}): Promise<ActionApiResponse<Paginated<ChatMessageOld>>> {
    try {
        const accessId = cookies().get(appCookies.accessId)?.value
        const timeParam = !params ? '' : `&time=${params}`
        debugLog(apis.getChats(accessId ?? '', guestId) + timeParam)
        const req = await (ServerApiRequest.get(apis.getChats(accessId ?? '', guestId) + timeParam, {
            next: { revalidate: 0 },
        }));
        if(!req) return null;
        const res = (await req.json()) as ApiResponse<Paginated<ChatMessageOld>>;
        // debugLog(res.data.existingRecords);

        if (res.statusCode === 201) return res.data;
        else if(res.data.toString() == 'No records found') return null;
        if (throwsError) throw new Error("Unable to connect")
        return 'error';
    } catch (error) {
        debugLog(error)
        if (throwsError) throw new Error("Something went wrong")
        return "error";
    }
}