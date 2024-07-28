"use server";

import { debugLog } from "@/functions/helpers";
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { tags } from "@/utils";
import { ActionApiResponse, ApiResponse } from "@/utils/types/basicTypes";
import { ServerActionParams } from "@/utils/types/actions";
import { View } from "@/utils/types/views";

export async function fetchServiceViews(
  serviceId: string,
  { throwsError = false }: ServerActionParams = {},
): Promise<ActionApiResponse<View>> {
  try {
    const req = await ServerApiRequest.get(apis.serviceSingleViews(serviceId), {
      next: { tags: [tags.serviceViews(serviceId)] },
    });
    if (!req) return null;
    const res = (await req.json()) as ApiResponse<View>;
    // debugLog(res.data.existingRecords);

    if (res.statusCode === 201) return res.data;
    else if (res.data.toString() == "No records found") return null;
    if (throwsError) throw new Error("Unable to connect");
    return "error";
  } catch (error) {
    debugLog(error);
    if (throwsError) throw new Error("Something went wrong");
    return "error";
  }
}
