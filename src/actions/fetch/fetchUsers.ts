"use server";

import { debugLog } from "@/functions/helpers";
import apis from "@/utils/apis";
import { tags } from "@/utils";
import {
  ActionApiResponse,
  ApiResponse,
  Paginated,
} from "@/utils/types/basicTypes";
import { ServerActionParams } from "@/utils/types/actions";
import { ApiRequest } from "@/utils/apiRequest";
import { UserDetails } from "@/utils/types/user";

export async function fetchUsers({
  throwsError = false,
  params = "",
  isPublic = false,
}: ServerActionParams<string> = {}): Promise<
  ActionApiResponse<Paginated<UserDetails>>
> {
  try {
    const req = await (isPublic
      ? ApiRequest.getJson(apis.getArtisans + params, {
          next: { tags: [tags.user, tags.artisan] },
        })
      : ApiRequest.getJson(apis.getUsers + params, {
          next: { tags: [tags.user, tags.artisan] },
        }));
    const res = (await req?.json()) as ApiResponse<Paginated<UserDetails>>;
    debugLog({ params, res, isPublic });

    if (res.statusCode === 201) return res.data;
    if (throwsError) throw new Error("Unable to connect");
    return "error";
  } catch (error) {
    debugLog(error);
    if (throwsError) throw new Error("Something went wrong");
    return "error";
  }
}
