"use server";

import { debugLog } from "@/functions/helpers";
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { appCookies, paths, tags } from "@/utils";
import { ActionApiResponse, ApiResponse } from "@/utils/types/basicTypes";
import { cookies } from "next/headers";
import { UserDetailsPlus } from "@/utils/types/user";
import { ServerActionParams } from "@/utils/types/actions";
import { redirect } from "next/navigation";
import { ApiRequest } from "@/utils/apiRequest";

export type UserApiResponse = {
  userDetails: UserDetailsPlus;
};

const HOST = process.env.HOST ?? "";

export async function fetchUser({
  redirect: shouldRedirect = true,
  throwsError = true,
  isPublic = false,
  params,
}: ServerActionParams<string> = {}): Promise<
  ActionApiResponse<UserDetailsPlus>
> {
  let proceed = false;
  const accessId = isPublic ? "" : cookies().get(appCookies.accessId)?.value;
  if (!isPublic && !accessId) {
    if (throwsError) throw new Error("Unable to connect");
    return "conflict" as "error";
  } else {
    try {
      // debugLog({ isPublic, params, accessId })
      const req = await (isPublic
        ? ApiRequest.getJson(apis.getUser(params ?? ""), {
            next: { tags: [tags.user] },
          })
        : ServerApiRequest.get(apis.getUser(accessId ?? ""), {
            next: { tags: [tags.user] },
          }));
      if (!req) return null;
      const res = (await req.json()) as ApiResponse<UserApiResponse>;
      // debugLog(res);

      if (res.statusCode == 404) {
        proceed = true;
        throw new Error("Unable to connect");
      }

      if ((res as any).message == "Invalid Token") proceed = true;
      else if (res.statusCode === 201) return res.data.userDetails;
      else if (throwsError) throw new Error("Unable to connect");
      if (!proceed) return "error";
    } catch (error) {
      debugLog(error);
      if (throwsError && !proceed) throw new Error("Something went wrong");
      // return "error";
    }
  }
  if (proceed) redirect(paths.login);
  else return "error";
}
