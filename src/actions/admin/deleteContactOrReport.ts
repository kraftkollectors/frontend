'use server'

import { debugLog, formDataToObject } from "@/functions/helpers";
import { apis, paths, tags } from "@/utils";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { AdminAuthProps } from "@/utils/types/auth";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";


type CategoryFormData = AdminAuthProps & {
    feedbackId?: string;
    reportId?: string;
};

export async function deleteContactOrReport(_res: ActionResponse, formData: FormData): Promise<ActionResponse> {
    const data = formDataToObject<CategoryFormData>(formData);
    if (!data.adminId || !data.adminEmail) redirect(paths.adminLogin)
    if (!data.feedbackId && !data.reportId) return ({ error: 'Something went wrong' });
    const name = data.feedbackId ? "feedback" : "report"

    try {
        const req = await (data.feedbackId
            ? ServerApiRequest.delete(apis.singleFeedback(data.feedbackId), { data, resolved: true })
            : ServerApiRequest.delete(apis.singleReport(data.reportId!), { data, resolved: true }));
        const res = (await req?.json()) as ApiResponse
        debugLog(res);
        if (res.statusCode == 201) {
            revalidateTag(name == 'feedback' ? tags.feedbacks : tags.reports)
            return { success: "Deleted "+name, data: res.data };
        }
        return { error: res.data ?? "Failed to delete"+name, data: res };
    } catch (error) {
        debugLog(error);
        return { error: 'Something went wrong' }
    }
    return { error: 'Something went wrong' }
}