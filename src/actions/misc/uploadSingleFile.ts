import { debugLog } from "@/functions/helpers";
import { apis } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { ApiResponse } from "@/utils/types/basicTypes";

export async function uploadSingleFile(
  formData: FormData,
): Promise<string | { url: string }> {
  try {
    const req = await ApiRequest.postFormData(
      apis.uploadSingleFile,
      formData,
      false,
    );

    const res = (await req?.json()) as ApiResponse;
    debugLog({ res });

    if (res.statusCode == 201) {
      return { url: res.data.uploadUrl };
    }
    return res.data ?? (res as any).error;
  } catch (error) {
    debugLog(error);
  }
  return "Image upload failed";
}

/**
 * FormData { [Symbol(state)]: [ { name: 'file', value: [File] } ] }
 * FormData {
  [Symbol(state)]: [
    { name: 'delete', value: 'false' },
    { name: 'file', value: [File] },
    { name: 'userId', value: '6656295de682dba387d1772b' },
    { name: 'userEmail', value: 'abundiko111@gmail.com' }
  ]
}
 */
