/* eslint-disable @next/next/no-img-element */
"use client";

import { fetchSingleService } from "@/actions";
import { paths } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function ChatService({ serviceId }: { serviceId: string }) {
  const { data: service, isLoading } = useQuery({
    queryKey: [serviceId, "chat_service"],
    queryFn: async () => {
      const res = await fetchSingleService(serviceId, {
        isPublic: true,
        throwsError: false,
      });
      if (!res || res === "error") return null;
      return res;
    },
  });

  if (isLoading) return <div className="skeleton h-6 w-full rounded-lg" />;
  if (!service) return;
  return (
    <Link href={paths.service(service._id)} className="flex items-center gap-2 bg-primary-lightActive">
      <img
        src={service.coverPhoto}
        alt={"service cover photo"}
        className="aspect-square w-10 flex-shrink-0 rounded"
      />
      <h4 className="line-clamp-2 text-sm font-semibold text-black-500">{service.title}</h4>
    </Link>
  );
}
