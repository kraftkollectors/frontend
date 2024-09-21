"use server";

import { removeFilesFromFormData } from "@/functions/file";
import { attempt, debugLog, formDataToObject } from "@/functions/helpers";
import { apis, paths, tags, validators } from "@/utils";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { uploadFiles } from "../misc/uploadFiles";
import { uploadSingleFile } from "../misc/uploadSingleFile";

const schema = z.object({
  title: validators.name,
  description: z.string().min(10, "must be 10 or more letters"),
  address: z.string().min(1, "location is required"),
  state: validators.name,
  estimatedPrice: z
    .string()
    .min(1, "estimated price is required")
    .regex(/^[0-9]+$/, "must be numbers"),
  charge: z.string().min(1, "charge is required"),
  category: z.string().min(1, "category is required"),
  subCategory: z.string().min(1, "sub category is required"),
});

type ServiceFormData = z.infer<typeof schema> & {
  userId: string;
  userEmail: string;
  portfolio?: any;
  coverPhoto?: any;
  _id?: string;
};

export async function newService(
  _: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  const data = formDataToObject<ServiceFormData>(formData);
  debugLog(data);
  const tryParse = schema.safeParse(data);

  if (!tryParse.success)
    return {
      fieldErrors: tryParse.error.flatten().fieldErrors,
      error: "Fix errors and submit",
    };
  // return {error: "hello"};
  let _formData = new FormData();
  let coverPhotoUrl: string;
  let proceed = false;
  try {
    if (data.coverPhoto == "0" || data.portfolio == "0")
      return { error: "please upload cover photo and portfolio" };
    try {
      // const json = JSON.parse(loadFileFromFormData(formData, 'coverPhoto', data.coverPhoto))[0] as AppCustomFile;
      if ((formData.get("file") as File).size) {
        debugLog("hmmm");
        _formData.append("file", formData.get("file") as File);
        _formData.append("userId", data.userId);
        _formData.append("userEmail", data.userEmail);
        let coverPhoto = await uploadSingleFile(_formData);
        if (typeof coverPhoto === "string") return { error: coverPhoto };
        coverPhotoUrl = coverPhoto.url;
      } else
        coverPhotoUrl = (JSON.parse((data as any)["coverPhoto0"]) as any)[0]
          .data;
      if (!coverPhotoUrl) {
        return { error: "Please upload a cover photo" };
      }
      // console.log({ coverPhotoUrl });
    } catch (error) {
      debugLog(error);
      return { error: "Failed to upload cover photo" };
    }

    const portfolioUrls: string[] = [];
    try {
      const fileKeys = Object.keys(data).filter(
        (i) => i.startsWith("files") && i != "files",
      );
      let uploadedFiles: string[] = [];
      // console.log(fileKeys);
      
      if (fileKeys.length > 0) {
        uploadedFiles = await Promise.all(
          fileKeys.map(async (file) => {
            const fileFormData = new FormData();
            const f = formData.get(file) as File;
            fileFormData.append("file", f);
            const url = await uploadSingleFile(fileFormData);
            if (typeof url === "string") throw new Error();
            return url.url;
          }),
        );
      }

      const portfolios: any[] = attempt(
        () => JSON.parse((data as any)["portfolio0"]),
        [],
      );
      if (portfolios && portfolios.length) {
        portfolios.forEach((i) => {
          if (i.type === "file") {
          } else {
            portfolioUrls.push(i.data);
          }
        });
      }
      portfolioUrls.push(...uploadedFiles);
      if(portfolioUrls.length < 1) return {error: "Please, upload portfolio images"}
    } catch (error) {
      debugLog(error);
      //    throw new Error()
      return {
        error: "Failed to upload portfolio",
      };
    }

    // return { error: 'error' };

    const postId = data._id;
    let newFormData = removeFilesFromFormData(
      formData,
      "coverPhoto",
      data.coverPhoto,
    );
    newFormData = removeFilesFromFormData(
      newFormData,
      "portfolio",
      data.portfolio,
    );
    let _data = formDataToObject<ServiceFormData>(newFormData);
    _data = { ..._data, coverPhoto: coverPhotoUrl, portfolio: portfolioUrls };

    try {
      const req = await (postId
        ? ServerApiRequest.patch(apis.editArtisanService(postId), _data)
        : ServerApiRequest.post(apis.services, _data));
      const res = (await req?.json()) as ApiResponse;
      debugLog({ response: res });

      if (res.statusCode === 201) {
        revalidateTag(tags.myServices);
        revalidatePath(paths.dashboardServices);
        proceed = true;
      } else return { error: res.data ?? "Something went wrong" };
    } catch (error) {
      debugLog(error);
      return { error: "Something went wrong" };
    }
  } catch (error) {
    debugLog(error);
    return { error: "Something went wrongg" };
  }
  if (proceed) {
    redirect(paths.dashboardServices);
  }
  return { error: "Unknown error" };
}
