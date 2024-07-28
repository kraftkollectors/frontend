"use client";
import { debugLog } from "@/functions/helpers";
import { apis } from "@/utils";
import { useCookie, useEffectOnce } from "react-use";

export default function UpdateServiceViews({
  serviceId,
}: {
  serviceId: string;
}) {
  const cookieName = `view-service-${serviceId}`;
  const [viewed, setViewed] = useCookie(cookieName);
  useEffectOnce(() => {
    if (viewed == "true") return;

    async function updateViews() {
      try {
        const res = await fetch(apis.updateViews(serviceId));
        if (res.status == 201)
          setViewed("true", {
            expires: 60 * 60 * 20, // 20 hours
          });
      } catch (error) {
        debugLog(`Error updating views: ${error}`);
      }
    }

    updateViews();
  });

  return <></>;
}
