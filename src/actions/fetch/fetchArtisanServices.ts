"use server";

import { debugLog } from "@/functions/helpers";
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { appCookies, tags } from "@/utils";
import {
  ActionApiResponse,
  ApiResponse,
  Paginated,
} from "@/utils/types/basicTypes";
import { cookies } from "next/headers";
import { ServerActionParams } from "@/utils/types/actions";
import { Service } from "@/utils/types/service";
import { ApiRequest } from "@/utils/apiRequest";

export async function fetchArtisanServices({
  throwsError = true,
  isPublic = false,
  params,
}: ServerActionParams = {}): Promise<ActionApiResponse<Paginated<Service>>> {
  try {
    const accessId = isPublic ? "" : cookies().get(appCookies.accessId)?.value;
    const req = await (isPublic
      ? ApiRequest.getJson(apis.getArtisanServices(params ?? ""), {
          next: { tags: [tags.userCertificates] },
        })
      : ServerApiRequest.get(apis.getArtisanServices(accessId ?? "") + params, {
          next: { tags: [tags.userCertificates] },
        }));
    if (!req) return null;
    const res = (await req.json()) as ApiResponse<Paginated<Service>>;
    // debugLog(res);

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
