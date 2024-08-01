import { fetchSavedServices } from "@/actions";
import { DashboardSavedCard } from "@/components/dashboard";
import { paths } from "@/utils";
import { Pagination } from "@/components";

import { staticMetadata } from "@/functions/metadata";
import { Metadata } from "next";
import { buildUrlQuery } from "@/functions/helpers";
import { AppPageProps } from "@/utils/types/basicTypes";

export const metadata: Metadata = staticMetadata({
  title: "KraftKollectors | My Saved Services",
  description: "services saved by me",
});

export default async function Page({ searchParams }: AppPageProps) {
  const services = await fetchSavedServices({
    params: buildUrlQuery(searchParams),
  });
  if (services == "error" || !services)
    return <div className="info-box">An Error Occurred</div>;

  return (
    <div className="flex flex-col gap-3">
      {services.existingRecords.length == 0 ? (
        <div className="info-box">No saved Services</div>
      ) : (
        services.existingRecords.map((service) => (
          <DashboardSavedCard key={service._id} {...service} />
        ))
      )}
      <Pagination
        className="mx-auto py-2"
        baseUrl={paths.dashboardServices}
        pagination={services}
      />
    </div>
  );
}

const services = [
  {
    img: "/images/auth-bg.png",
    title: "I will create the ultimate sound track for your event",
    price: "#20,000",
    id: "1",
  },
  {
    img: "/images/auth-bg.png",
    title: "I will create the ultimate sound track for your event",
    price: "#20,000",
    id: "1",
  },
];
