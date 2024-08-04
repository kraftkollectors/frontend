"use server";

import { debugLog } from "@/functions/helpers";
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { tags } from "@/utils";
import {
  ActionApiResponse,
  ApiResponse,
  Paginated,
} from "@/utils/types/basicTypes";
import { ServerActionParams } from "@/utils/types/actions";
import { Review } from "@/utils/types/review";
import { ApiRequest } from "@/utils/apiRequest";

export async function fetchServiceRatings(
  serviceId: string,
  { throwsError = false, params = "" }: ServerActionParams = {},
): Promise<ActionApiResponse<Paginated<Review>>> {
  try {
    const req = await ApiRequest.getJson(
      apis.getServiceRatings(serviceId) + params,
      {
        next: { tags: [tags.serviceReviews(serviceId)] },
      },
    );
    if (!req) return null;
    const res = (await req.json()) as ApiResponse;
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
