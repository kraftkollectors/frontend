import { debugLog } from "@/functions/helpers";
import { apis } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import { ApiResponse } from "@/utils/types/basicTypes";

export async function uploadFiles(
  formData: FormData,
): Promise<string | string[]> {
  try {
    // debugLog('hmmmmmm');
    const req = await ApiRequest.postFormData(
      apis.uploadManyFiles,
      formData,
      false,
    );
    // const _es = await req.text();
    // debugLog({ _es });
    // throw new Error("File upload failed");
    const res = (await req.json()) as ApiResponse;
    debugLog({ res });

    if (res.statusCode == 201) {
      return res.data.map((i: any) => i.uploadUrl);
    }
    return res.data.toString();
  } catch (error) {
    debugLog(error);
  }
  return "files upload failed";
}
