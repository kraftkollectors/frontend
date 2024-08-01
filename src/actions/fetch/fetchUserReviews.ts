"use server";

import { debugLog } from "@/functions/helpers";
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { appCookies } from "@/utils";
import {
  ActionApiResponse,
  ApiResponse,
  Paginated,
} from "@/utils/types/basicTypes";
import { cookies } from "next/headers";
import { ServerActionParams } from "@/utils/types/actions";
import { ApiRequest } from "@/utils/apiRequest";
import { Review } from "@/utils/types/review";

export async function fetchUserReviews({
  throwsError = true,
  isPublic = false,
  params,
}: ServerActionParams = {}): Promise<ActionApiResponse<Paginated<Review>>> {
  try {
    const accessId = isPublic ? "" : cookies().get(appCookies.accessId)?.value;
    const req = await (isPublic
      ? ApiRequest.getJson(apis.userReviews(params ?? ""), {
          next: { revalidate: 60 * 60 * 5 },
        })
      : ServerApiRequest.get(apis.userReviews(accessId ?? "") + params, {
          next: { revalidate: 60 * 60 * 5 },
        }));
    if (!req) return null;
    const res = (await req.json()) as ApiResponse<Paginated<Review>>;
    // debugLog(res);
    // debugLog(res.data.existingRecords.length);

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
