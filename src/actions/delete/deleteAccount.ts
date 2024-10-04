"use server";

import { debugLog, formDataToObject } from "@/functions/helpers";
import { apis, tags } from "@/utils";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { UserAuthProps } from "@/utils/types/auth";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const schema = z.object({
  confirm: z.string().min(1, { message: "Confirmation is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type CertificateFormData = z.infer<typeof schema> & UserAuthProps;

export async function deleteAccount(
  _res: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  const data = formDataToObject<CertificateFormData>(formData);
  if (!data.userId || !data.userEmail) throw new Error();

  if (data.confirm !== "I want to delete my account") {
    return {
      error: "Confirmation is required",
    };
  }
  
  const tryParse = schema.safeParse(data);
  if (!tryParse.success) {
    return { fieldErrors: tryParse.error.flatten().fieldErrors };
  }

  try {
    const req = await ServerApiRequest.delete(apis.deleteAccount, data);
    const res = (await req?.json()) as ApiResponse;
    debugLog(res);
    if (res.statusCode == 201) {
      revalidateTag(tags.user);
      return {
        success: `Account deleted Successfully`,
      };
    }
    return { error: res.data ?? "Failed to delete Certificate", data: res };
  } catch (error) {
    debugLog(error);
    return { error: "Something went wrong" };
  }
  return { error: "Something went wrong" };
}
